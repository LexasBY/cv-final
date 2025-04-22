export const prepareStyles = (): string => {
  let styles = "";

  const allStyleTags = [
    ...document.querySelectorAll<HTMLStyleElement>(
      "style, link[rel=stylesheet]"
    ),
  ];

  for (const tag of allStyleTags) {
    try {
      if (tag.tagName === "STYLE") {
        styles += `<style>${tag.innerHTML}</style>`;
      } else if (tag.tagName === "LINK") {
        const href = tag.getAttribute("href");
        if (href) {
          styles += `<link rel="stylesheet" href="${href}" />`;
        }
      }
    } catch (e) {
      console.warn("Skipping style/link:", e);
    }
  }

  return styles;
};

export const prepareHtml = (content: HTMLElement): string => {
  const cloned = content.cloneNode(true) as HTMLElement;
  cloned.classList.add("pdf-export");

  const styleSheets = [...document.styleSheets];
  let styles = "";

  for (const sheet of styleSheets) {
    try {
      styles += [...sheet.cssRules].map((r) => r.cssText).join("\n");
    } catch (e) {
      console.warn("Skipped stylesheet:", e);
    }
  }

  const printFix = `
  body.pdf-export {
    background: #ffffff !important;
    color: #000000 !important;
    font-family: "Roboto", sans-serif;
  }

  body.pdf-export * {
    background: #ffffff !important;
    color: #000000 !important;
  }

  /* Two-column layout fallback */
  body.pdf-export .MuiGrid-container {
    display: flex !important;
    flex-wrap: wrap !important;
    column-gap: 32px !important;
    row-gap: 24px !important;
  }

  body.pdf-export .MuiGrid-item {
    flex: 0 0 calc(50% - 16px) !important;
    max-width: calc(50% - 16px) !important;
  }

  body.pdf-export table {
    border-collapse: collapse;
    width: 100%;
  }

  body.pdf-export th,
  body.pdf-export td {
    border: 1px solid #000 !important;
    font-size: 1rem !important;
    padding: 4px 8px;
  }

  body.pdf-export th {
    background-color: #f0f0f0 !important;
    font-weight: bold !important;
  }

  body.pdf-export h5,
  body.pdf-export h5 + div {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
  }

  body.pdf-export h5 {
  break-inside: avoid !important;
  page-break-inside: avoid !important;
  margin-top: 18px !important;
  margin-bottom: 18px !important;
  padding-bottom: 2px !important;
  line-height: 1.6 !important;
}

  body.pdf-export ul {
    padding-left: 1.25rem;
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
  }

  body.pdf-export li {
    padding-left: 0.25rem;
  }
`;

  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          ${styles}
          ${printFix}
        </style>
      </head>
      <body class="pdf-export">
        ${cloned.outerHTML}
      </body>
    </html>
  `;
};
