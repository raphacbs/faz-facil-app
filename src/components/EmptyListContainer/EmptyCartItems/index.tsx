import React from "react";
import { Button, Center, Heading, VStack } from "native-base";
import LottieView from "lottie-react-native";
import { arrowDown, EmptyCartItem } from "./style";
import { EmptyListType } from "../type";

const EmptyCartItems = (props: EmptyListType) => {
  const { onPressAddButton, showAddButton } = props;
  return (
    <VStack>
      <Center>
        <LottieView
          source={require("../../../../assets/cart_items_empty.json")}
          style={EmptyCartItem}
          loop={false}
          autoPlay={true}
        />
        <Heading size={"sm"}>Sem produtos. Toque para adicionar</Heading>
        {showAddButton ? (
          <VStack>
            <LottieView
              source={require("../../../../assets/arrow_down.json")}
              style={arrowDown}
              loop={true}
              autoPlay={true}
            />
            <Button
              onPress={() => onPressAddButton && onPressAddButton()}
              size={"lg"}
              rounded={10}
            >
              Adicionar
            </Button>
          </VStack>
        ) : null}
      </Center>
    </VStack>
  );
};

export default EmptyCartItems;
