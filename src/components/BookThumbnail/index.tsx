import React from "react";
import { Image, View, Text, TouchableWithoutFeedback } from "react-native";
import { Icon } from "react-native-elements";
import colors from "../../config/colors";
import styles from "./styles";

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
