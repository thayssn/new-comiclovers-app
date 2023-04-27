import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import spacing from "../vars/spacing";
import BookThumbnail from "./BookThumbnail";

export default function BooksGrid({
  books,
  isLoading,
  onRefresh = undefined,
  onClickBook,
}) {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.grid}
      contentContainerStyle={styles.container}
      numColumns={3}
      data={books}
      renderItem={({ item: book }) => (
        <View style={{ alignItems: "flex-start" }}>
          <BookThumbnail book={book} onClickBook={() => onClickBook(book)} />
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={onRefresh ?? undefined}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
  },
  grid: {
    columnGap: spacing.large,
    gap: spacing.medium,
    paddingHorizontal: spacing.tiny,
    paddingTop: spacing.small,
  },
});
