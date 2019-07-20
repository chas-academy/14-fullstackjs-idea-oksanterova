import React, { useState } from "react";
import "../../App.css";
import styled from "styled-components/macro";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import Flex from "styled-flex-component";
import { BigName, BookBtn } from "./Business";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const QUERY = gql`
  query Search($id: String!) {
    business(id: $id) {
      id
      name
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
`;

const SelectDiv = styled.div`
  margin-bottom: 10px;
`;

const BtnDiv = styled.div`
  margin-top: -10px;
  margin-bottom: 5px;
`;

function Booking({ business }) {
  const { name } = business;
  const [guestNumber, setGuestNumber] = useState("");
  const [startDate, handleChange] = useState("");

  return (
    <Wrapper>
      <Flex column alignCenter>
        <Head>
          <BigName>Your booking at {name}</BigName>
        </Head>
        <Flex column alignCenter>
          <Label>Please pick a time for your dinner:</Label>
          <DatePicker
            inline
            selected={startDate}
            onChange={handleChange}
            showTimeSelect
            timeIntervals={15}
            dateFormat="MMMM d, yyyy"
          />
          <FormDiv onSubmit={e => console.log("success")}>
            <SelectDiv>
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
              </Label>
            </SelectDiv>
            <BtnDiv>
              <Link to={`/`}>
                <BookBtn>Confirm</BookBtn>
              </Link>
            </BtnDiv>
          </FormDiv>
        </Flex>
      </Flex>
    </Wrapper>
  );
}

function Reservation({ location, match }) {
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
          return <p>An error occurred</p>;
        }

        return <Booking business={data.business} />;
      }}
    </Query>
  );
}

export default withRouter(Reservation);
