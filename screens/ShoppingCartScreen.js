import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { BASE_URL_DEV, BASE_URL_PRD } from "@env";
import { ListItem, Icon } from "@rneui/themed";
import CartItem from "../components/CartItemComponent";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
import SummaryBarComponent from "../components/SummaryBarCartItemComponent";

export default function ShoppingCartScreen({ route, navigation }) {
  const { id } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const onRefresh = () => {
    setIsFetching(true);
    getItems();
    setIsFetching(false);
  };

  const keyExtractor = (item) => item.id;

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <CartItem cartItem={item}></CartItem>
    </ListItem>
  );

  const getItems = async () => {
    try {
      const url = `${BASE_URL_DEV}/api/v1/shopping-carts/${id}/products`;
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
            data={data.cartItems}
            renderItem={renderItem}
            refreshing={isFetching}
            onRefresh={onRefresh}
          />
        )}
      </View>
      <SummaryBarComponent
        backgroundColor="green"
        cartItemList={data}
      ></SummaryBarComponent>
    </View>
  );
}
