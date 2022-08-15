import React, { useEffect, useState } from "react";
import { ListItem, Button } from "@rneui/themed";
import ShoppingListComponent from "../components/ShoppingListComponent";
import { BASE_URL_DEV, BASE_URL_PRD } from "@env";
import { SearchBar } from "@rneui/base";
import { useFocusEffect } from "@react-navigation/native";
import LoadingComponent from "../components/LoadingComponent";
import {
  FlatList,
  VStack,
  Center,
  Flex,
  Box,
  Stack,
  HStack,
  Icon,
  Fab,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";

export default function ShoppingListScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [search, setSearch] = useState("");
  const [fullData, setFullData] = useState([]);

  const onRefresh = async () => {
    await getShoppingList();
  };

  const getShoppingList = async () => {
    try {
      setLoading(true);
      const url = `${BASE_URL_DEV}/api/v1/shopping-carts?isArchived=false`;
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      setFullData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const archive = async (item) => {
    try {
      item.isArchived = true;
      const body = {
        id: item.id,
        description: item.description,
        supermarket: item.supermarket,
        archived: true,
      };

      const url = `${BASE_URL_DEV}/api/v1/shopping-carts`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
      onRefresh();
    }
  };

  useEffect(() => {
    getShoppingList();
    const willFocusSubscription = navigation.addListener("focus", () => {
      getShoppingList();
    });
    return willFocusSubscription;
  }, [navigation]);

  const keyExtractor = (item) => item.id;

  const renderItem = ({ item }) => (
    <ListItem.Swipeable
      onPress={() => {
        navigation.navigate("ShoppingCart", {
          id: item.id,
          name: item.description,
        });
      }}
      leftContent={(reset) => (
        <Button
          title="Editar"
          onPress={() => {
            navigation.navigate("CreateShoppingList", item);
            reset();
          }}
          icon={{ name: "edit", color: "white" }}
          buttonStyle={{ minHeight: "100%" }}
        />
      )}
      rightContent={(reset) => (
        <Button
          title="Arquivar"
          onPress={() => {
            archive(item);
            reset();
          }}
          icon={{ name: "delete", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
        />
      )}
    >
      <ShoppingListComponent shoppingList={item}></ShoppingListComponent>
    </ListItem.Swipeable>
  );

  const updateSearch = (search) => {
    setSearch(search);
    console.log(search);
    let filteredData = fullData.filter((x) =>
      x.description.toLowerCase().includes(search.toLowerCase())
    );
    console.log(filteredData);
    setData(search == "" ? fullData : filteredData);
  };

  return (
    <Stack flex={1}>
      <LoadingComponent visible={isLoading}></LoadingComponent>
      <SearchBar
        platform="android"
        containerStyle={{}}
        inputContainerStyle={{}}
        inputStyle={{}}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        loadingProps={{}}
        onChangeText={updateSearch}
        onClearText={() => console.log(onClearText())}
        placeholder="pesquisar"
        placeholderTextColor="#888"
        cancelButtonTitle="Cancelar"
        cancelButtonProps={{}}
        value={search}
      />
      <FlatList
        flex={1}
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
        refreshing={isFetching}
        onRefresh={onRefresh}
        ListFooterComponent={() => {
          return (
            <Box alignSelf={"flex-end"} bgColor="blue">
              <Fab
                renderInPortal={false}
                shadow={2}
                size="sm"
                icon={
                  <Icon color="white" as={AntDesign} name="plus" size="sm" />
                }
              />
            </Box>
          );
        }}
      />
    </Stack>
  );
}
