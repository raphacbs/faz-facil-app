import { savePriceHistory } from "../store/actions/priceHistoryAction";
import CustomButton from "../components/Button";
import { View, Text, StyleSheet } from "react-native";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { PriceHistoryPost } from "../types/PriceHistories";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Supermarket } from "../types/Supermarket";
import { Product } from "../types/Product";

const PriceHistoryResumeScreen = () => {
  //@ts-ignore
  const product: Product = useSelector((state) => state.product.productDetails);
  const supermarket: Supermarket = useSelector(
    //@ts-ignore
    (state) => state.supermarket.supermarketSelected
  );
  const priceHistory: PriceHistoryPost = useSelector(
    //@ts-ignore
    (state) => state.priceHistory.priceHistoryToSave
  );

  const navigation = useNavigation();
  const route = useRoute();

  const submitPriceHistory = () => {
    const priceHistoryToSave: PriceHistoryPost = {
      ...priceHistory,
      supermarket: {
        id: supermarket.id,
      },
    };
    createPriceHistory(priceHistoryToSave);
  };

  const queryClient = useQueryClient();

  const {
    mutate: createPriceHistory,
    isLoading,
    error,
    isError,
  } = useMutation({
    mutationFn: (priceHistoryToSave: PriceHistoryPost) =>
      savePriceHistory(priceHistoryToSave),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });

      //@ts-ignore
      //   const previousScreen = navigation.getPrevious()?.name;
      //   console.log("screenName", previousScreen?.name);
      //   if (previousScreen?.name == "ProductListScreen") {
      //     //@ts-ignore
      //     navigation.pop(2);
      //   } else {
      //     //@ts-ignore
      //     navigation.pop(3);
      //   }
      //@ts-ignore
      navigation.pop(3);
      //@ts-ignore
      navigation.replace("ProductDetailsScreen");
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.productCode}>{product.code}</Text>
      <Text style={styles.price}>{`R$ ${priceHistory.price}`}</Text>
      <Text style={styles.supermarketName}>{supermarket.name}</Text>
      <Text
        style={styles.supermarketDetails}
      >{`${supermarket.distance} KM | ${supermarket.address}`}</Text>
      <CustomButton
        style={styles.button}
        isLoading={isLoading}
        title={"Confirmar"}
        schema={"principal"}
        onPress={submitPriceHistory}
        size="x"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productDescription: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  productCode: {
    fontSize: 16,
    textAlign: "center",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
  supermarketName: {
    fontSize: 18,
    textAlign: "center",
  },
  supermarketDetails: {
    fontSize: 14,
    textAlign: "center",
  },
  button: {
    alignSelf: "flex-end",
    marginTop: 30,
  },
});

export default PriceHistoryResumeScreen;
