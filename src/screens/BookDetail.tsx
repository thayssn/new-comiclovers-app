import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import TextButton from "../components/Button";
import ReviewModal from "../components/CreateReviewModal";
import ErrorState from "../components/ErrorState";
import Loading from "../components/Loading";
import Review from "../components/Review";
import colors from "../config/colors";
import spacing from "../config/spacing";
import useBookDetails from "./useBookDetails";

const { height: windowHeight } = Dimensions.get("window");

const BookProp = ({ label, value }) => (
  <View style={styles.bookProps}>
    <Text style={styles.bookPropsLabel}>{label}:</Text>
    <Text style={styles.bookPropsValue}>{value}</Text>
  </View>
);

const BookDetailScreen = ({ route }) => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const { book } = route.params;
  const { data, isLoading, isError, refetch, bookProps } = useBookDetails(book);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorState />;
  if (!data) return null;

  const { cover, description, title, writers, reviews } = data;
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      <Image source={{ uri: cover?.url }} style={[styles.headerImage]} />
      <View style={[styles.header]}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>{writers.join(", ")}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.description}>{description}</Text>
        {bookProps.map((prop, index) => (
          <BookProp key={index} {...prop} />
        ))}
      </View>
      <View style={styles.reviewsContainer}>
        <Text style={styles.reviewsTitle}>Avaliações</Text>
        {reviews.length ? (
          reviews?.map((review, index) => (
            <Review review={review} key={index} />
          ))
        ) : (
          <Text style={styles.emptyReviews}>Nenhuma avaliação</Text>
        )}

        <TextButton
          text="Avaliar"
          onPress={() => {
            setShowRatingModal(true);
          }}
        />
        <ReviewModal
          onClose={() => setShowRatingModal(false)}
          visible={showRatingModal}
          onSubmit={() => setShowRatingModal(false)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  headerImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  header: {
    height: windowHeight / 3,
    justifyContent: "flex-end",
  },
  headerContent: {
    backgroundColor: "#FFF",
    paddingTop: spacing.small,
    paddingHorizontal: spacing.medium,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: spacing.small,
  },
  author: {
    fontSize: 16,
    color: "#888",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.large,
    zIndex: 1,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  bookProps: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  bookPropsLabel: {
    fontWeight: "bold",
    color: colors.mediumDark,
  },
  bookPropsValue: {
    flexShrink: 0,
    color: colors.dark,
    fontSize: 16,
    marginLeft: 10,
    maxWidth: "50%",
    textAlign: "right",
  },
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
});

export default BookDetailScreen;
