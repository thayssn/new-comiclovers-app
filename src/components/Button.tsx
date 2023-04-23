import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";

export default function TextButton({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    padding: 15,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.light,
    textAlign: "center",
  },
});
