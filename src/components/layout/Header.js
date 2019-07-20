import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import Flex, { FlexItem } from "styled-flex-component";
import { Query, ApolloProvider } from "react-apollo";
import client, { IS_LOGGED_IN } from "../../client";

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 0px 20px;
  font-family: "Helvetica Neue", sans-serif;
  font-weight: 600;
  font-size: 16px;
  border-bottom: 2px solid transparent;
  margin: 0px 5px;

  &:hover {
    border-bottom: 2px solid #fff;
  }
`;

export default function Header({ children }) {
  return (
    <ApolloProvider client={client}>
      <Flex justifyBetween>
        <FlexItem grow>{children}</FlexItem>
        <Flex contentEnd>
          <Query query={IS_LOGGED_IN}>
            {({ data }) =>
              data.isLoggedIn ? (
                <StyledLink to="/user/:id/profile">Profile</StyledLink>
              ) : (
                <StyledLink to="/signup">Sign up</StyledLink>
              )
            }
          </Query>
          <Query query={IS_LOGGED_IN}>
            {({ data }) =>
              data.isLoggedIn ? (
                <StyledLink
                  to="/logout"
                  onClick={() => {
                    client.writeData({ data: { isLoggedIn: false } });
                    localStorage.clear();
                  }}
                >
                  Log Out
                </StyledLink>
              ) : (
                <StyledLink to="/login">Login</StyledLink>
              )
            }
          </Query>
          <StyledLink to="/about">About</StyledLink>
          <StyledLink to="/">Contact</StyledLink>
        </Flex>
      </Flex>
    </ApolloProvider>
  );
}
