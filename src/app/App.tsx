import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Router } from "./router";
import { ApolloProvider } from "@apollo/client";
import { client } from "../shared/api/apolloClient";
import { theme } from "../shared/theme";

export const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  </ApolloProvider>
);
