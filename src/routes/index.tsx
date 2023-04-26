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

type HomeStackParamList = {
  HomeScreen: undefined;
  ScannerScreen: undefined;
  BookSearchScreen: undefined;
  BookDetailScreen: { book: Book };
  SectionDetailScreen: { section: Section };
};

type CollectionsStackParamList = {
  CollectionsScreen: undefined;
  CreateCollectionScreen: undefined;
  CollectionDetailScreen: { collection: Section };
  AddBooksToCollectionScreen: {
    collectionId: string;
    booksInCollection: Book[];
  };
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
      {/* <HomeStackNavigator.Screen
        name="ScannerScreen"
        component={ScannerScreen}
        options={{
          title: "Escanear",
        }}
      /> */}
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
        options={{ title: "Minhas Coleções" }}
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
      <CollectionsStackNavigator.Screen
        name="AddBooksToCollectionScreen"
        component={BookSearchScreen}
        options={{ title: "Adicionar livros à coleção" }}
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
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" type="octicon" color={color} size={size} />
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
            <Icon
              name="barcode-outline"
              type="ionicon"
              color={color}
              size={34}
            />
          ),
          unmountOnBlur: true,
        }}
      />
    </TabNavigator.Navigator>
  );
}
