import api from "../infra/api";
import { BookDetails } from "../types/Book";
import { useQuery } from "react-query";

const fetchBooks = async (): Promise<BookDetails[]> => {
  const { data } = await api.get<BookDetails[]>("books");
  return data;
};

export const useBooks = () => useQuery("books", fetchBooks);

const fetchBook = async (bookId: string): Promise<BookDetails> => {
  const { data } = await api.get<BookDetails>(`books/${bookId}`);
  return data;
};

export const useBook = (bookId: string) =>
  useQuery(["books", bookId], () => fetchBook(bookId));

const fetchBookByISBN = async (isbn: string): Promise<BookDetails> => {
  if (!isbn) return null;
  const { data } = await api.get<BookDetails>(`books/isbn/${isbn}`);
  return data;
};

export const getBookByISBN = (isbn: string) =>
  useQuery(["books", isbn], () => fetchBookByISBN(isbn));
