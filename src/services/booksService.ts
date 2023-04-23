import { gqlClient } from "../infra/gqlClient";
import { BookDetails } from "../types/Book";
import { useQuery } from "react-query";
import { getBookByIdQuery } from "../infra/BookQueries";

const fetchBookById = async (bookId: string): Promise<BookDetails> => {
  if (!bookId) return;
  const { book } = await gqlClient.request<{ book: BookDetails }>(
    getBookByIdQuery(bookId)
  );
  return book;
};

const fetchBookByISBN = async (isbn: string): Promise<BookDetails> => {
  if (!isbn) return;
  const { book } = await gqlClient.request<{ book: BookDetails }>(
    getBookByIdQuery(isbn)
  );
  return book;
};

export const useBookById = (bookId: string) =>
  useQuery(["books", bookId], () => fetchBookById(bookId));

export const useBookByISBN = (isbn: string) =>
  useQuery(["books", "isbn", isbn], () => fetchBookByISBN(isbn));
