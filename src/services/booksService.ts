import api from "../infra/api";
import { BookDetails } from "../types/Book";
import { useQuery } from "react-query";

const fetchBooks = async (): Promise<BookDetails[]> => {
  const { data } = await api.get<BookDetails[]>("books");
  return data;
};

export const useBooks = () => useQuery("posts", fetchBooks);

const fetchBook = async (bookId: string): Promise<BookDetails> => {
  const { data } = await api.get<BookDetails>(`books/${bookId}`);
  return data;
};

export const useBook = (bookId: string) =>
  useQuery(["posts", bookId], () => fetchBook(bookId));
