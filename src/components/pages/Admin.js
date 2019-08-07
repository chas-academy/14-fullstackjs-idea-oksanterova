import React from "react";
import styled from "styled-components/macro";
import { gql } from "apollo-boost";
import { withRouter } from "react-router";
import { borderAndShadow, BigLoginName } from "../Common";
import Moment from "react-moment";
import MaterialTable from "material-table";
import { compose, graphql } from "react-apollo";
import DatePicker from "react-datepicker";

const QUERY = gql`
  query GetReservations {
    reservations {
      id
      user {
        username
      }
      numberOfGuests
      reservationTime
      business {
        name
        id
      }
    }
  }
`;

const DELETE_RESERVATION = gql`
  mutation($id: ID!) {
    deleteReservation(id: $id)
  }
`;

const UPDATE_RESERVATION = gql`
  mutation($id: ID!, $reservationTime: Date!, $numberOfGuests: Int!) {
    updateReservation(
      id: $id
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto;
  max-width: 60%;
  @media (max-width: 700px) {
    max-width: 95%;
  }
`;

export const Booking = styled.div`
  margin: 20px;
`;

export const TableWrapper = styled.div`
  width: 100%;
  @media (max-width: 700px) {
    max-width: 95%;
  }
`;

function Admin({
  deleteReservation,
  updateReservation,
  data: { reservations, loading }
}) {
  return (
    <div>
      <Wrapper>
        <BigLoginName>Hello Admin!</BigLoginName>
        <TableWrapper>
          <MaterialTable
            isLoading={loading}
            editable={{
              onRowDelete: ({ id }) => deleteReservation({ variables: { id } }),
              onRowUpdate: ({ id, reservationTime, numberOfGuests }) =>
                updateReservation({
                  variables: {
                    id,
                    reservationTime,
                    numberOfGuests: parseInt(numberOfGuests)
                  }
                })
            }}
            columns={[
              { title: "Username", field: "user.username" },
              { title: "Business", field: "business.name" },
              { title: "Guests", field: "numberOfGuests", type: "numeric" },
              {
                title: "Time",
                field: "reservationTime",
                render: ({ reservationTime }) => (
                  <Moment format="YYYY-MM-DD HH:mm">{reservationTime}</Moment>
                ),
                editComponent: ({ value, onChange }) => {
                  return (
                    <DatePicker
                      selected={new Date(value)}
                      onChange={onChange}
                      showTimeSelect
                      timeIntervals={15}
                      dateFormat="yyyy-MM-dd HH:mm"
                    />
                  );
                }
              }
            ]}
            data={reservations}
            title="Reservations"
          />
        </TableWrapper>
      </Wrapper>
    </div>
  );
}

export default compose(
  withRouter,
  graphql(QUERY),
  graphql(DELETE_RESERVATION, {
    name: "deleteReservation",
    options: {
      awaitRefetchQueries: true,
      refetchQueries: ["GetReservations"]
    }
  }),
  graphql(UPDATE_RESERVATION, {
    name: "updateReservation",
    options: {
      awaitRefetchQueries: true,
      refetchQueries: ["GetReservations"]
    }
  })
)(Admin);
