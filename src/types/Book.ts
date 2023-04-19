import PublishingStatus from "../enums/PublishingStatus";

type Book = {
  title: string;
  edition: string;
  thumbnail: string;
  id: string;
};

export type BookReview = {
  user_id: string;
  user_name: string;
  text: string;
  rating: number;
  created_at: number;
};

export type BookDetails = Book & {
  publisher: string;
  publishing_date: string;
  licensor: string;
  description: string;
  writers: [];
  status: PublishingStatus;
  reviews: BookReview[];
  price: number;
  pages: number;
  isbn: string;
};

export default Book;
