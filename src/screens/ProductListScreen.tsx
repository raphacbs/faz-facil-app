import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import ProductList from "../../src/components/ProductList";
import { Product } from "../../src/types/Product";
import { useSelector } from "react-redux";
import { searchProducts } from "../../src/services/api";
import { useInfiniteQuery, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import {
  setProductDetails,
  setSearchCode,
  setSearchResults,
} from "../store/actions/productActions";

import Container from "../components/Container";

const ProductListScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  //@ts-ignore
  const searchTerm = useSelector((state) => state.product.searchTerm);
  //@ts-ignore
  const productDetails = useSelector((state) => state.product.productDetails);

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
      dispatch(setSearchResults(data.pages.map((page) => page.items).flat()));
      if (productDetails.code != "") {
        const selectedProduct = data.pages
          .map((page) => page.items)
          .find((p) => p.code == productDetails.code);
        selectedProduct && dispatch(setProductDetails(selectedProduct));
      }
    }
  }, [data]);

  const route = useRoute();
  //@ts-ignore
  const previousScreen = route.params?.previousScreen;

  const tryAgain = () => {
    //@ts-ignore
    navigation.goBack();
  };

  return (
    <Container
      style={styles.container}
      isLoading={isLoading}
      error={error}
      tryAgain={tryAgain}
    >
      {data?.pages && (
        <ProductList
          previousScreen={previousScreen}
          products={data.pages.map((page) => page.items).flat()}
          handleNextPage={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          onPressItem={async (item: Product) => {
            await dispatch(setProductDetails(item));
            //@ts-ignore
            navigation.navigate("ProductDetailsScreen");
          }}
          onAddPrice={async (item: Product) => {
            await dispatch(setProductDetails(item));
            await dispatch(setSearchCode(item.code));
            //@ts-ignore
            navigation.navigate("PriceInputScreen");
          }}
        />
      )}
    </Container>
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
