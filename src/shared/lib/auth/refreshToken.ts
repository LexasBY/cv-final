import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { UpdateTokenResult } from "../../../shared/api/graphql/generated";
import { setTokens, getRefreshToken } from "../../../utils/token";

const refreshClient = new ApolloClient({
  uri: "https://cv-project-js.inno.ws/api/graphql",
  cache: new InMemoryCache(),
});

const REFRESH_TOKEN_MUTATION = gql`
  mutation {
    updateToken {
      access_token
      refresh_token
    }
  }
`;

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const result = await refreshClient.mutate<{
      updateToken: UpdateTokenResult;
    }>({
      mutation: REFRESH_TOKEN_MUTATION,
      context: {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    });

    const newAccessToken = result.data?.updateToken?.access_token;
    const newRefreshToken = result.data?.updateToken?.refresh_token;

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
