import { LinearGradient } from "expo-linear-gradient";
import spacing from "../vars/spacing";

export default function CLGradient() {
  return (
    <LinearGradient
      colors={["#40B89D", "#00A5E2"]}
      start={[0, 0]}
      end={[1, 0]}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        borderRadius: spacing.tiny,
        // width: "100%",
        height: "100%",
      }}
    />
  );
}
