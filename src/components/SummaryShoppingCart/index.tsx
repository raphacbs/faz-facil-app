import {
  Text,
  Center,
  Heading,
  HStack,
  VStack,
  Box,
  Progress,
} from "native-base";
import React from "react";
import { connect } from "react-redux";
import { ShoppingCartType } from "../../types";

interface Props {
  shoppingCart: ShoppingCartType;
}

const SummaryShoppingCart = (props: Props) => {
  const { shoppingCart } = props;
  const calculateProgress = (partialValue: number, totalValue: number) => {
    let percentile: string = ((partialValue / totalValue) * 100).toFixed();
    return parseInt(percentile);
  };

  return (
    <VStack w={"100%"} h={60} backgroundColor={"#0099e6"} roundedBottom={20}>
      <Progress
        bg="coolGray.100"
        _filledTrack={{
          bg: "lime.500",
        }}
        value={calculateProgress(
          shoppingCart.totalProductsChecked,
          shoppingCart.totalProducts
        )}
        size="sm"
      />
      <HStack space={3} p={2} justifyContent={"space-around"}>
        <VStack space={1} justifyContent={"center"}>
          <Center>
            <Text color={"white"}>Qtd Produtos</Text>
            <Heading color={"white"} size={"md"}>
              {shoppingCart.totalProductsChecked}/{shoppingCart.totalProducts}
            </Heading>
          </Center>
        </VStack>
        <VStack space={1} justifyContent={"center"}>
          <Center>
            <Text color={"white"}>Total Previsto</Text>
            <Heading color={"white"} size={"md"}>
              {shoppingCart.amountItems}
            </Heading>
          </Center>
        </VStack>
        <VStack space={1} justifyContent={"center"}>
          <Center>
            <Text color={"white"}>Total</Text>
            <Heading color={"white"} size={"md"}>
              {shoppingCart.subtotalChecked}
            </Heading>
          </Center>
        </VStack>
      </HStack>
    </VStack>
  );
};

const mapStateToProps = (store: any) => {
  return {
    shoppingCart: store.shoppingCartReducer.shoppingCart,
    loading: store.commonReducer.loading,
  };
};

export default connect(mapStateToProps)(SummaryShoppingCart);
