import { FlatList, Text, View, StyleSheet } from "react-native";
import Container from "../components/Container";
import { ShoppingList } from "../types/ShoppingList";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useInfiniteQuery } from "react-query";
import {
  getShoppingList,
  setSelectedShoppingList,
  setShoppingLists,
} from "../store/actions/shoppingListAction";
import { useEffect, useState } from "react";
import ShoppingLists from "../components/ShoppingLists";

const MyShoppingListsScreen = () => {
  const [searchDescription, setSearchDescription] = useState("");
  const shoppingLists = useSelector(
    //@ts-ignore
    (state) => state.shoppingList.shoppingLists
  );
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["shoppingLists", searchDescription],
      ({ pageParam = 1 }) => getShoppingList(pageParam, searchDescription),
      {
        getNextPageParam: (lastPage) => {
          if (!lastPage.last) {
            return lastPage.pageNo + 1;
          }
          return false;
        },
        //enabled: searchTerm != "",
      }
    );

  useEffect(() => {
    const refreshData = async () => {
      if (data?.pages) {
        navigation.setOptions({
          headerTitle: `Minhas Listas (${
            data.pages.map((page) => page.items).flat().length
          })`,
        });
        await dispatch(
          setShoppingLists(data.pages.map((page) => page.items).flat())
        );
      }
    };
    refreshData();
  }, [data]);

  const tryAgain = () => {
    //@ts-ignore
    navigation.goBack();
  };

  return (
    <Container
      style={styles.container}
      isLoading={isLoading}
      error={error}
      tryAgain={tryAgain}
    >
      {data?.pages && (
        <ShoppingLists
          shoppingLists={shoppingLists}
          handleNextPage={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          onPressItem={async (item: ShoppingList) => {
            await dispatch(setSelectedShoppingList(item));
            //@ts-ignore
            navigation.navigate("ShoppingListScreen");
          }}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  supermarket: {
    fontSize: 14,
    marginBottom: 4,
  },
  createdAt: {
    fontSize: 12,
    color: "#888888",
  },
});

export default MyShoppingListsScreen;
