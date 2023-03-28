import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProductList from "../../src/components/ProductList";
import { Product } from "../../src/types/Product";
import { useSelector } from "react-redux";
import { searchProducts } from "../../src/services/api";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

interface Props {}

const ProductListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  //@ts-ignore
  const searchTerm = route.params?.searchTerm as string;
  const { data, isLoading, isError, error } = useQuery(
    ["products", searchTerm],
    () => searchProducts(searchTerm),
    {
      enabled: searchTerm != "",
    }
  );

  useEffect(() => {
    if (data?.items) {
      navigation.setOptions({
        headerTitle: `Produtos (${data?.items.length})`,
      });
      console.log("setOptions");
    }
  }, [data]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={80} style={styles.loading} />
      ) : (
        <>
          {data?.items && (
            <ProductList
              products={data?.items}
              onPressItem={async (item: Product) => {
                await dispatch({
                  type: "SET_PRODUCT_DETAILS",
                  payload: item,
                });
                //@ts-ignore
                navigation.navigate("ProductDetailsScreen");
              }}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    //alignItems: 'center',
  },
  loading: {
    alignSelf: "center",
  },
});

export default ProductListScreen;
