import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import ProductList from "../../src/components/ProductList";
import { Product } from "../../src/types/Product";
import { useSelector } from "react-redux";
import { searchProducts } from "../../src/services/api";
import { useInfiniteQuery, useQuery } from "react-query";
import { useDispatch } from "react-redux";

const ProductListScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  //@ts-ignore
  const searchTerm = useSelector((state) => state.product.searchTerm);
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["products", searchTerm],
      ({ pageParam = 1 }) => searchProducts(pageParam, searchTerm),
      {
        getNextPageParam: (lastPage) => {
          if (!lastPage.last) {
            return lastPage.pageNo + 1;
          }
          return false;
        },
        enabled: searchTerm != "",
      }
    );

  useEffect(() => {
    if (data?.pages) {
      navigation.setOptions({
        headerTitle: `Produtos (${
          data.pages.map((page) => page.items).flat().length
        })`,
      });
    }
  }, [data]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={80} style={styles.loading} />
      ) : (
        <>
          {data?.pages && (
            <ProductList
              products={data.pages.map((page) => page.items).flat()}
              handleNextPage={() => {
                if (hasNextPage) {
                  fetchNextPage();
                }
              }}
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
