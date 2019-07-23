import React from "react";
import styled from "styled-components/macro";
import { gql } from "apollo-boost";
import { withRouter } from "react-router";
import { borderAndShadow } from "./Reservation";
import { BigLoginName } from "./Login";
import { QueryLoader } from "../Loader";
import Moment from "react-moment";
import logo_black_min from "../../assets/logo_black_min.png";

export default withRouter(Profile);

const QUERY = gql`
  query Search {
    me {
      username
      reservations {
        numberOfGuests
        reservationTime
        business {
          name
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  ${borderAndShadow};
  background-color: #fff;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 20px auto;
  width: 600px;
`;

const LittleLogo = styled.div`
  width: 20px;
  height: 20px;
  background: url(${logo_black_min}) no-repeat;
  background-size: 20px 20px;
  float: left;
  margin-right: 10px;
`;

export const Booking = styled.div`
  margin: 20px;
`;

const Body = styled.div`
  margin: 20px;
`;

function ProfileLayout({ me }) {
  return (
    <Wrapper>
      <BigLoginName>Hello {me.username}!</BigLoginName>
      <Body>
        You have booked a table at:{" "}
        {me.reservations.map((res, index) => (
          <Booking key={index}>
            {" "}
            <LittleLogo />
            {res.business.name} for {res.numberOfGuests} guests at{" "}
            <Moment format="HH:mm DD-MM-YYYY">{res.reservationTime}</Moment>{" "}
          </Booking>
        ))}
      </Body>
    </Wrapper>
  );
}

function Profile({ location, match }) {
  const id = match.params.id;
  return (
    <QueryLoader query={QUERY} variables={{ id }}>
      {({ me }) => <ProfileLayout me={me} />}
    </QueryLoader>
  );
}
