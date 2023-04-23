type Book = {
  id: string;
  title: string;
  edition: string;
  cover?: {
    url: string;
  };
};

export type BookReview = {
  user_id: string;
  user_name: string;
  text: string;
  rating: number;
  published_at: number;
};

export type BookDetails = Book & {
  isbn?: string;
  publisher?: string;
  publishing_date?: string;
  licensor?: string;
  description?: string;
  reviews?: BookReview[];
  price?: number;
  pages?: number;
  format?: string;
  writers: string[];
  illustrators?: string[];
  public_collections?: string[];
};

export default Book;
