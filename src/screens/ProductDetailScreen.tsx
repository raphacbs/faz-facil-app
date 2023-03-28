import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { InitialState, Product } from "../../src/types/Product";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ProductDetailScreen = () => {
  //@ts-ignore
  const product = useSelector((state) => state.product.productDetails);
  console.log("product", product);
  const priceHistories = (product && product.priceHistories) || [];

  useEffect(() => {
    console.log("product-useEffect", product);
  }, [product]);

  return (
    <View style={styles.container}>
      {product && (
        <>
          <Text style={styles.code}>{product.code}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.brand}>{product.brand}</Text>
          {priceHistories.length > 0 ? (
            <View style={styles.chartContainer}></View>
          ) : null}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  code: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  brand: {
    fontSize: 14,
    marginBottom: 16,
  },
  chartContainer: {
    flex: 1,
  },
});

export default ProductDetailScreen;
