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
import { useBook } from "../services/booksService";

const { height: windowHeight } = Dimensions.get("window");

const HEADER_HEIGHT = windowHeight / 3;
const SCROLL_THRESHOLD = HEADER_HEIGHT - 80;

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
    month: "long",
  }).format(new Date(publishing_date));
  const ratingsSum = reviews.reduce((sum, review) => sum + review.rating, 0);
  const rating = ratingsSum / reviews.length;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, SCROLL_THRESHOLD],
    outputRange: [HEADER_HEIGHT, 80],
    extrapolate: "clamp",
  });

  const headerImageHeight = scrollY.interpolate({
    inputRange: [0, SCROLL_THRESHOLD],
    outputRange: [HEADER_HEIGHT, 0],
    extrapolate: "clamp",
  });

  const formattedPrice = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      <Animated.Image
        source={{ uri: thumbnail }}
        style={[styles.headerImage, { height: headerImageHeight }]}
      />
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>{writers.join(", ")}</Text>
        </View>
      </Animated.View>
      <View style={styles.content}>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.bookProps}>
          <Text style={styles.bookPropsLabel}>Avaliação:</Text>
          <Text style={styles.bookPropsValue}>
            <Rating readonly startingValue={rating} imageSize={16} />
          </Text>
        </View>

        <View style={styles.bookProps}>
          <Text style={styles.bookPropsLabel}>Edição:</Text>
          <Text style={[styles.bookPropsValue]}>{edition}</Text>
        </View>
        <View style={styles.bookProps}>
          <Text style={styles.bookPropsLabel}>Preço:</Text>
          <Text style={styles.bookPropsValue}>{formattedPrice}</Text>
        </View>
        <View style={styles.bookProps}>
          <Text style={styles.bookPropsLabel}>Licensiado por:</Text>
          <Text style={styles.bookPropsValue}>{licensor}</Text>
        </View>
        <View style={styles.bookProps}>
          <Text style={styles.bookPropsLabel}>Publicado por:</Text>
          <Text style={styles.bookPropsValue}>{publisher}</Text>
        </View>
        <View style={styles.bookProps}>
          <Text style={styles.bookPropsLabel}>Data de publicação:</Text>
          <Text style={[styles.bookPropsValue]}>{formattedDate}</Text>
        </View>
        <View style={styles.bookProps}>
          <Text style={styles.bookPropsLabel}>Número de páginas:</Text>
          <Text style={styles.bookPropsValue}>{pages}</Text>
        </View>
        <View style={styles.bookProps}>
          <Text style={styles.bookPropsLabel}>ISBN:</Text>
          <Text style={[styles.bookPropsValue, styles.isbn]}>{isbn}</Text>
        </View>
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
    right: 0,
    width: "100%",
    resizeMode: "cover",
  },
  header: {
    height: HEADER_HEIGHT,
    justifyContent: "flex-end",
  },
  headerContent: {
    backgroundColor: "#FFF",
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    color: "#888",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 24,
    zIndex: 1,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    marginBottom: 8,
  },
  bookProps: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  bookPropsLabel: {
    fontWeight: "bold",
    color: "#555",
  },
  bookPropsValue: {
    color: "#333",
    fontSize: 16,
    marginLeft: 10,
  },
  isbn: {
    fontSize: 14,
    backgroundColor: "#f5f5f5",
    padding: 5,
    borderRadius: 5,
  },
  reviewsContainer: {
    margin: 20,
  },
});

export default BookDetailScreen;
