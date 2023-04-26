import { CommonActions } from "@react-navigation/native";
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
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
        placeholder="Enter Collection Title"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Create Collection" onPress={handleCreateCollection} />
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
