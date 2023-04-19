import { Icon } from "react-native-elements";
import colors from "../config/colors";
import spacing from "../config/spacing";

export default ({ navigation }): any => ({
  tabBarShowLabel: false,
  activeTintColor: colors.primary,
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTintColor: colors.light,
  headerTitleStyle: {
    fontWeight: "bold",
  },
  headerLeft: (props) => (
    <Icon
      {...props}
      name="menu"
      color={colors.light}
      size={spacing.large}
      containerStyle={{
        paddingLeft: spacing.small,
        marginRight: spacing.small,
      }}
      underlayColor="transparent"
      onPress={() => navigation.toggleDrawer()}
    />
  ),
  headerRight: (props) => (
    <Icon
      {...props}
      name="ios-barcode"
      type="ionicon"
      color={colors.light}
      size={spacing.large}
      underlayColor="transparent"
      containerStyle={{ paddingRight: spacing.small }}
      onPress={() => navigation.navigate("Scanner")}
    />
  ),
});
