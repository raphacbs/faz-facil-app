import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { BASE_URL_DEV, BASE_URL_PRD, BASE_URL_LOCAL } from "@env";
import { ListItem, Dialog } from "@rneui/themed";
import CartItem from "../components/CartItemComponent";
import SummaryBarComponent from "../components/SummaryBarCartItemComponent";

export default function ShoppingCartScreen({ route, navigation }) {
  const { id } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [amountItems, setAmountItems] = useState("0");
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const onRefresh = () => {
    setIsFetching(true);
    getItems();
    setIsFetching(false);
  };

  const keyExtractor = (item) => item.id;

  const getItems = async () => {
    try {
      const url = `${BASE_URL_DEV}/api/v1/shopping-carts/${id}/products`;
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
      setUpdating(true);
      const url = `${BASE_URL_DEV}/api/v1/shopping-carts/${id}/products`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });
      const json = await response.json();
      getItems();
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <CartItem increment={edit} decrement={edit} cartItem={item}></CartItem>
    </ListItem>
  );

  useEffect(() => {
    getItems();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        flexDirection: "column",
      }}
    >
      <View
        style={{
          flex: 11,
        }}
      >
        {isLoading ? (
          <ActivityIndicator
            style={{
              justifyContent: "center",
              flexDirection: "column",
              alignSelf: "center",
            }}
            size={100}
          />
        ) : (
          <FlatList
            keyExtractor={keyExtractor}
            data={cartItems.sort((a, b) => a.id - b.id)}
            renderItem={renderItem}
            refreshing={isFetching}
            onRefresh={onRefresh}
          />
        )}
      </View>
      <SummaryBarComponent
        backgroundColor="green"
        amount={amountItems}
        totalProducts={totalProducts}
        totalCartItems={totalCartItems}
      ></SummaryBarComponent>
      <Dialog style={{ backgroundColor: "transparent" }} isVisible={updating}>
        <Dialog.Loading />
      </Dialog>
    </View>
  );
}
