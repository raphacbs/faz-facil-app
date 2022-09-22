import React from "react";
import { Button, Center, Heading, VStack } from "native-base";
import LottieView from "lottie-react-native";
import { arrowDown, EmptyShoppingListStyle } from "./style";
import { EmptyListType } from "../type";

const EmptyListDefault = (props: EmptyListType) => {
  const { onPressAddButton, showAddButton } = props;
  return (
    <VStack>
      <Center>
        <LottieView
          source={require("../../../../assets/empty-default.json")}
          style={EmptyShoppingListStyle}
          loop={false}
          autoPlay={true}
        />
        <Heading size={"sm"}>Nada por aqui :(</Heading>
      </Center>
    </VStack>
  );
};

export default EmptyListDefault;
