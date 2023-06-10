import { useDispatch, useSelector } from "react-redux";
import Container from "../components/Container";
import { ShoppingList } from "../types/ShoppingList";
import { View, Text, StyleSheet } from "react-native";
import { useInfiniteQuery, useQueryClient } from "react-query";
import {
  getItems,
  setItems,
  setSelectedItem,
} from "../store/actions/itemAction";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import ItemList from "../components/ItemList";
import { Item } from "../types/Item";
import { FAB } from "react-native-paper";
import ShoppingListInfo from "../components/ShoppingListInfo";

const ShoppingListScreen = () => {
  const selectedShoppingList: ShoppingList = useSelector(
    //@ts-ignore
    (state) => state.shoppingList.selectedShoppingList
  );
  const items: Array<Item> = useSelector(
    //@ts-ignore
    (state) => state.item.items
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }: any) => setState({ open });

  const { open } = state;

  const truncateString = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }

    const ellipsis = "...";
    const ellipsisLength = ellipsis.length;

    const truncationLength = Math.floor((maxLength - ellipsisLength) / 2);
    const truncatedText =
      text.slice(0, truncationLength) +
      ellipsis +
      text.slice(text.length - truncationLength);

    return truncatedText;
  };

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(
    ["items", selectedShoppingList.id],
    ({ pageParam = 1 }) => getItems(pageParam, selectedShoppingList.id),
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
          headerTitle: truncateString(selectedShoppingList.description, 15),
        });
        await dispatch(setItems(data.pages.map((page) => page.items).flat()));
      }
    };
    refreshData();
    console.log("useEffect in ShoppingList to update items");
  }, [data]);

  return (
    <Container isLoading={isLoading} error={error}>
      <ShoppingListInfo />
      {data?.pages && (
        <ItemList
          items={items}
          handleNextPage={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          onPressItem={async (item: Item) => {
            await dispatch(setSelectedItem(item));
          }}
          onAddPrice={function (item: Item): void {
            console.log("Function not implemented.");
          }}
        />
      )}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          //@ts-ignore
          navigation.navigate("BarCodeScannerScreen", {
            previousScreen: "ShoppingListScreen",
          });
        }}
      />
    </Container>
  );
};

export default ShoppingListScreen;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
