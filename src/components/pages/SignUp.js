import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import {
  Wrapper,
  BigLoginName,
  Message,
  LoginFormWrapper,
  Input,
  StyledLink,
  LoginBtn
} from "./Login";

function SignUp() {
  return (
    <Wrapper>
      <BigLoginName>Sign Up</BigLoginName>
      <LoginFormWrapper>
        <Input type="text" placeholder="name" />
        <Input type="password" placeholder="password" />
        <Input type="text" placeholder="email address" />
        <Link to={`/`}>
          <LoginBtn>Create</LoginBtn>
        </Link>

        <Message>
          Already registered? <StyledLink to={`/login`}>Login</StyledLink>
        </Message>
      </LoginFormWrapper>
    </Wrapper>
  );
}

export default withRouter(SignUp);
