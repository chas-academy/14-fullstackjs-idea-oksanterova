import React from "react";
import styled from "styled-components/macro";
import { gql } from "apollo-boost";
import { withRouter } from "react-router";
import { borderAndShadow } from "./Reservation";
import { BigLoginName } from "./Login";
import { QueryLoader, MutationLoader } from "../Loader";
import Moment from "react-moment";
import MaterialTable from "material-table";

export default withRouter(Admin);

const QUERY = gql`
  query Search {
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

const Wrapper = styled.div`
  ${borderAndShadow};
  background-color: #fff;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Booking = styled.div`
  margin: 20px;
`;

function AdminLayout({ reservations, deleteReservation }) {
  return (
    <Wrapper>
      <BigLoginName>Hello Admin!</BigLoginName>
      <div style={{ minWidth: "100%" }}>
        <MaterialTable
          editable={{
            onRowDelete: ({ id }) =>
              deleteReservation({ variables: { id } }).then(() =>
                console.log("deleted")
              )
          }}
          columns={[
            { title: "Username", field: "user.username" },
            { title: "Business", field: "business.name" },
            { title: "Guests", field: "numberOfGuests" },
            {
              title: "Time",
              field: "reservationTime",
              render: ({ reservationTime }) => (
                <Moment format="YYYY-MM-DD HH:mm">{reservationTime}</Moment>
              )
            }
          ]}
          data={reservations}
          title="Reservations"
        />
      </div>
    </Wrapper>
  );
}

function Admin({ location, match }) {
  return (
    <QueryLoader query={QUERY}>
      {({ reservations }) => (
        <MutationLoader
          mutation={DELETE_RESERVATION}
          refetchQueries={mutationResult => [{ query: QUERY }]}
          awaitRefetchQueries={true}
        >
          {deleteReservation => (
            <AdminLayout
              reservations={reservations}
              deleteReservation={deleteReservation}
            />
          )}
        </MutationLoader>
      )}
    </QueryLoader>
  );
}
