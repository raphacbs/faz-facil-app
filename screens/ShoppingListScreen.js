import React, { useEffect, useState } from "react";
import ShoppingListComponent from "../components/ShoppingListComponent";
import { BASE_URL, X_API_KEY } from "@env";
import SwipeableItem from "../components/Swipeable";

import LoadingComponent from "../components/LoadingComponent";
import { FlatList, Stack, Input, VStack, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

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
      const url = `${BASE_URL}/api/v1/shopping-carts?isArchived=false`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": X_API_KEY,
        },
      });
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
      setLoading(true);
      item.isArchived = true;
      const body = {
        id: item.id,
        description: item.description,
        supermarket: item.supermarket,
        archived: true,
      };

      const url = `${BASE_URL}/api/v1/shopping-carts`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": X_API_KEY,
        },
        body: JSON.stringify(body),
      });
      const json = await response.json();
      await onRefresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getShoppingList();
    const willFocusSubscription = navigation.addListener("focus", () => {
      getShoppingList();
    });
    return willFocusSubscription;
  }, []);

  const keyExtractor = (item) => item.id;

  const renderItem = ({ item }) => (
    <SwipeableItem
      leftTitleButton="Editar"
      onPressLeftButton={() => {
        navigation.navigate("CreateShoppingList", item);
      }}
      rightTitleButton="Arquivar"
      onPressRightButton={() => {
        archive(item);
      }}
    >
      <ShoppingListComponent
        onPress={() => {
          navigation.navigate("ShoppingCart", {
            id: item.id,
            name: item.description,
          });
        }}
        shoppingList={item}
      ></ShoppingListComponent>
    </SwipeableItem>
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
      <LoadingComponent visible={isLoading}>
        <VStack
          w="100%"
          space={5}
          alignSelf="center"
          bgColor={"theme.principal"}
          p={2}
        >
          <Input
            placeholder="Pesquise pelas listas"
            marginTop={2}
            placeholderTextColor={"white"}
            width="100%"
            py="3"
            px="1"
            color={"white"}
            fontSize="14"
            value={search}
            onChangeText={updateSearch}
            backgroundColor="primary.300"
            borderColor="primary.300"
            rounded={30}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="search" />}
                size={5}
                ml="2"
                color="white"
              />
            }
          />
        </VStack>
        <FlatList
          flex={1}
          backgroundColor="theme.principal"
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderItem}
          refreshing={isFetching}
          onRefresh={onRefresh}
        />
      </LoadingComponent>
    </Stack>
  );
}
