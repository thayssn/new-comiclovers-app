import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "react-native-elements";
import HomeScreen from "./src/screens/Home";
import ScannerScreen from "./src/screens/Scanner";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BookDetailScreen from "./src/screens/BookDetail";

const screenOptions = ({ navigation }): any => ({
  headerStyle: {
    backgroundColor: "#00A5E2",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
  // headerLeft: (props) => (
  //   <Icon
  //     {...props}
  //     name="menu"
  //     color="#FFF"
  //     size={30}
  //     containerStyle={{ paddingLeft: 10, marginRight: 10 }}
  //     underlayColor="transparent"
  //     onPress={() => navigation.toggleDrawer()}
  //   />
  // ),
  headerRight: (props) => (
    <Icon
      {...props}
      name="ios-barcode"
      type="ionicon"
      color="#FFF"
      size={40}
      underlayColor="transparent"
      containerStyle={{ paddingRight: 10 }}
      onPress={() => navigation.navigate("Scanner")}
    />
  ),
});

const HomeStack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="BookDetail" component={BookDetailScreen} />
      <HomeStack.Screen name="Scanner" component={ScannerScreen} />
    </HomeStack.Navigator>
  );
}
