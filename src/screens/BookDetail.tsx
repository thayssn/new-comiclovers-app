import { View, Image, StyleSheet } from "react-native";
import BookDescription from "../components/BookDescription";
import { useBook } from "../services/booksService";
import Loading from "../components/Loading";
import BookInfo from "../components/BookInfo";
const styles = StyleSheet.create({
  bookDetailWrapper: {
    backgroundColor: "#FFF",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  bookHeader: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
  },
  bookHeaderImage: {
    margin: 5,
    width: 150,
    height: 250,
  },
});

export default function BookDetailScreen({ navigation, route }) {
  const { id: bookId, title } = route.params?.book;
  const { data: book, isLoading, refetch } = useBook(bookId);
  navigation.setOptions({ title });

  if (isLoading) return <Loading />;
  if (!book) return null;

  const { thumbnail } = book;

  return (
    <View style={styles.bookDetailWrapper}>
      <View style={styles.bookHeader}>
        <Image style={styles.bookHeaderImage} source={{ uri: thumbnail }} />
        <BookInfo book={book} />
      </View>
      <BookDescription book={book} />
    </View>
  );
}
