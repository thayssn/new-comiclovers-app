import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import tabScreenOptions from "./tabScreenOptions";

import HomeScreen from "../screens/Home";
import ScannerScreen from "../screens/Scanner";
import BookDetailScreen from "../screens/BookDetail";

import Book from "../types/Book";
import SectionDetailScreen from "../screens/SectionDetail";
import Section from "../types/Section";

type StackParamList = {
  HomeScreen: undefined;
  BookDetailScreen: { book: Book };
  SectionDetailScreen: { section: Section };
};

const StackNavigator = createNativeStackNavigator<StackParamList>();
function HomeNavigation() {
  return (
    <StackNavigator.Navigator initialRouteName="HomeScreen" screenOptions={{}}>
      <StackNavigator.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <StackNavigator.Screen
        name="BookDetailScreen"
        component={BookDetailScreen}
        options={({ route }) => ({ title: route.params.book.title })}
      />
      <StackNavigator.Screen
        name="SectionDetailScreen"
        component={SectionDetailScreen}
        options={({ route }) => ({ title: route.params.section.title })}
      />
    </StackNavigator.Navigator>
  );
}

const TabNavigator = createBottomTabNavigator();
export default function TabsNavigation() {
  return (
    <TabNavigator.Navigator
      initialRouteName="HomeNavigation"
      screenOptions={tabScreenOptions}
    >
      <TabNavigator.Screen
        name="HomeNavigation"
        component={HomeNavigation}
        options={{
          title: "Comic Lovers",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <TabNavigator.Screen
        name="ScannerScreen"
        component={ScannerScreen}
        options={{
          title: "Escanear",
          tabBarIcon: ({ color, size }) => (
            <Icon name="ios-barcode" type="ionicon" color={color} size={size} />
          ),
        }}
      />
    </TabNavigator.Navigator>
  );
}
