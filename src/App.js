import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";

import "./App.css";
import Header from "./components/layout/Header";
import SmallSearch from "./components/layout/SmallSearch";
import Homepage from "./components/pages/Homepage";
import Business from "./components/pages/Business";
import Search from "./components/pages/Search";
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
            </Container>
          }

          <Container>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/business/:id" component={Business} />
          </Container>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
