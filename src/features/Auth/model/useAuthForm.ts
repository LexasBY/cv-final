import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin, useRegister } from "./api";

interface AuthData {
  email: string;
  password: string;
}

export const useAuthForm = (type: "login" | "register") => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [loginMutation] = useLogin();
  const [registerMutation] = useRegister();

  const onSubmit = async (data: AuthData) => {
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

  return { onSubmit, serverError };
};
