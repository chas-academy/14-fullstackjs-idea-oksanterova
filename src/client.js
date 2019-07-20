import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return {
      ...headers,
      "x-token": localStorage.getItem("token")
    };
  } else {
    return headers;
  }
});

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql",
  headers: {
    "Accept-Language": "en_US"
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
    cartItems: []
  }
});

export default client;
