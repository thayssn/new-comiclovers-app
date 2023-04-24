import { gql } from "graphql-request";
import { BookReview } from "../types/Book";

export const addBookReview = (
  bookId: string,
  review: BookReview
) => gql`mutation CreateReview {
    updateBook(
        data: {
            reviews: 
            {
                create: {
                    data: {
                        user_id: "${review.user_id}",
                        user_name: "${review.user_name}",
                        text:"${review.text}",
                        rating: ${review.rating},
                        published_at: "${review.published_at}"
                    }
                }
            }
        }
        where: {id: "${bookId}"} ) {
            id
        }
    }`;
