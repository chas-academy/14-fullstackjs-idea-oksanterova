import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components/macro";
import Flex, { FlexItem } from "styled-flex-component";

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
    <Flex justifyBetween>
      <FlexItem grow>{children}</FlexItem>
      <Flex contentEnd>
        <StyledLink to="/">Sign up</StyledLink>
        <StyledLink to="/">Login</StyledLink>
        <StyledLink to="/">About us</StyledLink>
        <StyledLink to="/">Contact us</StyledLink>
      </Flex>
    </Flex>
  );
}
