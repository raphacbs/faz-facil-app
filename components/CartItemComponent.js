import React, { useState } from "react";
import {
  VStack,
  HStack,
  Badge,
  Icon,
  Text,
  Box,
  Center,
  Image,
  Button,
  IconButton,
  Divider,
  Flex,
  Input,
  Heading,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NumericInput from "react-native-numeric-input";
import { useEffect } from "react";

const CartItem = (props) => {
  const { increment, decrement } = props;
  const { cartItem } = props;

  // useEffect(() => {
  //   // setCartItem(props.cartItem);
  // }, [props.cartItem]);

  const update = (value) => {
    const _cartItem = {
      id: cartItem.id,
      amountOfProduct: value,
      unitValue: cartItem.unitValue,
    };
    // setCartItem(item);
    increment(_cartItem);
  };

  const onBlur = (value) => {
    update(value);
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
      <HStack space={2}>
        <VStack flex={1}>
          <Center>
            <Image
              source={{
                uri: cartItem.product.image,
              }}
              fallbackSource={{
                uri: "https://drive.google.com/uc?id=1w361FjVApKKJn6g8H5NVZ3IVbL-fSpo4",
              }}
              alt="Product Image"
              size="xl"
            />
          </Center>
        </VStack>
        <VStack flex={3}>
          <Heading size="xs">{cartItem.product.description}</Heading>
          <Text fontSize="sm">{cartItem.product.brand}</Text>
          <Text fontSize="sm">{cartItem.product.ean}</Text>
          <HStack space={3}>
            <VStack>
              <Text fontSize="sm">Preço</Text>
              <Text fontWeight={"bold"} fontSize="sm">
                {cartItem.unitValue}
              </Text>
            </VStack>
            <VStack>
              <Text fontSize="sm">Total</Text>
              <Text fontWeight={"bold"} fontSize="sm">
                {cartItem.subtotal}
              </Text>
            </VStack>

            <VStack>
              <Text fontSize="sm">QTD</Text>
              <Text fontWeight={"bold"} fontSize="sm">
                {cartItem.amountOfProduct}
              </Text>
            </VStack>
          </HStack>
        </VStack>
        <VStack flex={1} justifyContent="space-between">
          <HStack justifyContent="flex-end">
            <IconButton
              colorScheme="danger"
              variant={"ghost"}
              _icon={{
                as: MaterialCommunityIcons,
                name: "cart-arrow-up",
              }}
              onPress={() => {
                if (props.onRemove != undefined) {
                  props.onRemove();
                }
              }}
            />
          </HStack>
          <HStack justifyContent={"flex-end"}>
            <IconButton
              size={"sm"}
              colorScheme="success"
              variant={"solid"}
              _icon={{
                as: MaterialCommunityIcons,
                name: "minus-thick",
              }}
              onPress={() => {
                let amount = cartItem.amountOfProduct - 1;
                update(amount);
              }}
            />
            <IconButton
              size={"sm"}
              colorScheme="success"
              variant={"solid"}
              _icon={{
                as: MaterialCommunityIcons,
                name: "plus-thick",
              }}
              onPress={() => {
                let amount = cartItem.amountOfProduct + 1;
                update(amount);
              }}
            />
          </HStack>
        </VStack>
      </HStack>
      {/* <VStack space="2.5" mt="2" px="0.5">
        <HStack space={1} width="100%" justifyContent="space-between">
          <VStack>
            <Avatar
              alignSelf="flex-start"
              size="md"
              source={{
                uri: props.cartItem.product.image,
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
                {props.cartItem.product.description}
              </Text>
            </HStack>
            <Text color="coolGray.500">{props.cartItem.product.brand}</Text>
            <Text color="coolGray.500">{props.cartItem.product.ean}</Text>
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
              {props.cartItem.unitValue}
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
              {props.cartItem.subtotal}
            </Badge>
          </VStack>
          <NumericInput
            value={props.cartItem.amountOfProduct}
            initValue={props.cartItem.amountOfProduct}
            onChange={(value) => {
              update(value);
            }}
            rounded
            rightButtonBackgroundColor="white"
            leftButtonBackgroundColor="white"
            borderColor="black"
            inputStyle={{ backgroundColor: "white", borderColor: "black" }}
            editable={false}
            onBlur={onBlur}
            selectTextOnFocus={true}
          />
        </HStack>
      </VStack> */}
    </Box>
  );
};

export default CartItem;
