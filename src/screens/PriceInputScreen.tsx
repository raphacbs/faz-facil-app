import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Price from "../components/PriceText";
import { setPriceHistoryToSave } from "../store/actions/priceHistoryAction";
import { PriceHistoryPost } from "../types/PriceHistories";
import Container from "../components/Container";
import { searchProductByCode } from "../store/actions/productActions";
import { Product } from "../types/Product";
import { Item, ItemPost } from "../types/Item";
import { addItem } from "../store/actions/itemAction";
import { useMutation, useQueryClient } from "react-query";
import * as Haptics from "expo-haptics";
import { SheetManager } from "react-native-actions-sheet";

const PriceInputScreen = () => {
  const dispatch = useDispatch();
  const [anyError, setAnyError] = useState<any>(undefined);
  const [product, setProduct] = useState<Product>({
    code: "",
    description: "",
    brand: "",
    thumbnail: "",
    createdAt: "",
    updateAt: "",
    unit: "",
    priceHistories: [],
  });
  //@ts-ignore
  // const product = useSelector((state) => state.product.productDetails);
  //@ts-ignore
  const code = useSelector((state) => state.product.codeSearched);

  const selectedShoppingList = useSelector(
    //@ts-ignore
    (state) => state.shoppingList.selectedShoppingList
  );
  const navigation = useNavigation();
  const route = useRoute();

  const { data, isLoading, error } = searchProductByCode(code);
  const queryClient = useQueryClient();
  const {
    mutate: addItemMutation,
    isLoading: isLoadingMutate,
    error: errorMutate,
    isError: isErrorMutate,
  } = useMutation({
    mutationFn: (item: ItemPost) => addItem(item),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["shoppingLists"] });
      await queryClient.invalidateQueries({ queryKey: ["home-shoppingLists"] });
      await queryClient.invalidateQueries({ queryKey: ["items"] });
      await queryClient.invalidateQueries({ queryKey: ["products"] });

      //@ts-ignore
      navigation.navigate("ShoppingListScreen");
    },
  });

  useEffect(() => {
    if (data) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setProduct(data);
    } else if (isLoading == false) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      //@ts-ignore
      navigation.navigate("ShoppingListScreen");
      //@ts-ignore
      SheetManager.show("register-sheet");
    }
  }, [data]);

  useEffect(() => {
    if (errorMutate) {
      setAnyError(errorMutate);
    }
    if (error) {
      setAnyError(error);
    }
  }, [errorMutate, error]);

  const handleAddPrice = async (priceHistory: PriceHistoryPost) => {
    // createPriceHistory(priceHistory);
    dispatch(setPriceHistoryToSave(priceHistory));
    //@ts-ignore
    navigation.navigate({
      name: "SupermarketListScreen",
      params: { nextScreen: "PriceHistoryResumeScreen" },
    });
  };
  const handleAddItem = async (item: ItemPost) => {
    addItemMutation(item);
  };

  const handleError = () => {};

  return (
    <Container
      isLogged={true}
      style={styles.container}
      isLoading={isLoading || isLoadingMutate}
      error={anyError}
    >
      <Text
        numberOfLines={5}
        ellipsizeMode="tail"
        style={styles.productDescription}
      >
        {product.description}
      </Text>
      <Text numberOfLines={5} ellipsizeMode="tail" style={styles.productCode}>
        {product.code}
      </Text>
      <View style={styles.priceContainer}>
        <Price
          //@ts-ignore
          addItem={route.params?.previousScreen == "ShoppingListScreen"}
          isLoading={false}
          submitPriceHistory={handleAddPrice}
          productCode={product.code}
          supermarketId={"b4d11663-26cd-4d2a-a660-d4ede3c90469"}
          submitItem={handleAddItem}
          shoppingListId={selectedShoppingList.id}
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
    marginRight: 5,
    marginLeft: 5,
  },
  productCode: {
    fontSize: 15,
    marginBottom: 20,
    marginRight: 5,
    alignSelf: "flex-start",
    marginLeft: 30,
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
