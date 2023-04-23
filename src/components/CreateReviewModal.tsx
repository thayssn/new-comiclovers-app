import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import spacing from "../config/spacing";
import colors from "../config/colors";
import TextButton from "./Button";

export default function ReviewModal({ visible, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  const handleRatingPress = (value) => {
    setRating(value);
    console.log(value);
  };

  const handleSubmit = () => {
    if (rating === 0 || text === "") {
      return;
    }

    const review = {
      user_name: name,
      text,
      rating,
      published_at: Date.now(),
    };

    onSubmit(review);
    setRating(0);
    setText("");
    setName("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Escreva uma avaliação</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.ratingStarsContainer}>
              {[1, 2, 3, 4, 5].map((value) => (
                <TouchableOpacity
                  key={value}
                  onPress={() => handleRatingPress(value)}
                >
                  <Text
                    style={[
                      styles.ratingStar,
                      value <= rating && styles.ratingStarFilled,
                    ]}
                  >
                    &#9733;
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            multiline={true}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Escreva um comentário"
            multiline={true}
            value={text}
            onChangeText={setText}
          />
          <TextButton text="Enviar" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: colors.translucid,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.light,
    borderRadius: spacing.small,
    padding: spacing.medium,
    width: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: spacing.small,
  },
  ratingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.medium,
  },
  ratingLabel: {
    fontSize: 16,
    marginRight: spacing.small,
  },
  ratingStarsContainer: {
    flexDirection: "row",
  },
  ratingStar: {
    fontSize: 40,
    color: colors.lightDark,
    marginRight: 4,
  },
  ratingStarFilled: {
    color: colors.golden,
  },
  input: {
    padding: 8,
  },
  textInput: {
    padding: 8,
    marginBottom: 16,
    height: 100,
  },
});
