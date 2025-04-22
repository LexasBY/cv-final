// shared/theme/themeContext.tsx
import { createContext, useMemo, useState, useEffect, ReactNode } from "react";
import { ThemeProvider, CssBaseline, Theme } from "@mui/material";
import { darkTheme, lightTheme } from "../ui/theme";

export type ThemeOption = "light" | "dark" | "system";

interface ThemeContextValue {
  mode: ThemeOption;
  setMode: (mode: ThemeOption) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const getSystemTheme = (): ThemeOption => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeOption>(() => {
    return (localStorage.getItem("theme") as ThemeOption) || "system";
  });

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const selected = mode === "system" ? getSystemTheme() : mode;

  const theme = useMemo<Theme>(() => {
    return selected === "dark" ? darkTheme : lightTheme;
  }, [selected]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
