import Lottie from "lottie-react-native";
import { useRef } from "react";
import { View } from "react-native";
import errorAnimationJson from "../../assets/heart.json";

export default function HeartState({ animationRef, onAnimationFinish }) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        flex: 1,
        width: "100%",
        height: 240,
        justifyContent: "center",
        alignItems: "center",
      }}
      pointerEvents="none"
    >
      <Lottie
        source={errorAnimationJson}
        ref={animationRef}
        loop={false}
        style={{
          flex: 1,
          width: 40,
          height: 40,
        }}
        useNativeLooping={true}
        onAnimationFinish={(isCanceled) => {
          if (!isCanceled) {
            onAnimationFinish();
          }
        }}
      />
    </View>
  );
}
