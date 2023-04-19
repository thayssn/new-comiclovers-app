import { Text, View } from "react-native";
import Lottie from "lottie-react-native";
const errorAnimationJson = require("../../assets/error.json");

export default function ErrorState({ withBackground = false }) {
  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
        }}
      >
        Oops!
      </Text>
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
