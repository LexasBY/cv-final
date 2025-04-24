import { Container, Box } from "@mui/material";
import { ResetPasswordForm } from "../../../features/Auth/ui/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
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
        <ResetPasswordForm />
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
