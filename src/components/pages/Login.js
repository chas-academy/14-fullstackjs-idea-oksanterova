import React from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { borderAndShadow } from "./Reservation";
import { BigName, BookBtn } from "./Business";

export default withRouter(Login);

export const Wrapper = styled.div`
  ${borderAndShadow};
  background-color: #fff;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  width: 360px;
  font-size: 14px;
`;

export const BigLoginName = styled(BigName)`
  margin: 15px;
`;

export const Message = styled.div`
  font-size: 12px;
  margin: 10px;
`;

export const LoginForm = styled.form`
  max-width: 360px;
  text-align: center;
`;

export const Input = styled.input`
  background: #f2f2f2;
  height: 36px;
  font-size: 16px;
  width: 300px;
  margin: 10px;
  border: 0;
  border-radius: 6px;
  outline: none;
  padding-left: 15px;
`;

export const StyledLink = styled(Link)`
  color: #ad1d45;
`;

export const LoginBtn = styled(BookBtn)`
  margin: 10px;
  width: 315px;
`;

function Login() {
  return (
    <Wrapper>
      <BigLoginName>Login</BigLoginName>
      <LoginForm class="login-form">
        <Input type="text" placeholder="username" />
        <Input type="password" placeholder="password" />
        <Link to={`/`}>
          <LoginBtn>Login</LoginBtn>
        </Link>

        <Message>
          Not registered?{" "}
          <StyledLink to={`/signup`}>Create an account</StyledLink>>
        </Message>
      </LoginForm>
    </Wrapper>
  );
}
