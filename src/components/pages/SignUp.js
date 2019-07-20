import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import {
  Wrapper,
  BigLoginName,
  Message,
  LoginForm,
  Input,
  StyledLink,
  LoginBtn
} from "./Login";

export default withRouter(SignUp);

function SignUp() {
  return (
    <Wrapper>
      <BigLoginName>Sign Up</BigLoginName>
      <LoginForm>
        <Input type="text" placeholder="name" />
        <Input type="password" placeholder="password" />
        <Input type="text" placeholder="email address" />
        <Link to={`/`}>
          <LoginBtn>Create</LoginBtn>
        </Link>

        <Message>
          Already registered? <StyledLink to={`/login`}>Login</StyledLink>
        </Message>
      </LoginForm>
    </Wrapper>
  );
}
