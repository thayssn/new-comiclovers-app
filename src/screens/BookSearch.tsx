import Book from "../types/Book";
import Loading from "../components/Loading";
import BooksGrid from "../components/BooksGrid";
import ErrorState from "../components/ErrorState";
import { useBooksSearch } from "../services/booksService";
import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import spacing from "../config/spacing";
import { Keyboard } from "react-native";
import EmptyState from "../components/EmptyState";
import TextButton from "../components/TextButton";
import { addBookToCollection } from "../services/collectionsService";
import HeartState from "../components/HeartState";

export default function BookSearchScreen({ navigation, route }) {
  const [searchText, setSearchText] = useState("");
  const { collectionId, collectionBooks } = route?.params ?? {};
  const [booksInCollection, setBooksInCollection] = useState(
    collectionBooks ?? []
  );
  const animationRef = useRef(null);
  const playAnimation = () => {
    animationRef.current.play();
  };
  const { data, isLoading, isError, refetch } = useBooksSearch(searchText);
  const books = data || [];

  const goToDetails = (book: Book) =>
    navigation.navigate("BookDetailScreen", { book });

  const handleSearch = () => {
    if (!searchText || searchText.length < 3) return;
    Keyboard.dismiss();
    refetch();
  };

  const booksOutOfCollection = (book) =>
    !booksInCollection.map(({ id }) => id).includes(book.id);

  const addToCollection = async (book: Book) => {
    if (booksOutOfCollection(book)) {
      await addBookToCollection(collectionId, book);
      setBooksInCollection([...booksInCollection, book]);
      playAnimation();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Digite um título para buscar"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.input}
        />
        <TextButton text="Buscar" onPress={handleSearch} />
      </View>
      {isLoading ? (
        <Loading />
      ) : (
        data &&
        (books.length ? (
          <BooksGrid
            books={collectionId ? books.filter(booksOutOfCollection) : books}
            onClickBook={collectionId ? addToCollection : goToDetails}
            isLoading={isLoading}
            onRefresh={refetch}
          />
        ) : (
          <EmptyState />
        ))
      )}
      {isError && <ErrorState />}
      <HeartState
        animationRef={animationRef}
        onAnimationFinish={(a) => {
          animationRef.current?.reset();
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: spacing.medium,
  },
  input: {
    padding: spacing.small,
    borderRadius: spacing.tiny,
  },
});
