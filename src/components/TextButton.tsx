import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../vars/colors";
import sizes from "../vars/sizes";
import spacing from "../vars/spacing";

export default function TextButton({
  text,
  onPress,
  style = {},
  disabled = false,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled}
    >
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
    fontSize: sizes.medium,
    fontWeight: "bold",
    color: colors.light,
    textAlign: "center",
  },
});
