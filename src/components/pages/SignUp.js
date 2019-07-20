import React, { useState } from "react";
import { withRouter } from "react-router";
import {
  Wrapper,
  BigLoginName,
  Message,
  LoginFormWrapper,
  Input,
  StyledLink,
  LoginBtn
} from "./Login";
import { ApolloConsumer, Mutation } from "react-apollo";
import { gql } from "apollo-boost";

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
          <Mutation
            mutation={SIGN_UP}
            onCompleted={({ signUp }) => {
              localStorage.setItem("token", signUp.token);
              client.writeData({ data: { isLoggedIn: true } });
              history.push("/");
            }}
          >
            {(signUp, { loading, error }) => {
              if (loading)
                return (
                  <div className="spinner">
                    <div className="dot1" />
                    <div className="dot2" />
                  </div>
                );
              if (error) return <p>An error occurred</p>;

              return <LoginForm signUp={signUp} />;
            }}
          </Mutation>
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
