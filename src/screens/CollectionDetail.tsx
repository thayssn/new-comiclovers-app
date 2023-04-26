import Book from "../types/Book";
import Loading from "../components/Loading";
import BooksGrid from "../components/BooksGrid";
import ErrorState from "../components/ErrorState";
import { useEffect, useState } from "react";
import {
  deleteCollection,
  getCollectionDetails,
} from "../services/collectionsService";
import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import spacing from "../config/spacing";
import { Icon } from "react-native-elements";
import { CommonActions } from "@react-navigation/native";

export default function CollectionDetailScreen({ navigation, route }) {
  const { id } = route.params.collection;
  const [collection, setCollection] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const removeCollection = async () => {
    await deleteCollection(id);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "CollectionsScreen" }],
      })
    );
  };

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

  useEffect(() => {
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
    fetchCollection().then();
  }, []);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorState />;

  const onClickBook = (book: Book) =>
    navigation.navigate("BookDetailScreen", { book });

  if (!collection || !collection.books.length)
    return (
      <View style={styles.container}>
        <Text style={styles.emptyStateTitle}>
          Adicione livros à sua coleção para listá-los aqui.
        </Text>
        <ErrorState />
      </View>
    );

  return (
    <View style={styles.container}>
      <BooksGrid
        books={collection?.books}
        onClickBook={onClickBook}
        isLoading={isLoading}
      />
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
