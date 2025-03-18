import { Box, Container } from "@mui/material";
import { AuthHeader } from "../../features/Auth/ui/AuthHeader";
import { AuthForm } from "../../features/Auth/ui/AuthForm";

const LoginPage = () => (
  <Container
    maxWidth="sm"
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "rgb(53, 53, 53)",
    }}
  >
    <AuthHeader />
    <Box sx={{ width: "100%", mt: 3 }}>
      <AuthForm type="login" />
    </Box>
  </Container>
);

export default LoginPage;
