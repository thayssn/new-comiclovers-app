import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { Rating } from "react-native-ratings";
import BookThumbnail from "../components/BookThumbnail";
import Loading from "../components/Loading";
import Review from "../components/Review";
import colors from "../config/colors";
import spacing from "../config/spacing";
import { useBookById } from "../services/booksService";
import { capitalizeFirstLetter } from "../utils/typography";

const { height: windowHeight } = Dimensions.get("window");

const BookProp = ({ label, value }) => (
  <View style={styles.bookProps}>
    <Text style={styles.bookPropsLabel}>{label}:</Text>
    <Text style={styles.bookPropsValue}>{value}</Text>
  </View>
);

const BookDetailScreen = ({ route }) => {
  const { book } = route.params;
  const { data, isLoading, refetch } = useBookById(book.id);
  if (isLoading) return <Loading />;
  if (!data) return null;
  const {
    cover,
    publishing_date,
    edition,
    publisher,
    licensor,
    description,
    isbn,
    title,
    writers,
    illustrators,
    reviews,
    price,
    pages,
    format,
  } = data;

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "long",
  }).format(new Date(publishing_date));
  const formattedPrice = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
  const ratingsSum =
    reviews.reduce((sum, review) => sum + review.rating, 0) || 0;
  const rating = ratingsSum / reviews.length || 0;

  const bookProps = [
    {
      label: "Avaliação",
      value: (
        <View style={styles.ratingBookProps}>
          <Rating readonly startingValue={rating} imageSize={18} />
          <Text>{reviews.length ? rating : "Nenhuma"}</Text>
        </View>
      ),
    },
    { label: "Edição", value: edition },
    { label: "Preço", value: formattedPrice },
    { label: "Número de páginas", value: pages },
    { label: "Formato", value: format },
    {
      label: "Data de publicação",
      value: capitalizeFirstLetter(formattedDate),
    },
    { label: "Roteiristas", value: writers.join(", ") },
    { label: "Ilustradores", value: illustrators.join(", ") },
    { label: "Editora", value: publisher },
    { label: "Licenciado por", value: licensor },
    {
      label: "ISBN",
      value: (
        <View style={styles.isbn}>
          <Text>{isbn}</Text>
        </View>
      ),
    },
  ];

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
          <Text>Nenhuma avaliação</Text>
        )}
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
  isbn: {
    fontSize: 14,
    backgroundColor: colors.lightDark,
    padding: spacing.tiny,
    borderRadius: 5,
  },
  reviewsContainer: {
    padding: 20,
    marginVertical: 20,
  },
  reviewsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: spacing.large,
  },
  ratingBookProps: {
    flex: 1,
    flexDirection: "row",
    gap: spacing.small,
    alignItems: "center",
  },
});

export default BookDetailScreen;
