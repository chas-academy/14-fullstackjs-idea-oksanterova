import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components/macro";

const Navbar = styled.div`
  background-color: transparent;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 20px 20px;
  font-family: "Helvetica Neue", sans-serif;
  font-weight: 600;
  font-size: 16px;
  border-bottom: 2px solid transparent;
  margin: 0px 5px;

  &:hover {
    border-bottom: 2px solid #fff;
  }
`;

export default function Header() {
  return (
    <Navbar>
      <Router>
        <StyledLink
          to="/"
          onClick={() => {
            console.log("log smthng");
          }}
        >
          Sign up
        </StyledLink>
        <StyledLink
          to="/"
          onClick={() => {
            console.log("log smthng else");
          }}
        >
          Login
        </StyledLink>
        <StyledLink
          to="/"
          onClick={() => {
            console.log("log smthng else too");
          }}
        >
          About us
        </StyledLink>
        <StyledLink
          to="/"
          onClick={() => {
            console.log("log smthng again");
          }}
        >
          Contact us
        </StyledLink>
      </Router>
    </Navbar>
  );
}
