import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
import { useLogin, useRegister } from "./api";

interface AuthFormProps {
  type: "login" | "register";
}

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

export const AuthForm = ({ type }: AuthFormProps) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [loginMutation] = useLogin();
  const [registerMutation] = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data: { email: string; password: string }) => {
    console.log("Sending data:", data);
    setServerError(null);

    try {
      let response;

      if (type === "login") {
        response = await loginMutation({ variables: { auth: data } });

        if (response?.data?.login?.access_token) {
          localStorage.setItem(
            "access_token",
            response.data.login.access_token
          );
          localStorage.setItem("userId", response.data.login.user.id);
          navigate(`/users/${response.data.login.user.id}`);
        }
      } else {
        response = await registerMutation({ variables: { auth: data } });

        if (response?.data?.signup?.access_token) {
          localStorage.setItem(
            "access_token",
            response.data.signup.access_token
          );
          localStorage.setItem("userId", response.data.signup.user.id);
          navigate(`/users/${response.data.signup.user.id}`);
        }
      }
    } catch (error) {
      console.error("GraphQL Error:", error);

      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("An unknown error occurred");
      }
    }
  };

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
