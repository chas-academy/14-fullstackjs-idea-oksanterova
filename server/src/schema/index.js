import { gql } from "apollo-server-express";

import userSchema from "./user";
import reservationSchema from "./reservation";

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, reservationSchema];
