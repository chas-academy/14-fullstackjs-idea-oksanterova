import { combineResolvers } from "graphql-resolvers";

import { isAuthenticated, isAdmin } from "./authorization";

export default {
  Query: {
    reservations: combineResolvers(isAdmin, async (parent, {}, { models }) => {
      return await models.Reservation.find();
    }),
    reservation: async (parent, { id }, { models }) => {
      return await models.Reservation.findById(id);
    }
  },

  Mutation: {
    createReservation: combineResolvers(
      isAuthenticated,
      async (
        parent,
        { businessId, reservationTime, numberOfGuests },
        { models, me }
      ) => {
        return await models.Reservation.create({
          businessId,
          userId: me.id,
          reservationTime,
          numberOfGuests
        });
      }
    ),

    deleteReservation: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        const reservation = await models.Reservation.findById(id);

        if (reservation) {
          await reservation.remove();
          return true;
        } else {
          return false;
        }
      }
    ),

    updateReservation: combineResolvers(
      isAdmin,
      async (parent, { id, reservationTime, numberOfGuests }, { models }) => {
        return await models.Reservation.findByIdAndUpdate(
          id,
          { reservationTime, numberOfGuests },
          { new: true }
        );
      }
    )
  },

  Reservation: {
    user: async (reservation, args, { models }) => {
      return await models.User.findById(reservation.userId);
    }
  }
};
