import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { ApolloProvider } from "@apollo/client";
import { client } from "../shared/api/apolloClient";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeModeProvider } from "../shared/theme/model/themeContext";

export const App = () => (
  <ApolloProvider client={client}>
    <ThemeModeProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeModeProvider>
  </ApolloProvider>
);
