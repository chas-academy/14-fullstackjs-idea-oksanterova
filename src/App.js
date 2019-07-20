import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Query, ApolloProvider } from "react-apollo";
import client, { IS_LOGGED_IN } from "./client";

import "./App.css";
import styled from "styled-components/macro";
import Header from "./components/layout/Header";
import SmallSearch from "./components/layout/SmallSearch";
import Homepage from "./components/pages/Homepage";
import Business from "./components/pages/Business";
import Reservation from "./components/pages/Reservation";
import Search from "./components/pages/Search";
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import LogOut from "./components/pages/LogOut";
import SignUp from "./components/pages/SignUp";
import Profile from "./components/pages/Profile";

function HeaderWithSearch() {
  return (
    <Header>
      <SmallSearch />
    </Header>
  );
}

const Container = styled.div`
  margin: 20px;
`;

const UserRoute = ({ component: Component, ...rest }) => (
  <Query query={IS_LOGGED_IN}>
    {({ data }) => (
      <Route
        {...rest}
        render={props =>
          data.isLoggedIn === true ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    )}
  </Query>
);

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          {
            <Container>
              <Route exact path="/" component={Header} />
              <Route exact path="/search" component={HeaderWithSearch} />
              <Route path="/business" component={HeaderWithSearch} />
              <Route path="/reservation" component={HeaderWithSearch} />
              <Route path="/about" component={HeaderWithSearch} />
              <Route path="/login" component={HeaderWithSearch} />
              <Route path="/signup" component={HeaderWithSearch} />
              <Route path="/user/:id/profile" component={HeaderWithSearch} />
            </Container>
          }

          <Container>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/business/:id" component={Business} />

            <UserRoute
              exact
              path="/business/:id/reservation"
              component={Reservation}
            />

            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={LogOut} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/user/:id/profile" component={Profile} />
          </Container>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
