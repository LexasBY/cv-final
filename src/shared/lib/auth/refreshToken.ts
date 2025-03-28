import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";
import { setTokens } from "../../../utils/token";

// 1. Мутация для обновления токенов
const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refresh_token: String!) {
    refreshToken(refresh_token: $refresh_token) {
      access_token
      refresh_token
    }
  }
`;

// 2. Временный клиент для запроса обновления
const refreshClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://cv-project-js.inno.ws/api/graphql",
  }),
  cache: new InMemoryCache(),
});

// 3. Основная функция для обновления access_token
export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return null;

  try {
    const result = await refreshClient.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      variables: { refresh_token: refreshToken },
    });

    const newAccessToken = result.data?.refreshToken?.access_token;
    const newRefreshToken = result.data?.refreshToken?.refresh_token;

    if (newAccessToken && newRefreshToken) {
      setTokens(newAccessToken, newRefreshToken);
      return newAccessToken;
    }

    return null;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};
