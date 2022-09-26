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
  Text,
  Center,
} from "native-base";

import { connect } from "react-redux";
import { ShoppingCartType, ShoppingList } from "../../types";
import CartItem from "../../components/CartItem";
import { useDispatch } from "react-redux";
import { getShoppingCart } from "../../store/actions/shoppingListAction";
import Container from "../../components/Container";
import EmptyListContainer from "../../components/EmptyListContainer";
import { FAB } from "react-native-paper";
import { FabStyle } from "./style";
import { FontAwesome5 } from "@expo/vector-icons";
import SummaryShoppingCart from "../../components/SummaryShoppingCart";

interface Props {
  shoppingCart: ShoppingCartType;
  navigation: any;
  shoppingList: ShoppingList;
}

const ShoppingCartScreen = (props: Props) => {
  const { shoppingCart, navigation, shoppingList } = props;
  const [openFab, setOpenFab] = React.useState<boolean>(false);
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

  const handleFAB = ({ open }: any) => setOpenFab(open);

  return (
    <Stack flex={1}>
      <Container refreshControl={false} onRefresh={onRefresh}>
        {shoppingCart.cartItems != null && shoppingCart.cartItems.length > 0 ? (
          <Stack w={"100%"} flex={1}>
            <SummaryShoppingCart />
            <FlatList
              flex={1}
              keyExtractor={keyExtractor}
              data={shoppingCart.cartItems}
              renderItem={renderItem}
              refreshing={false}
              onRefresh={onRefresh}
              ListFooterComponent={listFooterComponent}
            />
            <FAB.Group
              open={openFab}
              icon={openFab ? "cart-plus" : "plus"}
              color="white"
              visible={true}
              fabStyle={FabStyle}
              actions={[
                {
                  icon: "barcode-scan",
                  label: "Código de Barras",
                  onPress: () => console.log("Leu código"),
                },
                {
                  icon: "shopping-search",
                  label: "Pesquisar",
                  onPress: () => navigation.navigate("ProductSearch"),
                },
              ]}
              onStateChange={handleFAB}
              onPress={() => {
                if (openFab) {
                  // do something if the speed dial is open
                }
              }}
            />
          </Stack>
        ) : (
          <Stack w={"100%"} flex={1}>
            <SummaryShoppingCart />
            <EmptyListContainer showAddButton type="CartItem" />
          </Stack>
        )}
      </Container>
    </Stack>
  );
};

const mapStateToProps = (store: any) => {
  return {
    shoppingCart: store.shoppingCartReducer.shoppingCart,
    loading: store.commonReducer.loading,
    shoppingList: store.shoppingListReducer.shoppingList,
  };
};

export default connect(mapStateToProps)(ShoppingCartScreen);
