import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import BookReviews from "../components/BookReviews";
import ErrorState from "../components/ErrorState";
import Loading from "../components/Loading";
import TextButton from "../components/TextButton";
import colors from "../vars/colors";
import spacing from "../vars/spacing";
import { addBookToCollection } from "../services/collectionsService";
import useBookDetails from "./useBookDetails";

const BookProp = ({ label, value }) => (
  <View style={styles.bookProps}>
    <Text style={styles.bookPropsLabel}>{label}:</Text>
    <Text style={styles.bookPropsValue}>{value}</Text>
  </View>
);

export default function BookDetailScreen({ route }) {
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
      <View style={[styles.header]}>
        {cover && (
          <Image source={{ uri: cover?.url }} style={[styles.headerImage]} />
        )}
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

      <BookReviews reviews={reviews} book={book} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  headerImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  header: {
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.small,
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
    marginTop: spacing.small,
    marginBottom: spacing.small,
    textAlign: "center",
  },
  author: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.medium,
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
});
