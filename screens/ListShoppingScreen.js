import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { FAB } from "@rneui/themed";
import { Text, ListItem } from "@rneui/themed";

export default function ListShoppingScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getShoppingList = async () => {
    //TODO move getShoppingList to folder providers
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

  const list = [
    {
      id: "18191593-7256-4262-921c-8e112550a1bc",
      description: "Feira de Julho 2022",
      supermarket: "Assaí Avenida Recife",
      createAt: "2022-08-03T16:47:40.168246",
      updateAt: "2022-08-03T16:47:40.168253",
      amount: 0.0,
      amountProducts: 0,
    },
    {
      id: "a749f08b-9428-4e0e-9005-cfe5f5848c85",
      description: "Feira de Julho 2022",
      supermarket: "Assaí Avenida Recife",
      createAt: "2022-08-03T16:53:31.434969",
      updateAt: "2022-08-03T16:53:31.434976",
      amount: 0.0,
      amountProducts: 0,
    },
  ];

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>
          <Text h4>{item.description}</Text>
        </ListItem.Title>
        {/* TODO add custom component */}
        <ListItem.Subtitle>{item.createAt}</ListItem.Subtitle>
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
          data={list}
          renderItem={renderItem}
        />
      )}
      <FAB
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
      />
    </View>
  );
}
