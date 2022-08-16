import React, { useState } from "react";
import { VStack, HStack, Badge, Icon, Text, Box, Avatar } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import NumericInput from "react-native-numeric-input";
import { useEffect } from "react";

const CartItem = (props) => {
  const { increment, decrement } = props;
  const [cartItem, setCartItem] = useState({ ...props.cartItem });

  useEffect(() => {
    setCartItem(props.cartItem);
  }, [props.cartItem]);

  const update = (value) => {
    const item = {
      id: cartItem.id,
      unitValue: cartItem.unitValue,
      amountOfProduct: value,
    };
    console.log(item);
    increment(item);
  };

  const onBlur = (value) => {
    update(amountOfProduct);
    console.log(value);
  };

  return (
    <Box
      flex="1"
      safeAreaRight
      width="95%"
      borderWidth="1"
      borderColor="primary.300"
      shadow="5"
      bg="primary.300"
      p="3"
      rounded="8"
      margin={3}
    >
      <VStack space="2.5" mt="2" px="0.5">
        <HStack space={1} width="100%" justifyContent="space-between">
          <VStack>
            <Avatar
              alignSelf="flex-start"
              size="md"
              source={{
                uri: cartItem.product.image,
              }}
            >
              AJ
            </Avatar>
          </VStack>
          <VStack>
            <HStack>
              <Text
                color="coolGray.900"
                mt="3"
                fontWeight="medium"
                fontSize="md"
                width={250}
                height="100%"
                marginTop={-1}
              >
                {cartItem.product.description}
              </Text>
            </HStack>
            <Text color="coolGray.500">{cartItem.product.ean}</Text>
          </VStack>
        </HStack>
        <HStack space={4}>
          <VStack>
            <Badge
              rounded="lg"
              _text={{
                fontSize: 20,
              }}
              colorScheme="info"
              alignSelf="center"
              variant="solid"
              startIcon={<Icon as={Ionicons} name="pricetag" color="white" />}
            >
              {cartItem.unitValue}
            </Badge>
          </VStack>
        </HStack>
        <HStack justifyContent="space-between">
          <VStack>
            <Badge
              rounded="lg"
              _text={{
                fontSize: 25,
              }}
              alignSelf="center"
              variant="solid"
              colorScheme="warning"
              startIcon={
                <Icon as={Ionicons} name="calculator" size={25} color="white" />
              }
            >
              {cartItem.subtotal}
            </Badge>
          </VStack>
          <NumericInput
            value={cartItem.amountOfProduct}
            initValue={cartItem.amountOfProduct}
            onChange={(value) => {
              setCartItem({ ...cartItem, ["amountOfProduct"]: value });
              update(value);
            }}
            rounded
            rightButtonBackgroundColor="white"
            leftButtonBackgroundColor="white"
            borderColor="black"
            inputStyle={{ backgroundColor: "white", borderColor: "black" }}
            editable={true}
            onBlur={onBlur}
            selectTextOnFocus={true}
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default CartItem;
