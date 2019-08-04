import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import jwt from "jsonwebtoken";
import express from "express";
import { HttpLink } from "apollo-link-http";
import path from "path";
import { setContext } from "apollo-link-context";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import {
  makeExecutableSchema,
  makeRemoteExecutableSchema,
  mergeSchemas,
  introspectSchema,
  transformSchema,
  RenameTypes
} from "graphql-tools";
import fetch from "node-fetch";
import promiseLimit from "promise-limit";

import typeDefs from "./schema";
import resolvers from "./resolvers";
import models, { connectDb } from "./models";

const app = express();

app.use(cors());

app.use(morgan("dev"));

const getMe = async req => {
  const token = req.headers["x-token"];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
};

const createHttpServer = async () => {
  const localSchema = makeExecutableSchema({ typeDefs, resolvers });

  const yelpHttp = new HttpLink({
    uri: "https://api.yelp.com/v3/graphql",
    fetch: fetch.default
  });

  const yelpApiKey = process.env.YELP_API_KEY;
  const yelpLink = setContext((request, previousContext) => ({
    headers: {
      Authorization: `Bearer ${yelpApiKey}`
    }
  })).concat(yelpHttp);

  const linkTypeDefs = `
    extend type Reservation {
      business: Business!
    }
  `;

  const yelpSchema = makeRemoteExecutableSchema({
    schema: await introspectSchema(yelpLink),
    link: yelpLink
  });

  const transformedYelpSchema = transformSchema(yelpSchema, [
    new RenameTypes(name => {
      if (name === "User") return "YelpUser";
      else return name;
    })
  ]);

  const limit = promiseLimit(1);
  const schema = mergeSchemas({
    schemas: [localSchema, await transformedYelpSchema, linkTypeDefs],
    resolvers: {
      Reservation: {
        business: {
          fragment: `... on Reservation { businessId }`,
          resolve({ businessId }, args, context, info) {
            return limit(() =>
              info.mergeInfo.delegateToSchema({
                schema: transformedYelpSchema,
                operation: "query",
                fieldName: "business",
                args: {
                  id: businessId
                },
                context,
                info,
                transforms: transformedYelpSchema.transforms
              })
            );
          }
        }
      }
    }
  });

  const server = new ApolloServer({
    introspection: true,
    tracing: true,
    schema: await schema,
    context: async ({ req, connection }) => {
      if (connection) {
        return { models };
      }

      if (req) {
        const me = await getMe(req);
        const secret = process.env.SECRET;

        return { models, me, secret };
      }
    }
  });

  app.use(express.static(path.join(__dirname, "../../build")));

  app.get("*", function(request, response) {
    response.sendFile(path.resolve(__dirname, "../../build", "index.html"));
  });

  server.applyMiddleware({ app, path: "/graphql" });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  return httpServer;
};

const port = process.env.PORT || 8000;

connectDb()
  .then(createHttpServer)
  .then(async httpServer => {
    httpServer.listen({ port }, () => {
      console.log(`Apollo Server on http://localhost:${port}/graphql`);
    });
  });
