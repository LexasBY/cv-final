import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "rgb(241, 233, 233)",
      paper: "rgb(241, 233, 233)",
    },
    text: {
      primary: "#000",
      secondary: "#333",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "rgb(53, 53, 53)",
      paper: "rgb(53, 53, 53)",
    },
    text: {
      primary: "#ffffff",
      secondary: "#bdbdbd",
    },
  },
});
