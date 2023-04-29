import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Clipboard,
} from "react-native";
import { useSelector } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PriceHistoryList from "../components/PriceHistoryList";
import PriceHistoryChart from "../components/PriceHistoryChart";
import CustomButton from "../components/Button";
import { useNavigation } from "@react-navigation/native";
// import Clipboard from "@react-native-clipboard/clipboard";

const Tab = createMaterialTopTabNavigator();

const ProductDetailScreen = () => {
  //@ts-ignore
  const product = useSelector((state) => state.product.productDetails);
  const priceHistories = (product && product.priceHistories) || [];
  const navigation = useNavigation();

  useEffect(() => {}, [product]);

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
  };

  return (
    product && (
      <Tab.Navigator>
        <Tab.Screen
          name="Detalhes"
          options={{
            //@ts-ignore
            tabBarButton: () => null,
          }}
        >
          {(props) => (
            <View style={styles.container}>
              <View style={styles.product}>
                <View style={styles.detail}>
                  <TouchableOpacity
                    onPress={() => copyToClipboard(product.code)}
                  >
                    <Text style={styles.code}>{product.code}</Text>
                  </TouchableOpacity>
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
                  {priceHistories.length > 0 && (
                    <CustomButton
                      style={styles.buttonAddPrice}
                      isLoading={false}
                      title={"Add Preço"}
                      schema={"principal"}
                      onPress={() => {
                        //@ts-ignore
                        navigation.navigate("PriceInputScreen");
                      }}
                    />
                  )}
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
        {/* <Tab.Screen name="Gráfico">
          {(props) => (
            <View style={{ flex: 1 }}>
              <PriceHistoryChart priceHistories={priceHistories} />
            </View>
          )}
        </Tab.Screen> */}
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
    flex: 1,
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
  buttonAddPrice: {
    marginTop: 10,
  },
});

export default ProductDetailScreen;
