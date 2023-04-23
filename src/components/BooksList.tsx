import { StyleSheet, Text, View, FlatList } from "react-native";
import spacing from "../config/spacing";
import BookThumbnail from "./BookThumbnail";

export default function BooksList({ books, onClickBook }) {
  return (
    <FlatList
      contentContainerStyle={styles.bookList}
      horizontal
      data={books}
      renderItem={({ item: book }) => (
        <View style={styles.bookListItem}>
          <BookThumbnail book={book} onClickBook={() => onClickBook(book)} />
        </View>
      )}
      keyExtractor={({ id }) => id}
    />
  );
}

const styles = StyleSheet.create({
  bookList: {
    alignItems: "flex-start",
  },
  bookListItem: {
    marginHorizontal: spacing.medium,
  },
});
