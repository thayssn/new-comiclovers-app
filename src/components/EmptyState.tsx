import { StyleSheet, Text, View } from "react-native";
import Lottie from "lottie-react-native";
import colors, { ColorKeys } from "../config/colors";
import emptyAnimationJson from "../../assets/empty.json";

type ErrorStateParams = {
  backgroundColor?: ColorKeys;
};
export default function EmptyState({
  backgroundColor = "transparent",
}: ErrorStateParams) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors[backgroundColor],
        },
      ]}
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
        source={emptyAnimationJson}
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
});
