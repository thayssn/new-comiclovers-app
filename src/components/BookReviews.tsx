import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import spacing from "../config/spacing";
import { createBookReview } from "../services/booksService";
import { BookReview } from "../types/Book";
import TextButton from "./Button";
import ReviewModal from "./CreateReviewModal";
import Review from "./Review";

export default function BookReviews({ reviews, book }) {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userReview, setUserReview] = useState<BookReview>(null);
  const hasUserReview = reviews.find(
    ({ user_id }) => user_id === "fake-user-id"
  );
  const handleSubmitReview = async (review: BookReview) => {
    try {
      await createBookReview(book.id, review);
      setUserReview(review);
    } catch (err) {
      console.log(err);
      Alert.alert("Ocorreu um erro ao enviar sua avaliação!");
    } finally {
      setShowRatingModal(false);
    }
  };
  return (
    <View style={styles.reviewsContainer}>
      <Text style={styles.reviewsTitle}>Avaliações</Text>
      {reviews.length ? (
        reviews?.map((review, index) => <Review review={review} key={index} />)
      ) : (
        <Text style={styles.emptyReviews}>Nenhuma avaliação</Text>
      )}
      {userReview && (
        <>
          <Text style={styles.warning}>
            Seu comentário está sendo revisado! Logo ele será publicado.
          </Text>
          <Review review={userReview} ghost />
        </>
      )}
      {!userReview && !hasUserReview && (
        <TextButton
          text="Avaliar"
          onPress={() => {
            setShowRatingModal(true);
          }}
        />
      )}
      <ReviewModal
        onClose={() => setShowRatingModal(false)}
        visible={showRatingModal}
        onSubmit={handleSubmitReview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  reviewsContainer: {
    padding: 20,
    marginVertical: 20,
  },
  emptyReviews: {
    textAlign: "center",
    marginBottom: spacing.large,
  },
  reviewsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: spacing.large,
  },
  ratingButton: {
    padding: spacing.medium,
    color: colors.light,
  },
  warning: {
    color: colors.lightDark,
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 14,
    marginBottom: spacing.medium,
  },
});
