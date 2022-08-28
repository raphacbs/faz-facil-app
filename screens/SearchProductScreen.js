import React, { Component, useEffect, useState } from "react";
import { BASE_URL, X_API_KEY } from "@env";
import { VStack, Input, Icon, FlatList, Text, ScrollView } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import ProductItem from "../components/ProductItemComponent";
import ModalAddProductComponent from "../components/ModalAddProductComponent";

const SearchProduct = ({ route, navigation }, props) => {
  const [searchedText, setSearchedText] = useState("");
  const [isRefreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [showModalAdd, setShowModalAdd] = useState(false);
  const { shoppingCartId } = route.params;

  useEffect(() => {
    onRefresh();
  }, [searchedText]);

  const onRefresh = () => {
    console.log(searchedText);
    if (searchedText.length >= 3) {
      fetchData();
    } else {
      setProducts([]);
    }
  };

  const keyExtractor = (item) => {
    return item.id;
  };

  const fetchData = () => {
    setRefreshing(true);
    const url = `${BASE_URL}/api/v1/products?description=${searchedText}`;

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-API-KEY": X_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        setProducts(resJson.products);
        setRefreshing(false);
      })
      .catch((e) => console.log(e));
  };

  const onAddProduct = (product) => {
    setProduct(product);
    setShowModalAdd(true);
  };

  const onCloseModal = () => {
    setShowModalAdd(false);
  };

  const renderItemComponent = (data) => {
    return <ProductItem onAdd={onAddProduct} product={data.item} />;
  };

  const onPressAddProduct = () => {
    navigation.pop(2);
  };

  return (
    <VStack
      flex={1}
      w="100%"
      space={5}
      alignSelf="center"
      bgColor={"theme.principal"}
      p={2}
    >
      <Input
        placeholder="Pesquise por nome e marca"
        marginTop={2}
        placeholderTextColor={"white"}
        width="100%"
        py="3"
        px="1"
        color={"white"}
        fontSize="14"
        value={searchedText}
        onChangeText={(text) => setSearchedText(text)}
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
          searchedText != "" ? (
            <Icon
              as={<MaterialIcons name="close" />}
              size={6}
              ml="2"
              marginRight={5}
              color="white"
              onPress={() => {
                setSearchedText("");
              }}
            />
          ) : (
            ""
          )
        }
      />
      <FlatList
        flex={1}
        backgroundColor="theme.principal"
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => renderItemComponent(item)}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
      <VStack>
        <ModalAddProductComponent
          onClose={onCloseModal}
          visible={showModalAdd}
          product={product}
          shoppingCartId={shoppingCartId}
          onPressAdd={onPressAddProduct}
        />
      </VStack>
    </VStack>
  );
};

export default SearchProduct;
