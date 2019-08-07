import React, { useState } from "react";
import { withRouter } from "react-router";
import {
  Wrapper,
  Message,
  LoginFormWrapper,
  Input,
  StyledLink,
  LoginBtn
} from "./Login";
import { BigLoginName } from "../Common";
import { ApolloConsumer } from "react-apollo";
import { gql } from "apollo-boost";
import { MutationLoader } from "../Loader";

const SIGN_UP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

function SignUp({ history }) {
  return (
    <Wrapper>
      <BigLoginName>Sign Up</BigLoginName>

      <ApolloConsumer>
        {client => (
          <MutationLoader
            mutation={SIGN_UP}
            onCompleted={({ signUp }) => {
              localStorage.setItem("token", signUp.token);
              client.writeData({ data: { isLoggedIn: true } });
              history.push("/");
            }}
          >
            {signUp => <LoginForm signUp={signUp} />}
          </MutationLoader>
        )}
      </ApolloConsumer>
    </Wrapper>
  );
}

function LoginForm({ signUp }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    signUp({ variables: { username, email, password } });
  }

  return (
    <LoginFormWrapper onSubmit={handleSubmit}>
      <Input
        type="text"
        name="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="name"
      />
      <Input
        type="text"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="email address"
      />
      <Input
        type="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="password"
      />
      <LoginBtn type="submit">Create</LoginBtn>

      <Message>
        Already registered? <StyledLink to={`/login`}>Login</StyledLink>
      </Message>
    </LoginFormWrapper>
  );
}

export default withRouter(SignUp);
