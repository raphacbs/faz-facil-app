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
  Spinner,
  Button,
} from "native-base";

import { connect } from "react-redux";
import { PageInfoType, ShoppingCartType, ShoppingListType } from "../../types";
import CartItem from "../../components/CartItem";
import { useDispatch } from "react-redux";
import {
  getShoppingCart,
  setShoppingList,
} from "../../store/actions/shoppingListAction";
import Container from "../../components/Container";
import EmptyListContainer from "../../components/EmptyListContainer";
import { FabStyle } from "./style";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import SummaryShoppingCart from "../../components/SummaryShoppingCart";
import { getMoreCartItems } from "../../store/actions/shoppingCartAction";

interface Props {
  shoppingCart: ShoppingCartType;
  navigation: any;
  route: any;
  loadingEndReached: boolean;
  pageInfo: PageInfoType;
}

const ShoppingCartScreen = (props: Props) => {
  const { shoppingCart, navigation, route, loadingEndReached, pageInfo } =
    props;
  const { shoppingList } = route.params;
  const [openFab, setOpenFab] = React.useState<boolean>(false);
  const keyExtractor = (item: any) => item.id;
  const dispatch = useDispatch();
  const [showButton, setShowButton] = React.useState(true);

  const renderItem = (obj: any) => {
    const { item, index } = obj;
    return (
      <CartItem
        index={shoppingCart.totalCartItems - index}
        cartItem={item}
      ></CartItem>
    );
  };
  const listFooterComponent = () => {
    return showButton && !pageInfo.last ? (
      <Box marginBottom={30}>
        <Button
          variant={"link"}
          onPress={() => {
            dispatch(
              getMoreCartItems(shoppingList.id, {
                ...pageInfo,
                pageNo: pageInfo.pageNo + 1,
              })
            );
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

  React.useEffect(() => {
    navigation.setOptions({ title: shoppingList.description });
    dispatch(getShoppingCart(shoppingList.id));
    dispatch(setShoppingList(shoppingList));
  }, [dispatch]);

  React.useEffect(() => {
    setShowButton(false);
  }, [loadingEndReached]);

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
              onEndReachedThreshold={0.5}
              onEndReached={() => {
                // if (!loadingEndReached && !pageInfo.last) {
                //   dispatch(
                //     getMoreCartItems(shoppingList.id, {
                //       ...pageInfo,
                //       pageNo: pageInfo.pageNo + 1,
                //     })
                //   );
                // } else {
                //   if (pageInfo.last) {
                //     Toast.show({
                //       title: "tudo atualizado!",
                //       color: "#0099e6",
                //     });
                //   }
                // }
                setShowButton(true);
              }}
            />
            <Fab
              renderInPortal={false}
              shadow={2}
              icon={<Icon color="white" as={AntDesign} name="plus" size="md" />}
              onPress={() => {
                navigation.navigate("BarCodeScan");
              }}
            />
            {/* <FAB.Group
              open={openFab}
              icon={openFab ? "cart-plus" : "plus"}
              color="white"
              visible={true}
              fabStyle={FabStyle}
              actions={[
                {
                  icon: "barcode-scan",
                  label: "Código de Barras",
                  onPress: () => navigation.navigate("BarCodeScan"),
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
            /> */}
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
    loadingEndReached: store.shoppingCartReducer.loadingEndReached,
    pageInfo: store.shoppingCartReducer.pageInfo,
    loading: store.commonReducer.loading,
  };
};

export default connect(mapStateToProps)(ShoppingCartScreen);
