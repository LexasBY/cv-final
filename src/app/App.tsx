import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Router } from "./router";
import { ApolloProvider } from "@apollo/client";
import { client } from "../shared/api/apolloClient";
import { theme } from "../shared/theme";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  </ApolloProvider>
);
