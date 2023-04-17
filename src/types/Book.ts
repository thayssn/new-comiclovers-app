import PublishingStatus from "../enums/PublishingStatus";

type Book = {
  title: string;
  thumbnail: string;
  id: string;
  writers?: [];
  status?: PublishingStatus;
  rating?: number;
  price?: number;
  edition?: string;
};

export default Book;
