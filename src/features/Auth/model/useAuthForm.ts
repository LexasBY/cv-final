import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin, useRegister } from "./api";
import { AuthInput } from "../../../shared/api/graphql/generated";
import { clearTokens, setTokens } from "../../../utils/token";
import { client } from "../../../shared/api/apolloClient";

export const useAuthForm = (type: "login" | "register") => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [loginMutation] = useLogin();
  const [registerMutation] = useRegister();

  const onSubmit = async (data: AuthInput) => {
    setServerError(null);

    try {
      if (type === "login") {
        const { data: loginData } = await loginMutation({
          variables: { auth: data },
        });

        const accessToken = loginData?.login?.access_token;
        const refreshToken = loginData?.login?.refresh_token;
        const userId = loginData?.login?.user?.id;

        if (accessToken && refreshToken && userId) {
          setTokens(accessToken, refreshToken);
          localStorage.setItem("userId", userId);
          await client.resetStore();
          navigate(`/users/${userId}`);
        } else {
          throw new Error("Invalid login response");
        }
      } else {
        const { data: signupData } = await registerMutation({
          variables: { auth: data },
        });

        const accessToken = signupData?.signup?.access_token;
        const refreshToken = signupData?.signup?.refresh_token;
        const userId = signupData?.signup?.user?.id;

        if (accessToken && refreshToken && userId) {
          setTokens(accessToken, refreshToken);
          localStorage.setItem("userId", userId);
          navigate(`/users/${userId}`);
        } else {
          throw new Error("Invalid signup response");
        }
      }
    } catch (error) {
      console.error("GraphQL Error:", error);
      clearTokens();
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("An unknown error occurred");
      }
    }
  };

  return { onSubmit, serverError };
};
