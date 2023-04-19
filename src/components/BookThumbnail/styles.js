import { StyleSheet } from "react-native";
import colors from "../../config/colors";
import spacing from "../../config/spacing";

const styles = StyleSheet.create({
  book_item: {
    width: 100,
    marginBottom: spacing.medium,
    alignItems: "center",
  },
  book_item_image: {
    width: 120,
    height: 175,
    resizeMode: "cover",
    backgroundColor: colors.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  book_item_title: {
    fontSize: 14,
    marginTop: spacing.small,
    textAlign: "center",
  },
});

export default styles;
