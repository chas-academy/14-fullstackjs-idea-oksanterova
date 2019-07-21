import React, { useState } from "react";
import styled from "styled-components/macro";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import Flex from "styled-flex-component";
import { BigName, BookBtn } from "./Business";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { QueryLoader, MutationLoader } from "../Loader";

const QUERY = gql`
  query Search($id: String!) {
    business(id: $id) {
      name
    }
  }
`;

const CREATE_RESERVATION = gql`
  mutation($businessId: String!) {
    createReservation(businessId: $businessId) {
      id
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
  margin: 0 auto;
`;

export const Head = styled.div`
  margin: 10px auto;
`;

const Label = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
`;

const FormDiv = styled.form`
  margin-top: 10px;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`;

const SelectDiv = styled.div`
  margin-bottom: 10px;
`;

const BtnDiv = styled.div`
  margin-top: -10px;
  margin-bottom: 5px;
`;

function Booking({ business, createReservation }) {
  const { name } = business;
  const [guestNumber, setGuestNumber] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    createReservation();
  };

  return (
    <Wrapper>
      <Flex column alignCenter>
        <Head>
          <BigName>Your booking at {name}</BigName>
        </Head>

        <form onSubmit={handleSubmit}>
          <Label>
            Please pick a time for your dinner:
            <DatePicker
              inline
              selected={startDate}
              onChange={setStartDate}
              showTimeSelect
              timeIntervals={15}
              dateFormat="MMMM d, yyyy"
            />
          </Label>
          <Label>
            Please select the number of guests:
            <select
              value={guestNumber}
              onChange={e => setGuestNumber(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <BookBtn type="submit">Confirm</BookBtn>
          </Label>
        </form>
      </Flex>
    </Wrapper>
  );
}

function Reservation({ history, match }) {
  const businessId = match.params.id;

  function handleCompleted({ createReservation }) {
    history.push("/reservations/" + createReservation.id);
  }

  return (
    <QueryLoader query={QUERY} variables={{ id: businessId }}>
      {({ business }) => (
        <MutationLoader
          mutation={CREATE_RESERVATION}
          onCompleted={handleCompleted}
          variables={{ businessId }}
        >
          {createReservation => (
            <Booking
              business={business}
              createReservation={createReservation}
            />
          )}
        </MutationLoader>
      )}
    </QueryLoader>
  );
}

export default withRouter(Reservation);
