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
import Loading from "../../components/Loading";
import LoadingSpinner from "../../components/LoadingSpinner";
import { AntDesign } from "@expo/vector-icons";
import MessageAlert from "../../components/Alert";
import { connect } from "react-redux";
import { ShoppingList } from "../../types";

const HomeScreen = (props: any) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { shoppingLists, shoppingList, error, loading, showAlert } =
    useSelector((state: RootState) => state.shoppingListReducer);

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

  useEffect(() => {}, [error, dispatch]);

  return (
    <Stack>
      {showAlert ? (
        <MessageAlert title={error.message} status="error" show={showAlert} />
      ) : null}
      {loading ? (
        <Loading />
      ) : (
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
            onPress={goToShoppingListScreen}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default connect()(HomeScreen);
