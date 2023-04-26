import Book from "./Book";

type Collection = {
  id: string;
  title: string;
  description?: string;
  books: Book[];
};

export default Collection;
