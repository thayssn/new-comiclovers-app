import React from "react";
import {
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-elements";
import colors from "../config/colors";
import spacing from "../config/spacing";

export default function BookThumbnail({ book, onClickBook }) {
  const { thumbnail, title, edition } = book;
  return (
    <TouchableWithoutFeedback onPress={onClickBook}>
      <View style={styles.book_item}>
        {thumbnail ? (
          <Image
            source={{
              uri: `${thumbnail}`,
            }}
            style={styles.book_item_image}
          />
        ) : (
          <View style={styles.book_item_image}>
            <Icon
              name="book-outline"
              type="ionicon"
              size={40}
              color={colors.light}
            />
          </View>
        )}
        <Text style={styles.book_item_title}>
          {`${title} ${edition ? `- ${edition} ` : ""}`}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

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
