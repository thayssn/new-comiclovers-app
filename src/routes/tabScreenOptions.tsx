import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";
import { Icon } from "react-native-elements";
import CLGradient from "../components/CLGradient";
import colors from "../vars/colors";
import spacing from "../vars/spacing";
const logo = require("../../assets/logo-text.png");

function LogoTitle() {
  return (
    <Image
      style={{ width: 200, marginTop: 2, resizeMode: "contain" }}
      source={logo}
    />
  );
}

export default ({ navigation }): BottomTabNavigationOptions => ({
  headerBackground: () => <CLGradient />,
  headerTitle: (props) => <LogoTitle />,
  tabBarShowLabel: false,
  tabBarActiveTintColor: colors.primary,
  tabBarHideOnKeyboard: true,
  headerStyle: {
    backgroundColor: colors.primary,
  },
  // headerLeft: (props) => (
  //   <Icon
  //     {...props}
  //     name="menu"
  //     color={colors.light}
  //     size={spacing.large}
  //     containerStyle={{
  //       paddingLeft: spacing.small,
  //       marginRight: spacing.small,
  //     }}
  //     underlayColor="transparent"
  //     onPress={() => navigation.toggleDrawer()}
  //   />
  // ),
  headerRight: (props) => (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: spacing.medium,
        alignItems: "center",
        marginRight: spacing.medium,
      }}
    >
      <Icon
        {...props}
        name="search"
        type="octicon"
        color={colors.light}
        size={24}
        onPress={() => navigation.navigate("BookSearchScreen")}
      />
      {/* <Icon
        {...props}
        name="barcode-outline"
        type="ionicon"
        color={colors.light}
        size={34}
        onPress={() => navigation.navigate("ScannerScreen")}
      /> */}
    </View>
  ),
});
