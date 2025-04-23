import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "rgb(214, 211, 211)",
      paper: "rgb(214, 211, 211)",
    },
    text: {
      primary: "#000",
      secondary: "#333",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
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
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});
