import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { RESET_PASSWORD } from "../model/api";

const schema = yup.object({
  newPassword: yup
    .string()
    .min(6, "auth.password_too_short")
    .required("auth.password_required"),
});

export const ResetPasswordForm = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [resetPassword] = useMutation(RESET_PASSWORD);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ newPassword: string }>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ newPassword }: { newPassword: string }) => {
    try {
      await resetPassword({
        variables: {
          auth: {
            newPassword,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      setSnackbar({
        open: true,
        message: t("reset_password_success"),
        severity: "success",
      });
    } catch (e: unknown) {
      console.error("Failed to reset password", e);
      const message = e instanceof Error ? e.message.toLowerCase() : "";

      const errorKey =
        message.includes("expired") || message.includes("token")
          ? "token_missing_or_invalid"
          : "reset_password_failed";

      setSnackbar({ open: true, message: t(errorKey), severity: "error" });
    }
  };

  if (!token) {
    return <Alert severity="error">{t("token_missing_or_invalid")}</Alert>;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" sx={{ mb: 1, textAlign: "center" }}>
          {t("set_new_password")}
        </Typography>
        <Typography sx={{ mb: 4, color: "gray", textAlign: "center" }}>
          {t("new_password_description")}
        </Typography>

        <TextField
          fullWidth
          label={t("new_password")}
          placeholder={t("enter_new_password")}
          type="password"
          {...register("newPassword")}
          error={!!errors.newPassword}
          helperText={
            errors.newPassword?.message && t(errors.newPassword.message)
          }
          sx={{ mb: 3 }}
        />

        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Button
            type="submit"
            variant="contained"
            color="error"
            fullWidth
            disabled={isSubmitting}
            sx={{ py: 1.5, fontSize: "1rem", fontWeight: "bold" }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("save_password")
            )}
          </Button>

          <Button
            onClick={() => navigate("/auth/login")}
            sx={{ color: "gray", textTransform: "uppercase" }}
          >
            {t("back_to_login")}
          </Button>
        </Box>
      </form>

      <Snackbar
        open={snackbar.open}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
