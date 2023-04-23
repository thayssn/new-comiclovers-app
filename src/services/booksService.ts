import { gqlClient } from "../infra/gqlClient";
import Book, { BookDetails } from "../types/Book";
import { useQuery } from "react-query";
import { getBookByIdQuery, getBooksByTitle } from "../infra/BookQueries";

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

const fetchBooksByTitle = async (title: string): Promise<Book[]> => {
  if (!title) return;
  const { books } = await gqlClient.request<{ books: Book[] }>(
    getBooksByTitle(title)
  );
  return books;
};

export const useBookById = (bookId: string) =>
  useQuery(["books", bookId], () => fetchBookById(bookId));

export const useBookByISBN = (isbn: string) =>
  useQuery(["books", "isbn", isbn], () => fetchBookByISBN(isbn), {
    enabled: false,
  });

export const useBooksSearch = (title: string) =>
  useQuery(["books", "search"], () => fetchBooksByTitle(title), {
    enabled: false,
  });
