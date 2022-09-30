import React from "react";
import { Button, Center, Heading, VStack } from "native-base";
import LottieView from "lottie-react-native";
import { arrowDown, EmptyShoppingListStyle } from "./style";
import { EmptyListType } from "../type";

const EmptyShoppingList = (props: EmptyListType) => {
  const { onPressAddButton, showAddButton } = props;
  return (
    <VStack>
      <Center>
        <LottieView
          source={require("../../../../assets/shopping_list_empty.json")}
          style={EmptyShoppingListStyle}
          loop={false}
          autoPlay={true}
        />
        <Heading size={"sm"}>
          Sem listas, toque abaixo para criar uma lista
        </Heading>
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

export default EmptyShoppingList;
