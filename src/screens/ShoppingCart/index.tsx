import React, { useEffect, useState, useRef } from "react";
import {
  Toast,
  FlatList,
  Input,
  Icon,
  VStack,
  Stack,
  Fab,
  Box,
} from "native-base";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { ShoppingCart } from "../../types";
import CartItem from "../../components/CartItem";
import { useDispatch } from "react-redux";
import { getShoppingCart } from "../../store/actions/shoppingListAction";
import Loading from "../../components/Loading";

interface Props {
  shoppingCart: ShoppingCart;
  navigation: any;
  shoppingList: any;
  loading: boolean;
}

const ShoppingCartScreen: React.FC<Props> = (props) => {
  const { shoppingCart, navigation, shoppingList, loading } = props;
  const keyExtractor = (item: any) => item.id;
  const dispatch = useDispatch();

  const renderItem = (obj: any) => {
    const { item, index } = obj;
    return <CartItem index={index + 1} cartItem={item}></CartItem>;
  };
  const listFooterComponent = () => <Box marginBottom={70}></Box>;

  React.useEffect(() => {
    navigation.setOptions({ title: shoppingList.description });
    dispatch(getShoppingCart(shoppingList.id));
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(getShoppingCart(shoppingList.id));
  };
  return (
    <Stack flex={1}>
      {loading ? (
        <Loading />
      ) : (
        <Stack flex={1}>
          <FlatList
            flex={1}
            keyExtractor={keyExtractor}
            data={shoppingCart.cartItems}
            renderItem={renderItem}
            refreshing={false}
            onRefresh={onRefresh}
            ListFooterComponent={listFooterComponent}
          />

          {shoppingCart.cartItems != null &&
          shoppingCart.cartItems.length > 0 ? (
            <Fab
              renderInPortal={false}
              shadow={2}
              icon={<Icon color="white" as={AntDesign} name="plus" size="md" />}
            />
          ) : (
            <Stack />
          )}

          {/* <SummaryBarComponent
            backgroundColor="#0099e6"
            amount={shoppingCart.amountItems}
            totalProducts={shoppingCart.totalProducts}
            totalCartItems={shoppingCart.totalCartItems}
            onPressAddItem={readItemCodeBar}
          ></SummaryBarComponent> */}
        </Stack>
      )}
    </Stack>
  );
};

const mapStateToProps = (store: any) => ({
  shoppingCart: store.shoppingCartReducer.shoppingCart,
  loading: store.commonReducer.loading,
  shoppingList: store.shoppingListReducer.shoppingList,
});

export default connect(mapStateToProps)(ShoppingCartScreen);
