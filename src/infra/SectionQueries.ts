import { gql } from "graphql-request";

export const getSectionsQuery = () => gql`
  query Sections {
    sections {
      id
      title
      books(first: 10) {
        cover {
          url
        }
        edition
        title
        id
      }
    }
  }
`;

export const getSectionByIdQuery = (id: string) => `query SectionById {
  section (where: { id: "${id}"}) {
    id
    title
    books {
      cover {
        url
      }
      title
      edition
      id
    }
  }
}`;
