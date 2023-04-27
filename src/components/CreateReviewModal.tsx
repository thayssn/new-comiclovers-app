import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import spacing from "../vars/spacing";
import colors from "../vars/colors";
import TextButton from "./TextButton";
import { BookReview } from "../types/Book";
import sizes from "../vars/sizes";
import Loading from "./Loading";

export default function ReviewModal({ visible, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRatingPress = (value) => {
    setRating(value);
  };

  const handleClose = () => {
    setIsLoading(false);
    setRating(0);
    setText("");
    setName("");
    setError(null);
    onClose();
  };

  const handleSubmit = async () => {
    if (name === "") {
      setError("Nome obrigatório");
      return;
    }
    if (rating === 0) {
      setError("Você precisa dar uma nota");
      return;
    }
    if (text === "") {
      setError("Por favor, deixe um comentário.");
      return;
    }

    const review: BookReview = {
      user_id: "fake-user-id",
      user_name: name,
      text,
      rating,
      published_at: new Date(Date.now()).toISOString(),
    };
    setIsLoading(true);
    await onSubmit(review);
    handleClose();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Modal visible={visible} transparent={true} onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          {isLoading ? (
            <Loading />
          ) : (
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
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Escreva um comentário"
                multiline={true}
                textAlignVertical="top"
                numberOfLines={4}
                value={text}
                onChangeText={setText}
              />
              {error && <Text style={styles.error}>{error}</Text>}
              <View style={styles.buttonGroup}>
                <TextButton
                  text="Cancelar"
                  onPress={handleClose}
                  style={{ backgroundColor: colors.lightDark }}
                />
                <TextButton text="Enviar" onPress={handleSubmit} />
              </View>
            </View>
          )}
        </View>
      </Modal>
    </KeyboardAvoidingView>
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
    textAlign: "center",
    fontSize: sizes.large,
    fontWeight: "bold",
    marginBottom: spacing.medium,
  },
  ratingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.medium,
  },
  ratingLabel: {
    fontSize: sizes.large,
    marginRight: spacing.small,
  },
  ratingStarsContainer: {
    flexDirection: "row",
  },
  ratingStar: {
    fontSize: sizes.gigantic,
    color: colors.lightDark,
    marginRight: 4,
  },
  ratingStarFilled: {
    color: colors.golden,
  },
  input: {
    padding: spacing.small,
    marginBottom: spacing.small,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.small,
  },
  error: {
    color: colors.danger,
    marginBottom: spacing.medium,
  },
});
