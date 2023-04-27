import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import colors from "../vars/colors";
import spacing from "../vars/spacing";
import { createBookReview } from "../services/booksService";
import { BookReview } from "../types/Book";
import TextButton from "./TextButton";
import ReviewModal from "./CreateReviewModal";
import Review from "./Review";
import sizes from "../vars/sizes";

export default function BookReviews({ reviews, book }) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [userReview, setUserReview] = useState<BookReview>(null);
  const hasUserReview = reviews.find(
    ({ user_id }) => user_id === "fake-user-id"
  );
  const handleSubmitReview = async (review: BookReview) => {
    try {
      await createBookReview(book.id, review);
      setUserReview(review);
    } catch (err) {
      Alert.alert("Ocorreu um erro ao enviar sua avaliação!");
    } finally {
      setShowReviewModal(false);
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
            setShowReviewModal(true);
          }}
        />
      )}
      <ReviewModal
        onClose={() => setShowReviewModal(false)}
        visible={showReviewModal}
        onSubmit={handleSubmitReview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  reviewsContainer: {
    padding: spacing.large,
    marginVertical: spacing.large,
  },
  emptyReviews: {
    textAlign: "center",
    marginBottom: spacing.large,
  },
  reviewsTitle: {
    fontSize: sizes.huge,
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
    fontSize: sizes.medium,
    marginBottom: spacing.medium,
  },
});
