import AsyncStorage from "@react-native-async-storage/async-storage";
import Book from "../types/Book";
import Collection from "../types/Collection";
const COLLECTION_PREFIX = "@comicLovers:collections:";

export const clearStorage = async () => {
  await AsyncStorage.clear();
};

export const createCollection = async (
  collection: Partial<Collection>
): Promise<void> => {
  try {
    const collectionId = new Date().getTime().toString();
    collection.id = collectionId;

    await AsyncStorage.setItem(
      `${COLLECTION_PREFIX}${collectionId}`,
      JSON.stringify(collection)
    );

    console.log("Collection saved successfully:", collection);
  } catch (error) {
    console.error("Error creating collection:", error);
  }
};

export const getCollectionDetails = async (
  collectionId: string
): Promise<Collection> => {
  try {
    const collection = await AsyncStorage.getItem(
      `${COLLECTION_PREFIX}${collectionId}`
    );

    if (collection) {
      return JSON.parse(collection);
    } else {
      console.log(`Collection with ID ${collectionId} not found.`);
      return null;
    }
  } catch (error) {
    console.error("Error getting collection details:", error);
    return null;
  }
};

export const getAllCollections = async (): Promise<Collection[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();

    const collectionKeys = keys.filter((key) =>
      key.startsWith(COLLECTION_PREFIX)
    );

    const collections = await AsyncStorage.multiGet(collectionKeys);

    return collections.map((collection) => JSON.parse(collection[1]));
  } catch (error) {
    console.error("Error getting all collections:", error);
    return [];
  }
};

export const addBookToCollection = async (
  collectionId: string,
  book: Book
): Promise<void> => {
  try {
    const existingCollection = await AsyncStorage.getItem(
      `${COLLECTION_PREFIX}${collectionId}`
    );
    const parsedCollection = JSON.parse(existingCollection);

    parsedCollection.books.push(book);

    await AsyncStorage.setItem(
      `${COLLECTION_PREFIX}${collectionId}`,
      JSON.stringify(parsedCollection)
    );

    console.log("Book added to collection successfully:", book);
  } catch (error) {
    console.error("Error adding book to collection:", error);
  }
};

export const removeBookFromCollection = async (
  collectionId: string,
  bookId: string
): Promise<void> => {
  try {
    const existingCollection = await AsyncStorage.getItem(
      `${COLLECTION_PREFIX}${collectionId}`
    );
    const parsedCollection = JSON.parse(existingCollection);

    parsedCollection.books = parsedCollection.books.filter(
      (book) => book.id !== bookId
    );

    await AsyncStorage.setItem(
      `${COLLECTION_PREFIX}${collectionId}`,
      JSON.stringify(parsedCollection)
    );

    console.log("Book removed from collection successfully:", bookId);
  } catch (error) {
    console.error("Error removing book from collection:", error);
  }
};

export const deleteCollection = async (collectionId) => {
  try {
    const keys = await AsyncStorage.getAllKeys();

    const collectionKeys = keys.filter((key) =>
      key.startsWith(COLLECTION_PREFIX)
    );

    const collections = await AsyncStorage.multiGet(collectionKeys);

    let parsedCollections = collections.map((collection) =>
      JSON.parse(collection[1])
    );

    const collectionToRemove = parsedCollections.find(
      (collection) => collection.id === collectionId
    );

    await AsyncStorage.removeItem(
      `${COLLECTION_PREFIX}${collectionToRemove.id}`
    );

    console.log(`Collection with ID ${collectionId} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting collection with ID ${collectionId}:`, error);
  }
};
