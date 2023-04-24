import { gql } from "graphql-request";

const basicFields = `
cover {
  url
}
id
title
edition
`;

const completeFields = `
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
    book(where: { id: "${id}" }, stage: PUBLISHED) {
      ${completeFields}
    }
  }
`;

export const getBookByISBN = (isbn: string) => gql`
  query BookById {
    book(where: { isbn: "${isbn}" }, stage: PUBLISHED) {
      ${completeFields}
    }
  }
`;

export const getBooksByTitle = (title: string) => gql`
  query BooksSearch {
    books(where: { title_contains: "${title}" }, stage: PUBLISHED) {
      ${basicFields}
    }
  }
`;
