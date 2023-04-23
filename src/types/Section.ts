import Book from "./Book";

type Section = {
  id: string;
  title: string;
  description: string;
  books: Book[];
};

export default Section;
