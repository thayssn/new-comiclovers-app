import Book from "./Book";

type Section = {
  slug: string;
  title: string;
  books: Book[];
};

export default Section;
