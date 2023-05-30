import CustomButton from "../components/Button";
import { Text, StyleSheet } from "react-native";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Supermarket } from "../types/Supermarket";

import Container from "../components/Container";
import { ShoppingListPost } from "../types/ShoppingList";
import { createShoppingList } from "../store/actions/shoppingListAction";

const ShoppingListResumeScreen = () => {
  const shoppingListToSave: ShoppingListPost = {
    ...useSelector(
      //@ts-ignore
      (state) => state.shoppingList.shoppingListToSave
    ),
  };
  const supermarket: Supermarket = useSelector(
    //@ts-ignore
    (state) => state.supermarket.supermarketSelected
  );

  const navigation = useNavigation();
  const route = useRoute();

  const submitShoppingList = () => {
    shoppingListToSave.supermarketId = supermarket.id;
    createShoppingListPost(shoppingListToSave);
  };

  const queryClient = useQueryClient();

  const {
    mutate: createShoppingListPost,
    isLoading,
    error,
    isError,
  } = useMutation({
    mutationFn: (shoppingListToSave: ShoppingListPost) =>
      createShoppingList(shoppingListToSave),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["shoppingLists"] });
      //@ts-ignore
      navigation.pop(3);
      // //@ts-ignore
      // navigation.replace("HomeScreen");
    },
  });

  return (
    <Container
      style={styles.container}
      isLoading={isLoading}
      error={error}
      loadingMessage="Criando lista"
    >
      <Text style={styles.productDescription}>
        {shoppingListToSave.description}
      </Text>
      <Text style={styles.supermarketName}>{supermarket.name}</Text>
      <Text
        style={styles.supermarketDetails}
      >{`${supermarket.distance} KM | ${supermarket.address}`}</Text>
      <CustomButton
        style={styles.button}
        isLoading={isLoading}
        title={"Confirmar"}
        schema={"principal"}
        onPress={submitShoppingList}
        size="x"
      />
    </Container>
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

export default ShoppingListResumeScreen;
