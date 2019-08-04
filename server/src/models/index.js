import mongoose from "mongoose";

import User from "./user";
import Reservation from "./reservation";

const connectDb = () => {
  if (process.env.DATABASE_URL) {
    return mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true
    });
  }
};

const models = { User, Reservation };

export { connectDb };

export default models;
