import React, { useEffect, useState, useCallback } from "react";
import { BASE_URL, X_API_KEY } from "@env";
import { FlatList, Stack, Icon, Fab, Box, VStack } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import ShoppingListItem from "../components/ShoppingListItem";
import ListEmptyComponent from "../components/ListEmptyComponent";

export default function ShoppingListScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const getShoppingList = useCallback(async () => {
    try {
      setIsFetching(true);
      const url = `${BASE_URL}/api/v1/shopping-carts?isArchived=${route.params.isArchived}`;
      console.log(url);
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
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }, [data]);
  // );async () => {
  //   try {
  //     setIsFetching(true);
  //     const url = `${BASE_URL}/api/v1/shopping-carts?isArchived=${route.params.isArchived}`;
  //     console.log(url);
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "X-API-KEY": X_API_KEY,
  //       },
  //     });
  //     const json = await response.json();
  //     setData(json);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsFetching(false);
  //   }
  // };

  const archive = useCallback(
    async (item, isArchived) => {
      try {
        setIsFetching(true);
        const body = {
          id: item.id,
          description: item.description,
          supermarket: item.supermarket,
          archived: isArchived,
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
        await getShoppingList();
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    },
    [data]
  );

  // async (item, isArchived) => {
  //   try {
  //     setIsFetching(true);
  //     const body = {
  //       id: item.id,
  //       description: item.description,
  //       supermarket: item.supermarket,
  //       archived: isArchived,
  //     };

  //     const url = `${BASE_URL}/api/v1/shopping-carts`;
  //     const response = await fetch(url, {
  //       method: "PUT",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "X-API-KEY": X_API_KEY,
  //       },
  //       body: JSON.stringify(body),
  //     });
  //     const json = await response.json();
  //     await getShoppingList();
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsFetching(false);
  //   }
  // };

  useEffect(() => {
    getShoppingList();
    // const willFocusSubscription = navigation.addListener("focus", () => {
    //   getShoppingList();
    // });
    // return willFocusSubscription;
  }, []);

  const keyExtractor = (item) => item.id;

  const renderItem = ({ index, item }) => (
    <ShoppingListItem
      onPress={() => goToShoppingCartScreen(item)}
      shoppingList={item}
      onPressArchive={() => archive(item, true)}
      onPressUnarchive={() => archive(item, false)}
      onPressEdit={() => goToCreateShoppingListScreen(item)}
    ></ShoppingListItem>
  );

  const lastItem = () => <Box marginBottom={70}></Box>;

  const goToShoppingCartScreen = useCallback(
    (item, event) => {
      console.log("You clicked ");
      navigation.navigate("ShoppingCart", {
        id: item.id,
        name: item.description,
      });
    },
    [data]
  );

  const goToCreateShoppingListScreen = useCallback(
    (event) => {
      console.log("You clicked ", event.currentTarget);
      navigation.navigate("CreateShoppingList", {
        item,
      });
    },
    [data]
  );

  const listEmpty = () => {
    return data != null ? (
      <ListEmptyComponent
        buttonTitle="Add lista"
        message="Ops! Você não possui listas."
        onPress={goToCreateShoppingListScreen}
      />
    ) : (
      <Stack />
    );
  };

  return (
    <Stack flex={1}>
      <FlatList
        flex={1}
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
        refreshing={isFetching}
        onRefresh={getShoppingList}
        ListFooterComponent={lastItem}
        // ListEmptyComponent={listEmpty}
      />

      {data != null && data.length > 0 ? (
        <Fab
          renderInPortal={false}
          shadow={2}
          onPress={goToCreateShoppingListScreen}
          size="md"
          icon={<Icon color="white" as={AntDesign} name="plus" size="md" />}
        />
      ) : (
        <Stack />
      )}
    </Stack>
  );
}
