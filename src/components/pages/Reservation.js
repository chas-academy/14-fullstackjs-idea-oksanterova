import React, { useState } from "react";
import styled from "styled-components/macro";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { QueryLoader, MutationLoader } from "../Loader";
import { borderAndShadow, BookBtn } from "../Common";

const QUERY = gql`
  query Search($id: String!) {
    business(id: $id) {
      name
    }
  }
`;

const CREATE_RESERVATION = gql`
  mutation(
    $businessId: String!
    $reservationTime: Date!
    $numberOfGuests: Int!
  ) {
    createReservation(
      businessId: $businessId
      reservationTime: $reservationTime
      numberOfGuests: $numberOfGuests
    ) {
      id
    }
  }
`;

const Wrapper = styled.div`
  ${borderAndShadow};
  background-color: #fff;
  padding: 5px;
  width: 600px;
  margin: 0 auto;
  display: flex;
  flex-flow: column wrap;
  align-items: center;

  @media (max-width: 680px) {
    width: 400px;
  }

  @media (max-width: 480px) {
    width: 320px;
  }

  @media (max-width: 360px) {
    width: 270px;
  }
`;

export const Head = styled.div`
  margin: 10px auto;
  font-size: 32px;
  font-weight: 800;
  margin: 10px;
  color: #44000d;
  text-align: center;

  @media (max-width: 680px) {
    font-size: 24px;
  }
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
  margin: 10px 0 10px 0;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`;

const BtnDiv = styled.div`
  margin: 0 0 -15px 0;
`;

const ConfirmBtn = styled(BookBtn)`
  width: 320px;
`;

function Booking({ business, createReservation }) {
  const { name } = business;
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [reservationTime, setReservationTime] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    createReservation({
      variables: {
        reservationTime,
        numberOfGuests
      }
    });
  };

  return (
    <Wrapper>
      <Head>Your booking at {name}</Head>

      <FormDiv onSubmit={handleSubmit}>
        <Label>Please pick a time for your dinner:</Label>
        <DatePicker
          inline
          selected={reservationTime}
          onChange={setReservationTime}
          showTimeSelect
          timeIntervals={15}
          dateFormat="MMMM d, yyyy"
        />

        <SelectDiv>
          <Label>
            Please select the number of guests:
            <select
              value={numberOfGuests}
              onChange={e => setNumberOfGuests(parseInt(e.target.value))}
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
            <BtnDiv>
              <ConfirmBtn type="submit">Confirm</ConfirmBtn>
            </BtnDiv>
          </Label>
        </SelectDiv>
      </FormDiv>
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
