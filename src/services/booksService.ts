import { gqlClientRead, gqlClientWrite } from "../infra/gqlClient";
import Book, { BookDetails, BookReview } from "../types/Book";
import { api } from "../infra/isbnApi";
import { useQuery } from "react-query";
import {
  getBookByIdQuery,
  getBookByISBNQuery,
  getBooksByTitleQuery,
} from "../infra/BookQueries";
import { addBookReview } from "../infra/BookMutations";

const fetchBookById = async (bookId: string): Promise<BookDetails> => {
  if (!bookId) return;
  const { book } = await gqlClientRead.request<{ book: BookDetails }>(
    getBookByIdQuery(bookId)
  );
  return book;
};

export const fetchBookByISBN = async (isbn: string): Promise<BookDetails> => {
  if (!isbn) return;
  const { book } = await gqlClientRead.request<{ book: BookDetails }>(
    getBookByISBNQuery(isbn)
  );
  return book;
};

export const fetchISBNInfo = async (
  isbn: string
): Promise<Partial<BookDetails>> => {
  if (!isbn) return;
  const { data } = await api.get<Partial<BookDetails>>(isbn);
  return data;
};

const fetchBooksByTitle = async (title: string): Promise<Book[]> => {
  if (!title) return;
  const { books } = await gqlClientRead.request<{ books: Book[] }>(
    getBooksByTitleQuery(title)
  );
  return books;
};

export const createBookReview = async (bookId: string, review: BookReview) => {
  const { book } = await gqlClientWrite.request<{ book: Book[] }>(
    addBookReview(bookId, review)
  );
  return book;
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
