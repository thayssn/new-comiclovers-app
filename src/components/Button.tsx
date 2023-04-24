import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import spacing from "../config/spacing";

export default function TextButton({ text, onPress, style = {} }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: spacing.tiny,
    padding: spacing.medium,
    flexGrow: 1,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.light,
    textAlign: "center",
  },
});
