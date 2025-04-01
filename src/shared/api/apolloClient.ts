import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  Observable,
  FetchResult,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { refreshAccessToken } from "../lib/auth/refreshToken";
import { clearTokens, getAccessToken } from "../../utils/token";

const httpLink = createHttpLink({
  uri: "https://cv-project-js.inno.ws/api/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  const unauth = graphQLErrors?.some((err) =>
    err.message.toLowerCase().includes("unauthorized")
  );

  if (!unauth) return;

  return new Observable<FetchResult>((observer) => {
    refreshAccessToken()
      .then((newToken) => {
        if (!newToken) {
          window.location.href = "/auth/login";
          return;
        }

        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            Authorization: `Bearer ${newToken}`,
          },
        }));

        const subscriber = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });

        return () => subscriber.unsubscribe();
      })
      .catch(() => {
        clearTokens();
        window.location.href = "/auth/login";
      });
  });
});

export const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});
