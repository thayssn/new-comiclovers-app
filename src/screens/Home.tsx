import Book from "../types/Book";
import { useBooks } from "../services/booksService";
import { View } from "react-native";
import BooksList from "../components/BooksList";
import Loading from "../components/Loading";
import { RefreshControl } from "react-native-gesture-handler";

export default function HomeScreen({ navigation }) {
  const { data: books, isLoading, refetch } = useBooks();
  if (isLoading) return <Loading />;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <BooksList
        title="Em destaque"
        books={books}
        onClickBook={(book: Book) =>
          navigation.navigate("BookDetail", { book })
        }
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      ></BooksList>
    </View>
  );
}
