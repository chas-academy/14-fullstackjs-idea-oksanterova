import React from "react";
import "../../App.css";
import styled from "styled-components/macro";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import Flex from "styled-flex-component";
import { Star, Image, Rating, Category } from "./Search";
import { Link } from "react-router-dom";
import { QueryLoader } from "../Loader";
import { borderAndShadow, BookBtn, Name, BigName } from "../Common";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const QUERY = gql`
  query Search($id: String!) {
    business(id: $id) {
      id
      photos
      name
      coordinates {
        latitude
        longitude
      }
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
  font-size: 14px;
  font-weight: 400;
`;

const GetDirections = styled.a`
  color: #83142c;
`;

const GoogleMapWrapper = styled.div`
  ${borderAndShadow}
  width: 300px;
  height: 200px;
`;

function BusinessMap({ business }) {
  const { latitude, longitude } = business.coordinates;

  return (
    <GoogleMapWrapper>
      <LoadScript
        id="script-loader"
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          id="example-map"
          mapContainerStyle={{
            height: "200px",
            width: "300px"
          }}
          zoom={14}
          center={{
            lat: latitude,
            lng: longitude
          }}
          options={{
            disableDefaultUI: true
          }}
        >
          <Marker position={{ lat: latitude, lng: longitude }} />
        </GoogleMap>
      </LoadScript>
    </GoogleMapWrapper>
  );
}

function BusinessLayout({ business }) {
  const { id, photos, name, categories, rating, location, reviews } = business;
  const { latitude, longitude } = business.coordinates;

  const getDirectionsUrl = `https://maps.google.com/maps?daddr=${latitude},${longitude}`;

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
            <BusinessMap business={business} />

            <Summary>
              <Name>{name}</Name>
              {location.formatted_address.split("\n").map((address, index) => (
                <div key={index}>{address}</div>
              ))}
              <GetDirections target="_blank" href={getDirectionsUrl}>
                Get Directions
              </GetDirections>
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
    <QueryLoader query={QUERY} variables={{ id }}>
      {({ business }) => <BusinessLayout business={business} />}
    </QueryLoader>
  );
}

export default withRouter(Business);
