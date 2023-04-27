import { StyleSheet, Text, View } from "react-native";
import Lottie from "lottie-react-native";
import errorAnimationJson from "../../assets/error.json";
import sizes from "../vars/sizes";

export default function ErrorState() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Oops!</Text>
      <Text>Não encontramos nada por aqui!</Text>
      <Lottie
        source={errorAnimationJson}
        autoPlay
        loop
        style={{
          width: 240,
          height: 240,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: sizes.huge,
    fontWeight: "bold",
  },
});
