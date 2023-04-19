import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import spacing from "../config/spacing";
import BookThumbnail from "./BookThumbnail";

const BooksGrid = ({ books, isLoading, onRefresh, onClickBook }) => (
  <View style={styles.container}>
    <FlatList
      columnWrapperStyle={styles.grid}
      numColumns={3}
      data={books}
      renderItem={({ item: book }) => (
        <View style={{ alignItems: "flex-start" }}>
          <BookThumbnail book={book} onClickBook={() => onClickBook(book)} />
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
  },
  grid: {
    justifyContent: "space-between",
    paddingHorizontal: spacing.tiny,
    paddingTop: spacing.small,
  },
});

export default BooksGrid;
