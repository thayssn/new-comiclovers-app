import Loading from "../components/Loading";
import { useSections } from "../services/sectionsService";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import spacing from "../vars/spacing";
import { getAllCollections } from "../services/collectionsService";
import { useCallback, useEffect, useState } from "react";
import Collection from "../types/Collection";
import { Icon } from "react-native-elements";
import colors from "../vars/colors";
import ErrorState from "../components/ErrorState";
import { useFocusEffect } from "@react-navigation/native";

export default function CollectionsScreen({ navigation }) {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchCollections = async () => {
        setIsLoading(true);
        try {
          const allCollections = await getAllCollections();
          setCollections(allCollections);
        } catch (err) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };
      fetchCollections().then();
    }, [])
  );

  const onClickCollection = (collection: Collection) => {
    navigation.navigate("CollectionDetailScreen", { collection });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: (props) => (
        <Icon
          {...props}
          name="plus"
          type="octicon"
          color={colors.dark}
          size={20}
          containerStyle={{
            paddingLeft: spacing.small,
            marginRight: spacing.small,
          }}
          underlayColor="transparent"
          onPress={() => navigation.navigate("CreateCollectionScreen")}
        />
      ),
    });
  }, []);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorState />;

  const renderCollectionItem = ({ item }) => {
    return (
      <View>
        <TouchableWithoutFeedback onPress={() => onClickCollection(item)}>
          <View style={styles.collection}>
            <Text style={styles.collectionTitle}>{item.title}</Text>
            <View style={styles.collectionAction}>
              <Text
                style={styles.collectionBooks}
              >{`(${item.books?.length})`}</Text>
              <Icon name="chevron-right" type="octicon" size={20} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={collections}
        renderItem={renderCollectionItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.medium,
  },
  collection: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: spacing.small,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,.1)",
  },
  collectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: spacing.small,
    marginBottom: spacing.tiny,
  },
  collectionAction: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  collectionBooks: {
    fontSize: 16,
    marginRight: spacing.medium,
  },
  titleInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
