import React, { useEffect } from "react";
import { FlatList, Stack, Icon, Fab, Box, VStack, Heading } from "native-base";
import ShoppingListItem from "../../components/ShoppingListItem";
import { useSelector, useDispatch } from "react-redux";
import { getAll } from "../../store/actions/shoppingListAction";
import { RootState } from "../../store/reducers";
import Loading from "../../components/Loading";
import { AntDesign } from "@expo/vector-icons";
import MessageAlert from "../../components/Alert";

const HomeScreen = (props: any) => {
  const dispatch = useDispatch();
  const { shoppingLists, shoppingList, error, loading, showAlert } =
    useSelector((state: RootState) => state.shoppingListReducer);

  const fetchShoppingList = () => {
    dispatch(getAll(false));
  };

  const renderItem = (obj: any) => {
    return <ShoppingListItem index={obj.index} item={obj.item} />;
  };

  const keyExtractor = (item: any) => item.id;

  const listFooterComponent = () => <Box marginBottom={70}></Box>;

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
          />
        </Stack>
      )}
    </Stack>
  );
};

export default HomeScreen;
