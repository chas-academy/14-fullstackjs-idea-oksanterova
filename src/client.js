import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql"
  //uri: "https://api.yelp.com/v3/graphql"
});

// https://www.apollographql.com/docs/react/recipes/authentication/
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "Accept-Language": "en_US"
    }
  };
});

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
