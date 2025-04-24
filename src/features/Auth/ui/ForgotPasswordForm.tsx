import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { FORGOT_PASSWORD } from "../model/api";

const schema = yup.object({
  email: yup.string().email("Email invalid").required("Email required"),
});

export const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const [forgotPassword] = useMutation(FORGOT_PASSWORD);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email }: { email: string }) => {
    setLoading(true);
    try {
      await forgotPassword({
        variables: {
          auth: { email },
        },
      });
      setSnackbar({
        open: true,
        message: t("Reset password success"),
        severity: "success",
      });
    } catch (e) {
      console.error("Failed to send reset email", e);
      setSnackbar({
        open: true,
        message: t("Reset password failed"),
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
          {t("Forgot password")}
        </Typography>
        <Typography sx={{ mb: 4, color: "gray", textAlign: "center" }}>
          {t("Reset password description")}
        </Typography>

        <TextField
          label={t("Email")}
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message && t(errors.email.message)}
          {...register("email")}
          sx={{ mb: 3 }}
        />

        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Button
            type="submit"
            variant="contained"
            color="error"
            fullWidth
            disabled={loading}
            sx={{ py: 1.5, fontSize: "1rem", fontWeight: "bold" }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("Reset password")
            )}
          </Button>

          <Button
            onClick={() => window.history.back()}
            sx={{ color: "gray", textTransform: "uppercase" }}
          >
            {t("Cancel")}
          </Button>
        </Box>
      </form>

      <Snackbar
        open={snackbar.open}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
