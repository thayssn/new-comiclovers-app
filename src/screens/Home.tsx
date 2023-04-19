import Book from "../types/Book";
import BooksList from "../components/BooksList";
import Loading from "../components/Loading";
import { RefreshControl } from "react-native-gesture-handler";
import { useSections } from "../services/sectionsService";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import Section from "../types/Section";
import spacing from "../config/spacing";
import { Icon } from "react-native-elements";

export default function HomeScreen({ navigation }) {
  const { data, isLoading, refetch } = useSections();
  if (isLoading) return <Loading />;

  const onClickBook = (book: Book) =>
    navigation.navigate("BookDetailScreen", { book });

  const onClickSection = (section: Section) => {
    navigation.navigate("SectionDetailScreen", { section });
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      {data.map((section) => (
        <View style={styles.section} key={section.slug}>
          <TouchableWithoutFeedback onPress={() => onClickSection(section)}>
            <View style={styles.titleInfo}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Icon name="chevron-right" type="entypo" size={20} />
            </View>
          </TouchableWithoutFeedback>
          <BooksList
            key={section.slug}
            books={section.books}
            onClickBook={onClickBook}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    padding: spacing.small,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: spacing.small,
    marginBottom: spacing.tiny,
  },
  titleInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
