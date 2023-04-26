import { Camera } from "expo-camera";
import { Alert, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import DialogModal from "../components/DialogModal";
import { fetchBookByISBN, fetchISBNInfo } from "../services/booksService";

const GoToBookDialog = ({ onCancel, onAccept, visible, data }) => (
  <DialogModal
    visible={visible}
    title={"Código ISBN"}
    description={`${data?.title}`}
    buttons={[
      { text: "Cancelar", onPress: onCancel, style: "cancel" },
      {
        text: "Continuar",
        onPress: onAccept,
      },
    ]}
  />
);

const CreateNewBookDialog = ({ onCancel, onAccept, visible, data }) => (
  <DialogModal
    visible={visible}
    title={"Livro não cadastrado"}
    description={`${data?.title} ainda não foi cadastrado. Deseja cadastrá-lo agora?`}
    buttons={[
      { text: "Cancelar", onPress: onCancel, style: "cancel" },
      {
        text: "Cadastrar",
        onPress: onAccept,
      },
    ]}
  />
);

export default function ScannerScreen({ navigation }) {
  const [scanned, setScanned] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null);
  const [book, setBook] = useState(null);
  const [partialBook, setPartialBook] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  useEffect(() => {
    if (!permission || !permission.granted) requestPermission();
  }, []);

  const openDialog = () => {
    setShowDialog(true);
  };

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    setBarcodeData(data);
    try {
      const book = await fetchBookByISBN(data);
      if (!book) {
        const partialBook = await fetchISBNInfo(data);
        setPartialBook(partialBook);
        console.log(partialBook);
      } else {
        setBook(book);
      }

      openDialog();
    } catch (err) {
      console.log(err);
      Alert.alert(
        "Código inválido",
        "Nenhum livro encontrado com este código.",
        [
          {
            text: "Ok",
            onPress: () => setScanned(false),
          },
        ]
      );
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

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1 }}
      />
      {scanned && book ? (
        <GoToBookDialog
          onCancel={handleScanAgain}
          onAccept={handleGoToAnotherScreen}
          visible={showDialog}
          data={book}
        />
      ) : (
        <CreateNewBookDialog
          onCancel={handleScanAgain}
          onAccept={() => {
            console.log("criar novo livro");
          }}
          visible={showDialog}
          data={partialBook}
        />
      )}
    </View>
  );
}
