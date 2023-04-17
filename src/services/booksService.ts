import api from "../infra/api";
import Book from "../types/Book";
import { useQuery } from "react-query";

const fetchBooks = async (): Promise<Book[]> => {
  const { data } = await api.get<Book[]>("books");
  return data;
};

export const useBooks = () => useQuery("posts", fetchBooks);

const fetchBook = async (bookId: string): Promise<Book> => {
  const { data } = await api.get<Book>(`books/${bookId}`);
  return data;
};

export const useBook = (bookId: string) =>
  useQuery(["posts", bookId], () => fetchBook(bookId));
