import React, { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import { BASE_URL, X_API_KEY } from "@env";
import CartItem from "../components/CartItemComponent";
import SummaryBarComponent from "../components/SummaryBarCartItemComponent";
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
import LoadingComponent from "../components/LoadingComponent";

export default function ShoppingCartScreen({ route, navigation }) {
  const { id } = route.params;
  const [isLoading, setLoading] = useState(false);
  const [shoppingCart, setShoppingCart] = useState({
    cartItems: [],
    totalCartItems: 0,
    totalProducts: 0,
    amountItems: "R$ 0,00",
  });
  const [fullCartItems, setFullCartItems] = useState([]);
  const [cartItemIsLoaded, setCartItemIsLoaded] = useState(true);
  console.log("20", BASE_URL);

  useEffect(() => {
    getItems();
    // const willFocusSubscription = navigation.addListener("focus", () => {
    //   getItems();
    // });
    // return willFocusSubscription;
  }, [navigation]);

  const onRefresh = async () => {
    setLoading(true);
    await getItems();
    setLoading(false);
  };

  const keyExtractor = (item) => item.id;

  const getItems = async () => {
    console.log("getItems");
    try {
      setLoading(true);
      const url = `${BASE_URL}/api/v1/shopping-carts/${id}/cart-item`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": X_API_KEY,
        },
      });
      const json = await response.json();
      setShoppingCart(json);
      setFullCartItems(json.cartItems);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const refreshingSummary = async (data) => {
    try {
      const url = `${BASE_URL}/api/v1/shopping-carts/${id}/cart-item`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": X_API_KEY,
        },
      });
      const json = await response.json();
      setShoppingCart(json);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const edit = async (cartItem) => {
    try {
      // setLoading(true);
      setCartItemIsLoaded(false);
      const url = `${BASE_URL}/api/v1/shopping-carts/${id}/cart-item`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": X_API_KEY,
        },
        body: JSON.stringify(cartItem),
      });
      const json = await response.json();
      setShoppingCart(json);
      setFullCartItems(json.cartItems);
      //await getItems();
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
      setCartItemIsLoaded(true);

      Toast.show({
        title: "Valores atualizados",
      });
    }
  };

  const addCartItem = async (cartItem) => {
    try {
      // setLoading(true);
      setCartItemIsLoaded(false);
      const url = `${BASE_URL}/api/v1/shopping-carts/${id}/cart-item`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": X_API_KEY,
        },
        body: JSON.stringify(cartItem),
      });
      const json = await response.json();
      setShoppingCart(json);
      setFullCartItems(json.cartItems);
      //await getItems();
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
      setCartItemIsLoaded(true);

      Toast.show({
        title: "Produto adicionado!",
      });
    }
  };

  const removerCartItem = async (cartItem) => {
    try {
      console.log("removerCartItem");
      setLoading(true);
      const url = `${BASE_URL}/api/v1/cart-items/${cartItem.id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": X_API_KEY,
        },
      });
      const json = await response.json();
      console.log(json);
      await getItems();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (cartItem) => {
    console.log("update");
    try {
      const url = `${BASE_URL}/api/v1/shopping-carts/${id}/cart-item`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": X_API_KEY,
        },
        body: JSON.stringify(cartItem),
      });
      const json = await response.json();

      setShoppingCart(json);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const readItemCodeBar = () => {
    navigation.navigate("ReadBarCode", {
      idShoppingCart: id,
      scannerAgain: false,
    });

    // navigation.navigate("ReadBarCode", {
    //   onGoBack: (ean) => {
    //     navigation.navigate("Product", { ean, idShoppingCart: id });
    //   },
    // });
  };

  const renderItem = ({ item, index }) => (
    <CartItem
      index={index + 1}
      isLoaded={cartItemIsLoaded}
      cartItem={item}
      shoppingCartId={id}
      // afterRefreshingAmount={refreshingSummary}
      update={setShoppingCart}
      onRemove={removerCartItem}
    ></CartItem>
  );

  const updateSearch = (search) => {
    setSearch(search);
    const filteredData = fullCartItems.filter(
      (x) =>
        x.product.description.toLowerCase().includes(search.toLowerCase()) ||
        x.product.brand.toLowerCase().includes(search.toLowerCase()) ||
        x.product.ean.toLowerCase().includes(search.toLowerCase())
    );
    setCartItems(search == "" ? fullCartItems : filteredData);
  };

  const lastItem = () => <Box marginBottom={70}></Box>;

  return (
    <Stack flex={1}>
      <FlatList
        flex={1}
        keyExtractor={keyExtractor}
        data={shoppingCart.cartItems}
        renderItem={renderItem}
        refreshing={isLoading}
        onRefresh={onRefresh}
        ListFooterComponent={lastItem}
      />

      {shoppingCart.cartItems != null && shoppingCart.cartItems.length > 0 ? (
        <Fab
          renderInPortal={false}
          shadow={2}
          onPress={readItemCodeBar}
          size="md"
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
  );
}
