import React from "react";
import { Image, View, Text, TouchableWithoutFeedback } from "react-native";
import styles from "./styles";

export default function BookThumbnail({ book, onClickBook }) {
  const { thumbnail, title, edition } = book;
  return (
    <TouchableWithoutFeedback onPress={onClickBook}>
      <View style={styles.book_item}>
        {thumbnail === null ? (
          <View style={styles.collection_item} />
        ) : (
          <Image
            source={{
              uri: `${thumbnail}`,
            }}
            style={styles.book_item_image}
          />
        )}
        <Text style={styles.book_item_title}>
          {`${title} ${edition ? `- ${edition} ` : ""}`}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
