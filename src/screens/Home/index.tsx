import React, { useEffect } from "react";
import {
  FlatList,
  Stack,
  Icon,
  Fab,
  Box,
  Spinner,
  Toast,
  Button,
} from "native-base";
import ShoppingListItem from "../../components/ShoppingListItem";
import { useSelector, useDispatch } from "react-redux";
import {
  getAll,
  getMore,
  setShoppingList,
} from "../../store/actions/shoppingListAction";
import { RootState } from "../../store/reducers";
import Container from "../../components/Container";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { ShoppingListType } from "../../types";
import EmptyListContainer from "../../components/EmptyListContainer";

const HomeScreen = (props: any) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [showButton, setShowButton] = React.useState(true);
  const { shoppingLists, shoppingList, pageInfo, loadingEndReached } =
    useSelector((state: RootState) => state.shoppingListReducer);

  const fetchShoppingList = () => {
    dispatch(getAll());
  };

  const renderItem = (obj: any) => {
    return (
      <ShoppingListItem
        onPress={onPressItem}
        onEdit={onEditItem}
        index={obj.index}
        shoppingList={obj.item}
      />
    );
  };

  const keyExtractor = (item: any) => item.id;

  const listFooterComponent = () => {
    return showButton && !pageInfo.last ? (
      <Box marginBottom={30}>
        <Button
          variant={"link"}
          onPress={() => {
            dispatch(getMore({ ...pageInfo, pageNo: pageInfo.pageNo + 1 }));
          }}
          isLoading={loadingEndReached}
        >
          Carregar mais
        </Button>
      </Box>
    ) : (
      <Box marginBottom={70}></Box>
    );
  };

  const goToShoppingListScreen = () => {
    const shoppingList: ShoppingListType = {
      id: "",
      description: "",
      supermarket: "",
      createAt: "",
      updateAt: "",
      amount: "",
      amountProducts: 0,
      archived: false,
      amountCheckedProducts: 0,
    };
    dispatch(setShoppingList(shoppingList));
    navigation.navigate("ShoppingList");
  };

  const onEditItem = (shoppingList: ShoppingListType) => {
    dispatch(setShoppingList(shoppingList));
    navigation.navigate("ShoppingList");
  };

  const onPressItem = React.useCallback(
    (shoppingList: ShoppingListType) => {
      navigation.navigate("ShoppingCart", { shoppingList });
    },
    [dispatch]
  );

  // (shoppingList: ShoppingListType) => {
  //   React.useCallback(() => {
  //     dispatch(setShoppingList(shoppingList)); // <-- Dispatches action type of 'SET_GLOBAL_LOADING'
  //   }, [dispatch]);
  //   navigation.navigate("ShoppingCart");
  // };

  useEffect(() => {
    fetchShoppingList();
  }, [dispatch]);

  useEffect(() => {
    setShowButton(false);
  }, [loadingEndReached]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     dispatch(resetShoppingCart());
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  return (
    <Container refreshControl={false} onRefresh={fetchShoppingList}>
      {shoppingLists != null && shoppingLists.length > 0 ? (
        <Stack flex={1}>
          <FlatList
            keyExtractor={keyExtractor}
            data={shoppingLists}
            renderItem={renderItem}
            refreshing={false}
            onRefresh={fetchShoppingList}
            ListFooterComponent={listFooterComponent}
            // initialNumToRender={5} // Reduce initial render amount
            // maxToRenderPerBatch={1} // Reduce number in each render batch
            onEndReached={() => {
              // if (!loadingEndReached && !pageInfo.last) {

              //   dispatch(getMore({ ...pageInfo, pageNo: pageInfo.pageNo + 1 }));
              // } else {
              //   if (pageInfo.last) {
              //     Toast.show({
              //       title: "Todos os ",
              //       color: "#0099e6",
              //     });
              //   }
              // }
              setShowButton(true);
            }}
            onEndReachedThreshold={0.5}
          />
          <Fab
            renderInPortal={false}
            shadow={2}
            icon={<Icon color="white" as={AntDesign} name="plus" size="md" />}
            onPress={() => {
              goToShoppingListScreen();
            }}
          />
        </Stack>
      ) : (
        <EmptyListContainer showAddButton type="ShoppingList" />
      )}
    </Container>
  );
};

export default connect()(HomeScreen);
