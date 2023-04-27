import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../vars/colors";
import sizes from "../vars/sizes";
import spacing from "../vars/spacing";

const DialogModal = ({
  visible,
  title,
  description,
  buttons,
  children = null,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          {children ?? null}
          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  index === 0 ? styles.cancelButton : null,
                  index === 1 ? styles.primaryButton : null,
                  button.style ? button.style : null,
                ]}
                onPress={button.onPress}
              >
                <Text style={[styles.buttonText, button.textStyle]}>
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: colors.translucid,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: colors.light,
    borderRadius: spacing.tiny,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    minWidth: "80%",
    maxWidth: "90%",
  },
  title: {
    fontSize: sizes.large,
    fontWeight: "bold",
    marginBottom: spacing.small,
    textAlign: "center",
  },
  description: {
    fontSize: sizes.medium,
    marginBottom: spacing.large,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.medium,
  },
  button: {
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: spacing.tiny,
  },
  cancelButton: {
    backgroundColor: colors.lightDark,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.light,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DialogModal;
