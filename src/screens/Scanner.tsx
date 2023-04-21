import { Camera } from "expo-camera";
import { Alert, StyleSheet, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useState } from "react";

export default function ScannerScreen({ navigation }) {
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission || !permission.granted) requestPermission();

  const handleBarCodeScanned = ({ data }) => {
    if (scanned) return;
    setScanned(true);
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    objectFit: "cover",
  },
  camera: { width: "100%", height: "100%" },
  buttonContainer: {},
  button: {},
  text: {},
});
