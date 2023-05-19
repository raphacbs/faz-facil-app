import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Price from "../components/PriceText";
import { setPriceHistoryToSave } from "../store/actions/priceHistoryAction";
import { PriceHistoryPost } from "../types/PriceHistories";
import Container from "../components/Container";

const PriceInputScreen = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const product = useSelector((state) => state.product.productDetails);
  //@ts-ignore
  const products = useSelector((state) => state.product.searchResults);
  const navigation = useNavigation();

  const handleAddPrice = async (priceHistory: PriceHistoryPost) => {
    // createPriceHistory(priceHistory);
    dispatch(setPriceHistoryToSave(priceHistory));
    //@ts-ignore
    navigation.navigate("SupermarketListScreen");
  };

  return (
    <Container style={styles.container} isLoading={false} error={undefined}>
      <Text
        numberOfLines={5}
        ellipsizeMode="tail"
        style={styles.productDescription}
      >
        {product.description}
      </Text>
      <View style={styles.priceContainer}>
        <Price
          isLoading={false}
          submitPriceHistory={handleAddPrice}
          productCode={product.code}
          supermarketId={"b4d11663-26cd-4d2a-a660-d4ede3c90469"}
        />
      </View>
    </Container>
    // <View style={styles.container}>
    //   <Text
    //     numberOfLines={5}
    //     ellipsizeMode="tail"
    //     style={styles.productDescription}
    //   >
    //     {product.description}
    //   </Text>
    //   <View style={styles.priceContainer}>
    //     <Price
    //       isLoading={false}
    //       submitPriceHistory={handleAddPrice}
    //       productCode={product.code}
    //       supermarketId={"b4d11663-26cd-4d2a-a660-d4ede3c90469"}
    //     />
    //   </View>
    //   <Loading active={false} />
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  productDescription: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 100,
    borderRadius: 5,
    paddingHorizontal: 20,
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PriceInputScreen;
