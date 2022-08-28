import React, { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import { BASE_URL, X_API_KEY } from "@env";
import CartItem from "../components/CartItemComponent";
import SummaryBarComponent from "../components/SummaryBarCartItemComponent";
import { Toast, FlatList, Input, Icon, VStack, Stack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import LoadingComponent from "../components/LoadingComponent";

export default function ShoppingCartScreen({ route, navigation }) {
  const { id } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [amountItems, setAmountItems] = useState("0");
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [fullCartItems, setFullCartItems] = useState([]);
  const [search, setSearch] = useState("");
  console.log(BASE_URL);

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
      setFullCartItems(json.cartItems);
      setAmountItems(json.amountItems);
      setCartItems(json.cartItems);
      setTotalCartItems(json.totalCartItems);
      setTotalProducts(json.totalProducts);
      // navigation.setOptions({ title: "Cria lista" });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const edit = async (cartItem) => {
    try {
      setLoading(true);
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

  const renderItem = ({ item }) => (
    <CartItem increment={edit} decrement={edit} cartItem={item}></CartItem>
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
          <VStack
            w="100%"
            space={5}
            alignSelf="center"
            bgColor={"theme.principal"}
            p={2}
          >
            <Input
              placeholder="Pesquise por nome, fab e cód de produtos"
              marginTop={2}
              placeholderTextColor={"white"}
              width="100%"
              py="3"
              px="1"
              color={"white"}
              fontSize="14"
              value={search}
              onChangeText={updateSearch}
              backgroundColor="primary.300"
              borderColor="primary.300"
              rounded={30}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="search" />}
                  size={5}
                  ml="2"
                  color="white"
                />
              }
              InputRightElement={
                search != "" ? (
                  <Icon
                    as={<MaterialIcons name="close" />}
                    size={6}
                    ml="2"
                    marginRight={5}
                    color="white"
                    onPress={() => {
                      updateSearch("");
                    }}
                  />
                ) : (
                  ""
                )
              }
            />
          </VStack>
          <FlatList
            flex={1}
            backgroundColor="theme.principal"
            keyExtractor={keyExtractor}
            data={cartItems}
            renderItem={renderItem}
            refreshing={false}
            onRefresh={onRefresh}
            // initialNumToRender={10}
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
