import { gql } from "graphql-request";

export const getSectionsQuery = (limit = null) => gql`query Sections {
  sections (first: ${limit}) {
    books {
      cover {
        url
      }
      description
      title
      id
    }
    id
    title
  }
}`;

export const getSectionByIdQuery = (id: string) => `query SectionById {
  sections (where: { id: "${id}"}) {
    books {
      cover {
        url
      }
      description
      title
      id
    }
    id
    title
  }
}`;
