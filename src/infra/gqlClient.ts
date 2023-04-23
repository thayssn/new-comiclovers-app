import { GraphQLClient } from "graphql-request";
import config from "../config";

export const gqlClient = new GraphQLClient(config.api.url, {
  headers: {
    "content-type": "application/json",
    Authorization: config.api.authorization,
  },
});
