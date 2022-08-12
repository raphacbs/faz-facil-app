import React, { useEffect, useState, useRef } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { BASE_URL_DEV, BASE_URL_PRD, BASE_URL_LOCAL } from "@env";
import { ListItem, Dialog, Button } from "@rneui/themed";
import CartItem from "../components/CartItemComponent";
import SummaryBarComponent from "../components/SummaryBarCartItemComponent";
import { Toast } from "native-base";

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

  const onRefresh = async () => {
    // setIsFetching(true);
    setLoading(true);
    await getItems();
    setIsFetching(false);
    // setLoading(false);
  };

  const keyExtractor = (item) => item.id;

  const getItems = async () => {
    try {
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
      setUpdating(true);
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
      setUpdating(false);

      Toast.show({
        title: "Valores atualizados",
      });
    }
  };

  const removerCartItem = async (cartItem) => {
    try {
      setUpdating(true);
      const url = `${BASE_URL_DEV}/api/v1/cart-items/${cartItem.id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      await getItems();
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
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
    <ListItem.Swipeable
      onPress={() => {
        navigation.navigate("ShoppingCart", {
          id: item.id,
          name: item.description,
        });
      }}
      rightContent={(reset) => (
        <Button
          title="Remover"
          onPress={() => {
            removerCartItem(item);
            reset();
          }}
          icon={{ name: "delete", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
        />
      )}
    >
      <CartItem increment={edit} decrement={edit} cartItem={item}></CartItem>
    </ListItem.Swipeable>
    // <ListItem>
    //   <CartItem increment={edit} decrement={edit} cartItem={item}></CartItem>
    // </ListItem>
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
        onPressAddItem={readItemCodeBar}
      ></SummaryBarComponent>
      <Dialog style={{ backgroundColor: "transparent" }} isVisible={updating}>
        <Dialog.Loading />
      </Dialog>
    </View>
  );
}