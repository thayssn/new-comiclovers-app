import { View, Text, StyleSheet } from "react-native";
import { Rating } from "react-native-ratings";
import colors from "../vars/colors";
import spacing from "../vars/spacing";
import { BookReview } from "../types/Book";
import sizes from "../vars/sizes";

export default function Review({
  review,
  ghost = false,
}: {
  review: BookReview;
  ghost?: boolean;
}) {
  const { user_name, rating, text, published_at } = review;
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(published_at ?? ""));

  return (
    <View style={[styles.reviewContainer]}>
      <Text style={[styles.userName, ...(ghost ? [styles.ghost] : [])]}>
        {user_name}
      </Text>
      <Text style={[styles.date, ...(ghost ? [styles.ghost] : [])]}>
        {formattedDate}
      </Text>
      <Rating
        startingValue={rating}
        readonly
        imageSize={24}
        style={styles.rating}
        ratingCount={rating}
      />
      <Text style={[styles.text, ...(ghost ? [styles.ghost] : [])]}>
        {text}
      </Text>
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
    fontSize: sizes.medium,
    fontWeight: "bold",
    marginBottom: spacing.small,
    color: colors.dark,
  },
  text: {
    textAlign: "center",
    fontSize: sizes.small,
    marginBottom: spacing.medium,
    color: colors.dark,
  },
  date: {
    textAlign: "center",
    fontSize: sizes.small,
    marginBottom: spacing.small,
    color: colors.dark,
  },
  rating: {
    marginBottom: spacing.small,
  },
  ghost: {
    opacity: 0.3,
  },
});
