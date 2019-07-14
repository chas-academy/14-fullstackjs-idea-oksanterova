import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ApolloProvider } from "react-apollo";

import "./App.css";
import Header from "./components/layout/Header";
import Homepage from "./components/pages/Homepage";
import Search from "./components/pages/Search";
import client from "./client";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />

        <Router>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/search" component={Search} />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
