import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
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
