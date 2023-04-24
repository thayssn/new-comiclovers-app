import { GraphQLClient } from "graphql-request";
import config from "../config";

export const gqlClientRead = new GraphQLClient(config.api.readUrl, {
  headers: {
    "content-type": "application/json",
    Authorization: config.api.authorization,
  },
});

export const gqlClientWrite = new GraphQLClient(config.api.writeUrl, {
  headers: {
    "content-type": "application/json",
    Authorization: config.api.authorization,
  },
});
