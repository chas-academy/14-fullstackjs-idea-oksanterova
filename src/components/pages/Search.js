import React from "react";
import "../../App.css";
import styled from "styled-components/macro";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import queryString from "query-string";
import { withRouter } from "react-router-dom";

const QUERY = gql`
  query Search($term: String!) {
    search(term: $term, location: "stockholm") {
      business {
        photos
        name
        categories {
          title
        }
        rating
        location {
          formatted_address
        }
      }
    }
  }
`;

const SearchWrapper = styled.div`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px #ccc solid;
  background-color: #fff;
  border-radius: 6px;
`;

const Image = styled.img`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px #ccc solid;
  border-radius: 4px;
  cursor: pointer;
  width: 100px;
  height: 100px;
  margin-right: 20px;
  object-fit: cover;
`;

const SearchResult = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  border-bottom: 1px solid #c7cdcf;
  width: 600px;
  padding: 20px;
`;

const Rating = styled.div`
  display: flex;
  flex-flow: row wrap;
  font-weight: 700;
  line-height: 24px;
`;

const Summary = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  width: 350px;
  flex: 1;
`;

const Name = styled.div`
  font-weight: 700;
  color: #44000d;
`;

const Info = styled.div`
  font-weight: 400;
  font-size: 14px;
  width: 350px;
`;

const Category = styled.div`
  font-weight: 400;
  font-size: 14px;
  width: 350px;
  color: #83142c;
`;

const Star = styled.div`
  height: 24px;
  width: 24px;
  margin-left: 5px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAyVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACqPCdOAAAAQnRSTlMAAQMFBggMDQ4SFRYYGRscHR8iJSgrMTg6QEJERUZHTVRXWWFobHt8goiMjpSeoKW0tby+wMXR4uTo6e3z9ff5+/1ic5NlAAAArElEQVQYGX3Bh1bCMAAF0BekRaYgQ2TKEgoIyBCUYXn//1G01SaB5nAvFLFMwKjFCUzEN/kIgzpJB1FiR4+NiBp9I9wSWwZsSPF0peNsXP77mvZechaAFU32MZTPNOgCKLmMeIPv+Zc32viTP/FKE6HsgZpXKH0qS2hmVI7Q/FBjQXqgrgApw8DCpa8BqUrPPAVrSM87pAH5+QSfPSHXkMabIkLJjx0kAZ3AXRcCMT2AxiE/LgAAAABJRU5ErkJggg==)
    no-repeat center;
`;

function SearchResults({ business }) {
  return (
    <SearchWrapper>
      {business.map(({ photos, name, categories, rating, location }) => (
        <SearchResult>
          <Image src={photos} />
          <Summary>
            <Name>{name}</Name>

            <Category>{categories[0].title}</Category>

            {location.formatted_address.split("\n").map(address => (
              <Info>{address}</Info>
            ))}
          </Summary>
          <Rating>
            <span>{rating}</span>
            <Star />
          </Rating>
        </SearchResult>
      ))}
    </SearchWrapper>
  );
}

function Search({ location }) {
  const term = queryString.parse(location.search).q;

  return (
    <Query query={QUERY} variables={{ term }}>
      {({ loading, error, data }) => {
        if (loading)
          return (
            <div className="spinner">
              <div className="dot1" />
              <div className="dot2" />
            </div>
          );
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
