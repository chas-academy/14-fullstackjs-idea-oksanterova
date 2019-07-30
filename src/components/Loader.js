import React from "react";
import { Query, Mutation } from "react-apollo";
import "../App.css";

export function Loader() {
  return (
    <div className="spinner">
      <div className="dot1" />
      <div className="dot2" />
    </div>
  );
}

export function QueryLoader(props) {
  return (
    <Query {...props}>
      {({ loading, error, data }) => {
        if (loading) {
          return <Loader />;
        }

        if (error) {
          console.log(error);
          return <p>An error occurred</p>;
        }

        return props.children(data);
      }}
    </Query>
  );
}

export function MutationLoader(props) {
  return (
    <Mutation {...props}>
      {(mutation, { error }) => {
        if (error) {
          return <p>An error occurred</p>;
        }

        return (
          <div>
            <div key="children">{props.children(mutation)}</div>
          </div>
        );
      }}
    </Mutation>
  );
}
