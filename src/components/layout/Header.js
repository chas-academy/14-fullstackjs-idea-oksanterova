import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import Flex, { FlexItem } from "styled-flex-component";
import client, { IS_LOGGED_IN } from "../../client";
import { gql } from "apollo-boost";
import { compose, graphql } from "react-apollo";

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 0px 20px;
  font-family: "Helvetica Neue", sans-serif;
  font-weight: 600;
  font-size: 16px;
  border-bottom: 2px solid transparent;
  margin: auto;

  &:hover {
    border-bottom: 2px solid #fff;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 42px;

  @media (max-width: 468px) {
    justify-content: space-around;
  }
`;

const IS_ADMIN = gql`
  query IsAdmin {
    me {
      isAdmin
    }
  }
`;

function Header({ children, client: { isLoggedIn }, user: { loading, me } }) {
  if (loading) {
    return <div />;
  }

  const isAdmin = me && me.isAdmin;

  const userMenu = (
    <>
      <StyledLink to="/profile">Profile</StyledLink>
      <StyledLink
        to="/logout"
        onClick={() => {
          client.writeData({ data: { isLoggedIn: false } });
          localStorage.clear();
        }}
      >
        Log Out
      </StyledLink>
    </>
  );

  const guestMenu = (
    <>
      <StyledLink to="/signup">Sign up</StyledLink>
      <StyledLink to="/login">Login</StyledLink>
    </>
  );

  return (
    <HeaderWrapper>
      <FlexItem grow>{children}</FlexItem>
      <Flex contentEnd>
        {isLoggedIn ? userMenu : guestMenu}
        {isAdmin ? (
          <StyledLink to="/admin">Admin</StyledLink>
        ) : (
          <StyledLink to="/about">About</StyledLink>
        )}
      </Flex>
    </HeaderWrapper>
  );
}

export default compose(
  graphql(IS_LOGGED_IN, { name: "client" }),
  graphql(IS_ADMIN, { name: "user" })
)(Header);
