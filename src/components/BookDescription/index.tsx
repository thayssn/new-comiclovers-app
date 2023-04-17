import React from "react";
import { ScrollView, Text } from "react-native";
import styles from "./styles";

export default function BookDescription({ book }) {
  const { writers, pages, description } = book;
  return (
    <ScrollView style={styles.scene}>
      <Text style={styles.title}>
        Autor:
        <Text style={styles.description}>{writers.join(", ")}</Text>
      </Text>
      <Text style={styles.title}>
        Páginas:
        <Text style={styles.description}>{` ${pages}`}</Text>
      </Text>
      <Text style={styles.title}>
        Descrição:
        <Text style={styles.description}>{` ${description}`}</Text>
      </Text>
    </ScrollView>
  );
}
