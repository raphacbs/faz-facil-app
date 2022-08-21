import React, { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import { BASE_URL_DEV, BASE_URL_PRD, BASE_URL_LOCAL } from "@env";
import CartItem from "../components/CartItemComponent";
import SummaryBarComponent from "../components/SummaryBarCartItemComponent";
import { Toast, FlatList } from "native-base";
import LoadingComponent from "../components/LoadingComponent";
import SwipeableItem from "../components/Swipeable";

export default function ShoppingCartScreen({ route, navigation }) {
  const { id } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [amountItems, setAmountItems] = useState("0");
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getItems();
    const willFocusSubscription = navigation.addListener("focus", () => {
      getItems();
    });
    return willFocusSubscription;
  }, [navigation]);

  const onRefresh = async () => {
    setLoading(true);
    await getItems();
    setLoading(false);
  };

  const keyExtractor = (item) => item.id;

  const getItems = async () => {
    try {
      setLoading(true);
      const url = `${BASE_URL_DEV}/api/v1/shopping-carts/${id}/cart-item`;
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      setAmountItems(json.amountItems);
      setCartItems(json.cartItems);
      setTotalCartItems(json.totalCartItems);
      setTotalProducts(json.totalProducts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const edit = async (cartItem) => {
    try {
      setLoading(true);
      const url = `${BASE_URL_DEV}/api/v1/shopping-carts/${id}/cart-item`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });
      const json = await response.json();
      await getItems();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);

      Toast.show({
        title: "Valores atualizados",
      });
    }
  };

  const removerCartItem = async (cartItem) => {
    try {
      console.log("entrou");
      setLoading(true);
      const url = `${BASE_URL_DEV}/api/v1/cart-items/${cartItem.id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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

  const readItemCodeBar = () => {
    navigation.navigate("ReadBarCode", {
      onGoBack: (ean) => {
        navigation.navigate("Product", { ean, idShoppingCart: id });
      },
    });
  };

  const renderItem = ({ item }) => (
    <SwipeableItem
      rightTitleButton="Remover"
      onPressRightButton={() => {
        removerCartItem(item);
      }}
    >
      <CartItem increment={edit} decrement={edit} cartItem={item}></CartItem>
    </SwipeableItem>
  );

  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        flexDirection: "column",
      }}
    >
      <LoadingComponent visible={isLoading}>
        <View
          style={{
            flex: 11,
          }}
        >
          <FlatList
            flex={1}
            backgroundColor="theme.principal"
            keyExtractor={keyExtractor}
            data={cartItems.sort((a, b) => a.id - b.id)}
            renderItem={renderItem}
            refreshing={false}
            onRefresh={onRefresh}
          />
        </View>
        <SummaryBarComponent
          backgroundColor="#0099e6"
          amount={amountItems}
          totalProducts={totalProducts}
          totalCartItems={totalCartItems}
          onPressAddItem={readItemCodeBar}
        ></SummaryBarComponent>
      </LoadingComponent>
    </View>
  );
}
