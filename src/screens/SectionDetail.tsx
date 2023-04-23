import Book from "../types/Book";
import Loading from "../components/Loading";
import { useSection } from "../services/sectionsService";
import BooksGrid from "../components/BooksGrid";
import ErrorState from "../components/ErrorState";

export default function SectionDetailScreen({ navigation, route }) {
  const { section } = route.params;
  const { data, isLoading, refetch } = useSection(section.id);
  if (isLoading) return <Loading />;
  if (!data) return <ErrorState />;

  const { books } = data;

  const onClickBook = (book: Book) =>
    navigation.navigate("BookDetailScreen", { book });

  return (
    <BooksGrid
      books={books}
      onClickBook={onClickBook}
      isLoading={isLoading}
      onRefresh={refetch}
    />
  );
}
