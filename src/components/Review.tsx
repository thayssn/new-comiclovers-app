import { View, Text, StyleSheet } from "react-native";
import { Rating } from "react-native-ratings";
import colors from "../config/colors";
import spacing from "../config/spacing";
import { BookReview } from "../types/Book";

export default function Review({ review }: { review: BookReview }) {
  const { user_name, rating, text, published_at } = review;
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(published_at ?? ""));

  return (
    <View style={styles.reviewContainer}>
      <Text style={styles.userName}>{user_name}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
      <Rating
        startingValue={rating}
        readonly
        imageSize={24}
        style={styles.rating}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewContainer: {
    padding: spacing.small,
    marginBottom: spacing.medium,
  },
  userName: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.dark,
  },
  text: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: spacing.medium,
    color: colors.dark,
  },
  date: {
    textAlign: "center",
    fontSize: 12,
    marginBottom: spacing.small,
    color: colors.dark,
  },
  rating: {
    marginBottom: spacing.small,
  },
});
