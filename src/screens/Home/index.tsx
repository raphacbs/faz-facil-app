import React, { useEffect } from "react";
import { FlatList, Stack, Icon, Fab, Box } from "native-base";
import ShoppingListItem from "../../components/ShoppingListItem";
import { useSelector, useDispatch } from "react-redux";
import {
  getAll,
  getShoppingCart,
  setShoppingList,
} from "../../store/actions/shoppingListAction";
import { RootState } from "../../store/reducers";
import Container from "../../components/Container";
import LoadingSpinner from "../../components/LoadingSpinner";
import { AntDesign } from "@expo/vector-icons";
import MessageAlert from "../../components/Alert";
import { connect } from "react-redux";
import { ShoppingList } from "../../types";
import { clearError } from "../../store/actions/commonAction";
import EmptyListContainer from "../../components/EmptyListContainer";
import { resetShoppingCart } from "../../store/actions/shoppingCartAction";

const HomeScreen = (props: any) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { shoppingLists, shoppingList } = useSelector(
    (state: RootState) => state.shoppingListReducer
  );

  const fetchShoppingList = () => {
    dispatch(getAll(false));
  };

  const renderItem = (obj: any) => {
    return (
      <ShoppingListItem
        onPress={onPressItem}
        onEdit={onEditItem}
        index={obj.index}
        item={obj.item}
      />
    );
  };

  const keyExtractor = (item: any) => item.id;

  const listFooterComponent = () => <Box marginBottom={70}></Box>;

  const goToShoppingListScreen = () => {
    const shoppingList: ShoppingList = {
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

  const onEditItem = (shoppingList: ShoppingList) => {
    dispatch(setShoppingList(shoppingList));
    navigation.navigate("ShoppingList");
  };

  const onPressItem = (shoppingList: ShoppingList) => {
    dispatch(setShoppingList(shoppingList));
    navigation.navigate("ShoppingCart");
  };

  useEffect(() => {
    fetchShoppingList();
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(clearError());
      dispatch(resetShoppingCart());
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Container refreshControl={false} onRefresh={fetchShoppingList}>
      {shoppingLists != null && shoppingLists.length > 0 ? (
        <Stack>
          <FlatList
            keyExtractor={keyExtractor}
            data={shoppingLists}
            renderItem={renderItem}
            refreshing={false}
            onRefresh={fetchShoppingList}
            ListFooterComponent={listFooterComponent}
          />
          <Fab
            renderInPortal={false}
            shadow={2}
            icon={<Icon color="white" as={AntDesign} name="plus" size="md" />}
            onPress={() => {
              console.log("onPress");
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
