import React from "react";
import "../../App.css";
import styled from "styled-components/macro";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import Flex from "styled-flex-component";
import { Star, Image, Rating, Name, Info, Category } from "./Search";
import { Link } from "react-router-dom";

const QUERY = gql`
  query Search($id: String!) {
    business(id: $id) {
      id
      photos
      name
      categories {
        title
      }
      rating
      location {
        formatted_address
      }
      reviews {
        id
        user {
          name
          image_url
        }
        text
      }
    }
  }
`;

const borderAndShadow = props => `
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px #ccc solid;
  border-radius: 6px;
`;

const Wrapper = styled.div`
  ${borderAndShadow};
  background-color: #fff;
`;

const Head = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
`;

export const BigName = styled(Name)`
  font-size: 32px;
  font-weight: 800;
  margin-right: 40px;
`;

const BigImage = styled(Image)`
  width: 800px;
  height: 500px;
  margin: 20px;
`;

const BusinessBody = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  width: 800px;
`;

const Reviews = styled.div`
  width: 400px;
`;

const Review = styled.div`
  margin: 0px 0px 10px 0px;
`;

const UserImage = styled.img`
  ${borderAndShadow};
  width: 100px;
  height: 100px;
  object-fit: cover;
  flex-shrink: 0;
  margin-right: 10px;
`;

const UserText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserName = styled.div`
  font-size: 16px;
`;

const UserReview = styled.div`
  font-size: 14px;
`;

const BusinessSummary = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 300px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const Summary = styled.div`
  margin: 10px;
`;

const GoogleMap = styled(Image)`
  width: 300px;
  height: 200px;
`;

export const BookBtn = styled.button`
  width: 300px;
  height: 50px;
  color: #fff;
  font-size: 18px;
  font-weight: 800;
  background-color: #ad1d45;
  border-radius: 6px;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

function Space({ business }) {
  const { id, photos, name, categories, rating, location, reviews } = business;

  return (
    <Wrapper>
      <Flex column alignCenter>
        <Head>
          <BigName>{name}</BigName>
          <Rating>
            <span>{rating}</span>
            <Star />
          </Rating>
        </Head>
        <Flex justifyStart>
          {categories.map((cat, index) => (
            <Category key={index}>{cat.title}</Category>
          ))}
        </Flex>
        <BigImage src={photos} />
        <BusinessBody>
          <Reviews>
            {reviews.map(({ id, user, text }) => (
              <Review key={id}>
                <Flex>
                  <UserImage src={user.image_url} />
                  <UserText>
                    <UserName>{user.name}</UserName>
                    <UserReview>{text}</UserReview>
                  </UserText>
                </Flex>
              </Review>
            ))}
          </Reviews>
          <BusinessSummary>
            <GoogleMap />
            <Summary>
              <Name>{name}</Name>
              {location.formatted_address.split("\n").map((address, index) => (
                <Info key={index}>{address}</Info>
              ))}
            </Summary>
            <Link to={`/business/${id}/reservation`}>
              <BookBtn>Book</BookBtn>
            </Link>
          </BusinessSummary>
        </BusinessBody>
      </Flex>
    </Wrapper>
  );
}

function Business({ location, match }) {
  const id = match.params.id;

  return (
    <Query query={QUERY} variables={{ id }}>
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

        return <Space business={data.business} />;
      }}
    </Query>
  );
}

export default withRouter(Business);
