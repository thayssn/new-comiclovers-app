import { gql } from "graphql-request";

const fields = `
cover {
  url
}
id
illustrators
isbn
licensor
pages
price
publisher
publishing_date
title
writers
format
edition
description
reviews {
  user_name
  curator
  rating
  text
  published_at
}
`;

export const getBookByIdQuery = (id: string) => gql`
  query BookById {
    book(where: { id: "${id}" }) {
      ${fields}
    }
  }
`;

export const getBookByISBN = (isbn: string) => gql`
  query BookById {
    book(where: { isbn: "${isbn}" }) {
      ${fields}
    }
  }
`;
