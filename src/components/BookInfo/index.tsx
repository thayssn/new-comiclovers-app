import { View, Image, StyleSheet, Text } from "react-native";
import { Rating } from "react-native-ratings";
import Book from "../../types/Book";
import styles from "./styles";

export default function BookInfo({ book }) {
  const { rating, title, edition = "", price = 0 }: Book = book;
  return (
    <View style={styles.bookInfo}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.ratingWrapper}>
        <Rating
          type="custom"
          // type="star"
          ratingCount={5}
          imageSize={30}
          readonly
          onFinishRating={this.ratingCompleted}
        />
        <Text
          style={[styles.ratingTotal, { marginLeft: 10 }]}
        >{`(${rating.toFixed(2)})`}</Text>
      </View>
      <Text style={styles.edition}>{`Número: ${edition}`}</Text>
      <Text style={styles.price}>{`Preço: R$ ${price}`}</Text>
    </View>
  );
}
