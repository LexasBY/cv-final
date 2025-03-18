import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuthForm } from "../model/useAuthForm";
import { authSchema } from "../model/validation";

interface AuthFormProps {
  type: "login" | "register";
}

interface AuthFormData {
  email: string;
  password: string;
}

export const AuthForm = ({ type }: AuthFormProps) => {
  const navigate = useNavigate();
  const { onSubmit, serverError } = useAuthForm(type);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: yupResolver(authSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 1, fontWeight: "bold", textAlign: "center" }}
      >
        {type === "login" ? "Welcome back" : "Register now"}
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 3, color: "gray", textAlign: "center" }}
      >
        {type === "login"
          ? "Hello again! Log in to continue"
          : "Welcome! Sign up to continue"}
      </Typography>

      <TextField
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        sx={{ mb: 2 }}
        autoComplete="email"
      />

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
        sx={{ mb: 2 }}
        autoComplete="current-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="error"
        fullWidth
        sx={{ py: 1.5, fontSize: "1rem", fontWeight: "bold", mt: 2 }}
      >
        {type === "login" ? "LOG IN" : "CREATE ACCOUNT"}
      </Button>

      {serverError && (
        <Typography
          variant="body2"
          sx={{ color: "red", mt: 2, textAlign: "center" }}
        >
          {serverError}
        </Typography>
      )}

      <Typography
        variant="body2"
        sx={{
          mt: 2,
          cursor: "pointer",
          color: "gray",
          "&:hover": { color: "white" },
        }}
        onClick={() => {
          if (type === "login") {
            console.log("Forgot Password clicked");
          } else {
            navigate("/auth/login");
          }
        }}
      >
        {type === "login" ? "FORGOT PASSWORD" : "I HAVE AN ACCOUNT"}
      </Typography>
    </Box>
  );
};
