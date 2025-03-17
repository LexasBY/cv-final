import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://cv-project-js.inno.ws/api/graphql",
  cache: new InMemoryCache(),
});

export { client, ApolloProvider };
