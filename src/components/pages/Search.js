import React from "react";
import styled from "styled-components/macro";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import queryString from "query-string";
import { withRouter } from "react-router-dom";

const QUERY = gql`
  query Search($term: String!) {
    search(term: $term, location: "stockholm") {
      business {
        name
      }
    }
  }
`;

const SearchWrapper = styled.div`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px #ccc solid;
  background-color: #fff;
`;

function SearchResults({ business }) {
  return (
    <SearchWrapper>
      {business.map(({ name }) => (
        <div>
          <p>{name}</p>
        </div>
      ))}
    </SearchWrapper>
  );
}

function Search({ location }) {
  const term = queryString.parse(location.search).q;

  return (
    <Query query={QUERY} variables={{ term }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) {
          console.log(error);
          return <p>Error :(</p>;
        }

        return <SearchResults business={data.search.business} />;
      }}
    </Query>
  );
}

export default withRouter(Search);
