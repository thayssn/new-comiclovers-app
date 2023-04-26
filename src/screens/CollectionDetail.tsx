import Book from "../types/Book";
import Loading from "../components/Loading";
import BooksGrid from "../components/BooksGrid";
import ErrorState from "../components/ErrorState";
import { useCallback, useState } from "react";
import {
  deleteCollection,
  getCollectionDetails,
} from "../services/collectionsService";
import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import spacing from "../config/spacing";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import TextButton from "../components/TextButton";
import { sortBooksByTitleAndEdition } from "../utils/sortBooksByTitleAndEdition";

export default function CollectionDetailScreen({ navigation, route }) {
  const { id } = route.params.collection;
  const [collection, setCollection] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const removeCollection = async () => {
    await deleteCollection(id);
    navigation.navigate("CollectionsScreen");
  };

  useFocusEffect(
    useCallback(() => {
      const fetchCollection = async () => {
        setIsLoading(true);
        try {
          const collection = await getCollectionDetails(id);
          setCollection(collection);
        } catch (err) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };
      fetchCollection();

      navigation.setOptions({
        headerRight: (props) => (
          <Icon
            {...props}
            name="trash"
            type="octicon"
            color={colors.dark}
            size={20}
            containerStyle={{
              paddingLeft: spacing.small,
              marginRight: spacing.small,
            }}
            underlayColor="transparent"
            onPress={() => removeCollection()}
          />
        ),
      });
    }, [])
  );

  if (isLoading) return <Loading />;
  if (isError) return <ErrorState />;

  const onClickBook = (book: Book) =>
    navigation.navigate("BookDetailScreen", { book });

  return (
    <View style={styles.container}>
      {!collection || !collection.books.length ? (
        <View style={styles.container}>
          <Text style={styles.emptyStateTitle}>
            Adicione livros à sua coleção para listá-los aqui.
          </Text>
          <ErrorState />
        </View>
      ) : (
        <BooksGrid
          books={sortBooksByTitleAndEdition(collection.books)}
          onClickBook={onClickBook}
          isLoading={isLoading}
        />
      )}
      <View>
        <TextButton
          text="Adicionar mais livros"
          onPress={() =>
            navigation.navigate("AddBooksToCollectionScreen", {
              collectionId: id,
              collectionBooks: collection.books,
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyStateTitle: {
    fontSize: 16,
    margin: spacing.medium,
    color: colors.mediumDark,
    fontStyle: "italic",
    textAlign: "center",
  },
});
