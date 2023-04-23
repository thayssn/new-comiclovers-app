import Book from "../types/Book";
import Loading from "../components/Loading";
import BooksGrid from "../components/BooksGrid";
import ErrorState from "../components/ErrorState";
import { useBooksSearch } from "../services/booksService";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import spacing from "../config/spacing";
import colors from "../config/colors";
import { Keyboard } from "react-native";

export default function BookSearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const { data, isLoading, isError, refetch } = useBooksSearch(searchText);
  const books = data || [];

  const onClickBook = (book: Book) =>
    navigation.navigate("BookDetailScreen", { book });

  const handleSearch = () => {
    if (!searchText || searchText.length < 3) return;
    Keyboard.dismiss();
    refetch();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Digite um título para buscar"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.input}
        />
        <Button title="Buscar" onPress={handleSearch} />
      </View>
      {isLoading ? (
        <Loading />
      ) : (
        data && (
          <BooksGrid
            books={books}
            onClickBook={onClickBook}
            isLoading={isLoading}
            onRefresh={refetch}
          />
        )
      )}
      {isError && <ErrorState />}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  searchContainer: {
    padding: spacing.medium,
  },
  input: {
    padding: spacing.small,
    borderRadius: spacing.tiny,
  },
});