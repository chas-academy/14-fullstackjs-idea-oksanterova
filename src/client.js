import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";

const cache = new InMemoryCache();

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

const resolvers = {};

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  console.log("setContext", token);

  if (token) {
    return {
      headers: {
        ...headers,
        "x-token": token
      }
    };
  } else {
    return { headers };
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  let hasError = false;

  if (graphQLErrors) {
    hasError = graphQLErrors.find(({ message, extensions }) => {
      console.log("GraphQL error", message);

      return (
        message === "UNAUTHENTICATED" ||
        extensions.code === "UNAUTHENTICATED" ||
        extensions.code === "FORBIDDEN"
      );
    });
  }

  if (networkError && !hasError) {
    console.log("Network error", networkError);
    hasError = networkError.statusCode === 401;
  }

  if (hasError) {
    client.writeData({ data: { isLoggedIn: false } });
    localStorage.clear();
  }
});

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql",
  headers: {
    "Accept-Language": "en_US"
  }
});

const link = ApolloLink.from([authLink, errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache,
  clientState: {
    typeDefs,
    resolvers
  }
});

client.writeData({ data: { isLoggedIn: !!localStorage.getItem("token") } });

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export default client;
