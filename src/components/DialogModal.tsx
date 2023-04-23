import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";

const DialogModal = ({ visible, onClose, title, description, buttons }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
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
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    minWidth: "80%",
    maxWidth: "90%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
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
