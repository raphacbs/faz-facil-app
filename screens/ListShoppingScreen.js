import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { FAB } from "@rneui/themed";
import { Text, ListItem } from "@rneui/themed";
import ShoppingListComponent from "../components/ShoppingListComponent";
import { ScrollView } from "react-native-web";

export default function ListShoppingScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const onRefresh = () => {
    setIsFetching(true);
    getShoppingList();
    setIsFetching(false);
  };

  const getShoppingList = async () => {
    //TODO move getShoppingList to folder provider
    try {
      const response = await fetch(
        "https://feira-facil-dev.herokuapp.com/api/v1/shopping-carts"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getShoppingList();
  }, []);

  const keyExtractor = (item) => item.id;

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ShoppingListComponent shoppingList={item}></ShoppingListComponent>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
      }}
    >
      {isLoading ? (
        <ActivityIndicator size={100} />
      ) : (
        <FlatList
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderItem}
          refreshing={isFetching}
          onRefresh={onRefresh}
        />
      )}
      {/* <FAB
        style={{
          flex: 1,
          alignItems: "flex-end",
          justifyContent: "flex-end",
          paddingVertical: 50,
          paddingRight: 50,
          flexGrow: 1,
        }}
        visible={true}
        icon={{ name: "add", color: "white" }}
        color="green"
      /> */}
    </View>
  );
}
