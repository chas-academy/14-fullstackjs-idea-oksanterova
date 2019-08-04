import React, { useState } from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { borderAndShadow } from "./Reservation";
import { BigName, BookBtn } from "./Business";
import { ApolloConsumer } from "react-apollo";
import { gql } from "apollo-boost";
import { MutationLoader } from "../Loader";

const SIGN_IN = gql`
  mutation($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`;

export const Wrapper = styled.div`
  ${borderAndShadow};
  background-color: #fff;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 20px auto;
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

export const LoginFormWrapper = styled.form`
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

function Login({ history, location }) {
  return (
    <Wrapper>
      <BigLoginName>Login</BigLoginName>

      <ApolloConsumer>
        {client => (
          <MutationLoader
            mutation={SIGN_IN}
            onCompleted={({ signIn }) => {
              localStorage.setItem("token", signIn.token);
              client.writeData({ data: { isLoggedIn: true } });

              if (location.state && location.state.referrer) {
                history.push(location.state.referrer);
              } else {
                history.push("/");
              }
            }}
          >
            {signIn => <LoginForm signIn={signIn} />}
          </MutationLoader>
        )}
      </ApolloConsumer>
    </Wrapper>
  );
}

function LoginForm({ signIn }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    signIn({ variables: { login, password } });
  }

  return (
    <LoginFormWrapper onSubmit={handleSubmit}>
      <Input
        type="text"
        name="login"
        value={login}
        onChange={e => setLogin(e.target.value)}
        placeholder="username"
      />
      <Input
        type="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="password"
      />
      <LoginBtn type="submit">Login</LoginBtn>

      <Message>
        Not registered?{" "}
        <StyledLink to={`/signup`}>Create an account</StyledLink>
      </Message>
    </LoginFormWrapper>
  );
}

export default withRouter(Login);
