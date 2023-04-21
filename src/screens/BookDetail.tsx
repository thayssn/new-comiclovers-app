import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { Rating } from "react-native-ratings";
import Loading from "../components/Loading";
import Review from "../components/Review";
import colors from "../config/colors";
import spacing from "../config/spacing";
import { useBook } from "../services/booksService";
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
  const { data, isLoading, refetch } = useBook(book.id);
  const scrollY = useRef(new Animated.Value(0)).current;
  if (isLoading) return <Loading />;
  if (!data) return null;
  const {
    thumbnail,
    publishing_date,
    edition,
    publisher,
    licensor,
    description,
    isbn,
    title,
    writers,
    reviews,
    price,
    pages,
  } = data;

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "short",
  }).format(new Date(publishing_date));
  const formattedPrice = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
  const ratingsSum = reviews.reduce((sum, review) => sum + review.rating, 0);
  const rating = ratingsSum / reviews.length;

  const bookProps = [
    {
      label: "Avaliação",
      value: <Rating readonly startingValue={rating} imageSize={16} />,
    },
    { label: "Preço", value: capitalizeFirstLetter(formattedPrice) },
    { label: "Edição", value: edition },
    { label: "Data de publicação", value: formattedDate },
    { label: "Licenciado por", value: licensor },
    { label: "Publicado por", value: publisher },
    { label: "Número de páginas", value: pages },
    { label: "ISBN", value: isbn },
  ];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      <Image source={{ uri: thumbnail }} style={[styles.headerImage]} />
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
        <Text style={styles.title}>Avaliações</Text>
        {reviews.map((review, index) => (
          <Review review={review} key={index} />
        ))}
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
    paddingBottom: spacing.medium,
    paddingHorizontal: spacing.medium,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: spacing.tiny,
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
    color: colors.dark,
    fontSize: 16,
    marginLeft: 10,
  },
  isbn: {
    fontSize: 14,
    backgroundColor: colors.lightDark,
    padding: 5,
    borderRadius: 5,
  },
  reviewsContainer: {
    margin: 20,
  },
});

export default BookDetailScreen;
