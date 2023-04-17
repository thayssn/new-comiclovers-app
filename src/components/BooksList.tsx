import { StyleSheet, Text, View, FlatList } from "react-native";
import BookThumbnail from "./BookThumbnail";

const styles = StyleSheet.create({
  book_list_view: {
    padding: 5,
  },
  book_list: {
    alignItems: "flex-start",
  },
  book_list_title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default function BooksList({
  title,
  books,
  onClickBook,
  refreshControl,
}) {
  return (
    <View style={styles.book_list_view}>
      <Text style={styles.book_list_title}>{title}</Text>
      <FlatList
        contentContainerStyle={styles.book_list}
        horizontal
        data={books}
        renderItem={({ item: book }) => (
          <BookThumbnail book={book} onClickBook={() => onClickBook(book)} />
        )}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={refreshControl}
      />
    </View>
  );
}
