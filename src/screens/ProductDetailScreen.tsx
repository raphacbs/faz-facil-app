import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PriceHistoryList from "../components/PriceHistoryList";
import PriceHistoryChart from "../components/PriceHistoryChart";

const Tab = createMaterialTopTabNavigator();

const ProductDetailScreen = () => {
  //@ts-ignore
  const product = useSelector((state) => state.product.productDetails);
  console.log("product", product);
  const priceHistories = (product && product.priceHistories) || [];

  useEffect(() => {
    console.log("product-useEffect", product);
  }, [product]);

  return (
    product && (
      <Tab.Navigator>
        <Tab.Screen
          name="Produto"
          options={{
            //@ts-ignore
            tabBarButton: () => null,
          }}
        >
          {(props) => (
            <View style={styles.container}>
              <View style={styles.product}>
                <View style={styles.detail}>
                  <Text style={styles.code}>{product.code}</Text>
                  <Text
                    numberOfLines={5}
                    ellipsizeMode="tail"
                    style={styles.description}
                  >
                    {product.description}
                  </Text>
                  <Text style={styles.brand}>{product.brand}</Text>
                </View>
                <View style={styles.image}>
                  <Image
                    source={{
                      uri: product.thumbnail
                        ? product.thumbnail
                        : "https://drive.google.com/uc?id=1w361FjVApKKJn6g8H5NVZ3IVbL-fSpo4",
                    }}
                    style={styles.thumbnail}
                  />
                </View>
              </View>
              <View style={styles.priceHistoryContainer}>
                <Text style={styles.priceHistoryTitle}>
                  Histórico de Preços
                </Text>
                <PriceHistoryList priceHistories={priceHistories} />
              </View>
            </View>
          )}
        </Tab.Screen>
        <Tab.Screen name="Gráfico">
          {(props) => (
            <View style={{ flex: 1 }}>
              <PriceHistoryChart priceHistories={priceHistories} />
            </View>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  code: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  brand: {
    fontSize: 14,
    marginBottom: 16,
  },
  priceHistoryContainer: {
    marginTop: 16,
  },
  priceHistoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 10,
  },
  image: {
    flexDirection: "column",
    marginRight: 5,
  },
  detail: {
    width: "60%",
  },
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ProductDetailScreen;
