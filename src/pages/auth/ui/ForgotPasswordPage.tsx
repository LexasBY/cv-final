import { Box, Container } from "@mui/material";
import { ForgotPasswordForm } from "../../../features/Auth/ui/ForgotPasswordForm";

const ForgotPasswordPage = () => (
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
    <Box sx={{ width: "100%" }}>
      <ForgotPasswordForm />
    </Box>
  </Container>
);

export default ForgotPasswordPage;
