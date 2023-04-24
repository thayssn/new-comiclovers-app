import { Camera } from "expo-camera";
import { StyleSheet, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import DialogModal from "../components/DialogModal";
import { fetchBookByISBN, useBookByISBN } from "../services/booksService";

export default function ScannerScreen({ navigation }) {
  const [scanned, setScanned] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null);
  const [book, setBook] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  useEffect(() => {
    if (!permission || !permission.granted) requestPermission();
  }, []);

  // const { data: book, isFetching } = useBookByISBN(barcodeData);
  // console.log("isbn 📖📖📖📖📖📖", book);

  const openDialog = () => {
    setShowDialog(true);
  };

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    setBarcodeData(data);
    try {
      const book = await fetchBookByISBN(data);
      setBook(book);
    } catch (err) {
      console.log(err);
    } finally {
      openDialog();
    }
  };

  const handleScanAgain = () => {
    setScanned(false);
    setShowDialog(false);
    setBarcodeData(null);
  };

  const handleGoToAnotherScreen = () => {
    navigation.navigate("BookDetailScreen", { book });
  };

  // useEffect(() => {
  //   if (scanned && !isFetching) {
  //     openDialog();
  //   }
  // }, [scanned, isFetching, book]);

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1 }}
      />
      {scanned && (
        <DialogModal
          visible={showDialog}
          title={"Código ISBN"}
          description={`${barcodeData}`}
          buttons={[
            { text: "Cancelar", onPress: handleScanAgain, style: "cancel" },
            {
              text: "Continuar",
              onPress: () => handleGoToAnotherScreen(),
            },
          ]}
        />
      )}
    </View>
  );
}
