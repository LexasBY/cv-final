import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
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
    defaultValues: { email: "", password: "" },
  });

  const { ref: passwordRef, ...passwordFieldProps } = register("password");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="on"
      style={{
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
        type="email"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email")}
        inputProps={{ autoComplete: type === "login" ? "username" : "email" }}
        sx={{ mb: 2 }}
      />

      <FormControl
        fullWidth
        variant="outlined"
        error={!!errors.password}
        sx={{ mb: 2 }}
      >
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          inputProps={{
            autoComplete:
              type === "login" ? "current-password" : "new-password",
          }}
          inputRef={passwordRef}
          {...passwordFieldProps}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {errors.password && (
          <FormHelperText>{errors.password.message}</FormHelperText>
        )}
      </FormControl>

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
    </form>
  );
};
