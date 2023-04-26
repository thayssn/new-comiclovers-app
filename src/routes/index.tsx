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
import BookSearchScreen from "../screens/BookSearch";
import CollectionsScreen from "../screens/Collections";
import CollectionDetailScreen from "../screens/CollectionDetail";
import CreateCollectionScreen from "../screens/CreateCollection";
import colors from "../config/colors";
import spacing from "../config/spacing";

type HomeStackParamList = {
  HomeScreen: undefined;
  BookSearchScreen: undefined;
  BookDetailScreen: { book: Book };
  SectionDetailScreen: { section: Section };
};

type CollectionsStackParamList = {
  CollectionsScreen: undefined;
  CreateCollectionScreen: undefined;
  CollectionDetailScreen: { collection: Section };
};

const HomeStackNavigator = createNativeStackNavigator<HomeStackParamList>();
function HomeNavigation() {
  return (
    <HomeStackNavigator.Navigator initialRouteName="HomeScreen">
      <HomeStackNavigator.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <HomeStackNavigator.Screen
        name="BookDetailScreen"
        component={BookDetailScreen}
        options={({ route }) => ({ title: route.params.book.title })}
      />
      <HomeStackNavigator.Screen
        name="SectionDetailScreen"
        component={SectionDetailScreen}
        options={({ route }) => ({ title: route.params.section.title })}
      />
      <HomeStackNavigator.Screen
        name="BookSearchScreen"
        component={BookSearchScreen}
        options={{ title: "Busca" }}
      />
    </HomeStackNavigator.Navigator>
  );
}

const CollectionsStackNavigator =
  createNativeStackNavigator<CollectionsStackParamList>();
function CollectionsNavigation() {
  return (
    <CollectionsStackNavigator.Navigator initialRouteName="CollectionsScreen">
      <CollectionsStackNavigator.Screen
        name="CollectionsScreen"
        component={CollectionsScreen}
        options={{ title: "Todas" }}
      />
      <CollectionsStackNavigator.Screen
        name="CreateCollectionScreen"
        component={CreateCollectionScreen}
        options={{ title: "Criar Coleção" }}
      />
      <CollectionsStackNavigator.Screen
        name="CollectionDetailScreen"
        component={CollectionDetailScreen}
        options={({ route }) => ({
          title: route.params.collection.title,
        })}
      />
    </CollectionsStackNavigator.Navigator>
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
        name="CollectionsNavigation"
        component={CollectionsNavigation}
        options={{
          title: "Minhas coleções",
          tabBarIcon: ({ color, size }) => (
            <Icon name="archive" type="octicon" color={color} size={size} />
          ),
          unmountOnBlur: true,
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
          unmountOnBlur: true,
        }}
      />
    </TabNavigator.Navigator>
  );
}
