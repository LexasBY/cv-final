import { useMutation } from "@apollo/client";
import { EXPORT_PDF } from "../../../shared/api/cvs/cvs.api";

export const useExportPdf = () => {
  const [exportPdfMutation, { loading, error }] = useMutation(EXPORT_PDF);

  const exportPdf = async (outerHTML: string) => {
    const { data } = await exportPdfMutation({
      variables: {
        pdf: {
          html: outerHTML,
          margin: {
            top: "20",
            bottom: "20",
            left: "20",
            right: "20",
          },
        },
      },
    });

    return data?.exportPdf;
  };

  return { exportPdf, loading, error };
};
