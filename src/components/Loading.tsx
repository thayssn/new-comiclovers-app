import { View } from "react-native";
import Lottie from "lottie-react-native";
import CLGradient from "./CLGradient";
import loadingAnimationJson from "../../assets/loading.json";

export default function Loading({ withBackground = false }) {
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
      {withBackground && <CLGradient />}
      <Lottie
        source={loadingAnimationJson}
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
