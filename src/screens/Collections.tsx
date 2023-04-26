import Loading from "../components/Loading";
import { useSections } from "../services/sectionsService";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import spacing from "../config/spacing";
import { getAllCollections } from "../services/collectionsService";
import { useEffect, useState } from "react";
import Collection from "../types/Collection";
import { Icon } from "react-native-elements";
import colors from "../config/colors";

export default function CollectionsScreen({ navigation }) {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
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
  }, []);

  if (isLoading) return <Loading />;

  const onClickCollection = (collection: Collection) => {
    navigation.navigate("CollectionDetailScreen", { collection });
  };

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

  const renderCollectionItem = ({ item }) => {
    return (
      <View>
        <TouchableWithoutFeedback onPress={() => onClickCollection(item)}>
          <View style={styles.collection}>
            <Text style={styles.collectionTitle}>{item.title}</Text>
            <Icon name="chevron-right" type="entypo" size={24} />
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
  titleInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
