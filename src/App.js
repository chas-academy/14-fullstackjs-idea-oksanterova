import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";

import "./App.css";
import Header from "./components/layout/Header";
import SmallSearch from "./components/layout/SmallSearch";
import Homepage from "./components/pages/Homepage";
import Business from "./components/pages/Business";
import Reservation from "./components/pages/Reservation";
import Search from "./components/pages/Search";
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import client from "./client";
import styled from "styled-components/macro";

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
            </Container>
          }

          <Container>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/business/:id" component={Business} />
            <Route
              exact
              path="/business/:id/reservation"
              component={Reservation}
            />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </Container>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
