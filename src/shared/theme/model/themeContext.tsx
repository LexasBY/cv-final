import { createContext, useMemo, useState, useEffect, ReactNode } from "react";
import { ThemeProvider, CssBaseline, Theme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { darkTheme, lightTheme } from "../ui/theme";

export type ThemeOption = "light" | "dark" | "system";

interface ThemeContextValue {
  mode: ThemeOption;
  setMode: (mode: ThemeOption) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeOption>(() => {
    const stored = localStorage.getItem("theme");
    return stored === "light" || stored === "dark" || stored === "system"
      ? (stored as ThemeOption)
      : "system";
  });

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)", {
    noSsr: true,
  });

  const activeMode: "light" | "dark" =
    mode === "system" ? (prefersDark ? "dark" : "light") : mode;

  const theme: Theme = useMemo(
    () => (activeMode === "dark" ? darkTheme : lightTheme),
    [activeMode]
  );

  const contextValue = useMemo(() => ({ mode, setMode }), [mode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
