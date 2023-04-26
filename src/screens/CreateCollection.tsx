import { CommonActions } from "@react-navigation/native";
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import TextButton from "../components/TextButton";
import colors from "../config/colors";
import spacing from "../config/spacing";
import { createCollection } from "../services/collectionsService";

export default function CreateCollectionScreen({ navigation }) {
  const [title, setTitle] = useState("");

  const handleCreateCollection = async () => {
    await createCollection({ title, books: [] });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "CollectionsScreen" }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Digite o nome da nova coleção"
        value={title}
        onChangeText={setTitle}
      />
      <View>
        <TextButton onPress={handleCreateCollection} text="Criar" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    padding: spacing.medium,
  },
  textInput: {
    padding: spacing.small,
    borderRadius: spacing.tiny,
    marginBottom: spacing.medium,
  },
});
