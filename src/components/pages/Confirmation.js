import React from "react";
import styled from "styled-components/macro";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import { BookBtn } from "./Business";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { QueryLoader } from "../Loader";
import Moment from "react-moment";

const QUERY = gql`
  query Search($id: ID!) {
    reservation(id: $id) {
      numberOfGuests
      reservationTime
      business {
        name
      }
    }
  }
`;

export const borderAndShadow = props => `
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px #ccc solid;
  border-radius: 6px;
`;

const Wrapper = styled.div`
  ${borderAndShadow};
  background-color: #fff;
  padding: 5px;
  width: 600px;
  margin: 20px auto;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`;

export const Head = styled.div`
  font-size: 32px;
  font-weight: 800;
  margin: 10px;
  color: #44000d;
  text-align: center;
`;

const Body = styled.div`
  margin: 20px;
`;

function ConfirmationLayout({ reservation }) {
  return (
    <Wrapper>
      <Head>Your booking at {reservation.business.name}</Head>
      <Body>
        You have successfully booked a table at {reservation.business.name} for{" "}
        {reservation.numberOfGuests} guests at{" "}
        <Moment format="YYYY-MM-DD HH:mm">{reservation.reservationTime}</Moment>
        . See you soon!
      </Body>
      <Link to="/profile">
        <BookBtn>My reservations</BookBtn>
      </Link>
    </Wrapper>
  );
}

function Confirmation({ history, match }) {
  const id = match.params.id;

  return (
    <QueryLoader query={QUERY} variables={{ id: id }}>
      {({ reservation }) => <ConfirmationLayout reservation={reservation} />}
    </QueryLoader>
  );
}

export default withRouter(Confirmation);
