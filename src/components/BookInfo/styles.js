import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  bookInfo: { flex: 1, paddingLeft: 15 },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  edition: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 5,
  },
  rating: {
    marginVertical: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "transparent",
  },
  ratingWrapper: { flexDirection: "row", alignItems: "center" },
  ratingTotal: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 5,
  },
});

export default styles;
