import React, { useState, useEffect } from "react";
import {
  VStack,
  HStack,
  Text,
  Box,
  Center,
  Image,
  Button,
  IconButton,
  Heading,
  Skeleton,
  AlertDialog,
  Input,
  Checkbox,
  Icon,
  Pressable,
  Actionsheet,
} from "native-base";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { BASE_URL, X_API_KEY } from "@env";
import { TouchableOpacity } from "react-native";

const CartItem = (props) => {
  const [cartItem, setCartItem] = useState(props.cartItem);
  // const [isLoaded, setLoaded] = useState(props.isLoaded);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isOpenActionSheet, setIsOpenActionSheet] = useState(false);

  useEffect(() => {
    setCartItem(props.cartItem);
    // console.log("props.cartItem", props.cartItem);
  }, [props.cartItem]);
  const onCloseActionSheet = () => setIsOpenActionSheet(false);

  const onCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const update = async (_cartItem) => {
    console.log("update", _cartItem);
    // const _cartItem = {
    //   id: cartItem.id,
    //   amountOfProduct: value,
    //   unitValue: cartItem.unitValue,
    // };
    setCartItem(_cartItem);
    // increment(_cartItem);
    try {
      const url = `${BASE_URL}/api/v1/shopping-carts/${props.shoppingCartId}/cart-item`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": X_API_KEY,
        },
        body: JSON.stringify(_cartItem),
      });
      const json = await response.json();
      // console.log(JSON.stringify(json));
      // setCartItem({
      //   ...cartItem,
      //   amountOfProduct: json.amountOfProduct,
      //   subtotal: json.subtotal,
      // });

      props.update(json);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const onBlur = (value) => {
    update(value);
  };

  const remove = () => {
    setIsAlertOpen(true);
  };

  const truncate = (text) => {
    if (text.length > 38) {
      return text.slice(0, 35).concat("...");
    }
    return text;
  };

  return (
    <Pressable
      rounded={8}
      shadow={5}
      p={2}
      bgColor={"gray.200"}
      safeAreaRight
      width="95%"
      margin={2}
      borderWidth="1"
      borderColor="gray.200"
      onPress={() => {
        setIsOpenActionSheet(true);
      }}
    >
      <HStack space={2}>
        <Checkbox
          size={"lg"}
          icon={<Icon as={FontAwesome} name="check" opacity={1} />}
          colorScheme="success"
          isChecked={cartItem.isChecked}
          onChange={(state) => {
            let _cartItem = { ...cartItem };
            _cartItem.isChecked = state;
            update(_cartItem);
          }}
          value="one"
        >
          <Heading size={"sm"}>{"#" + props.index}</Heading>
        </Checkbox>

        <VStack flex={1}>
          <Heading isTruncated marginTop={1} marginRight={2} size="xs">
            {cartItem.product.description}
          </Heading>

          <Text fontSize="sm">{cartItem.product.brand}</Text>
          <Text fontSize="2xs">{cartItem.product.ean}</Text>
        </VStack>
      </HStack>

      <HStack w={"100%"} justifyContent="space-around">
        <VStack>
          <Text fontSize="sm">Preço</Text>
          <Text fontWeight={"bold"} fontSize="sm">
            {cartItem.unitValue}
          </Text>
        </VStack>
        <VStack>
          <Text fontSize="sm">QTD</Text>
          <Text fontWeight={"bold"} fontSize="sm">
            {cartItem.amountOfProduct}
          </Text>
        </VStack>
        <VStack>
          <Text fontSize="sm">Total</Text>
          <Text fontWeight={"bold"} fontSize="sm">
            {cartItem.subtotal}
          </Text>
        </VStack>
      </HStack>
      <Center>
        <Actionsheet isOpen={isOpenActionSheet} onClose={onCloseActionSheet}>
          <Actionsheet.Content>
            <HStack w={"98%"} space={2}>
              <VStack>
                <Image
                  rounded={20}
                  h={30}
                  source={{
                    uri: cartItem.product.image,
                  }}
                  fallbackSource={{
                    uri: "https://drive.google.com/uc?id=1w361FjVApKKJn6g8H5NVZ3IVbL-fSpo4",
                  }}
                  alt="Product Image"
                  size="md"
                />
              </VStack>

              <VStack flex={1} w={"100%"}>
                <Heading size="xs">{cartItem.product.description}</Heading>
                <Text fontSize="sm">{cartItem.product.brand}</Text>
                <Text fontSize="2xs">{cartItem.product.ean}</Text>
                <HStack space={2} justifyContent="flex-start">
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
                </HStack>
                <HStack space={3} justifyContent="flex-end">
                  <IconButton
                    colorScheme="danger"
                    key={"minus"}
                    variant={"ghost"}
                    _icon={{
                      as: AntDesign,
                      name: "minuscircle",
                    }}
                    onPress={() => {
                      let value = cartItem.amountOfProduct - 1;
                      if (value <= 0) {
                        remove();
                        return;
                      }
                      let _cartItem = { ...cartItem };
                      _cartItem.amountOfProduct = value;
                      update(_cartItem);
                    }}
                  />
                  <Heading alignSelf={"center"} size="xs">
                    {cartItem.amountOfProduct}
                  </Heading>
                  <IconButton
                    colorScheme="success"
                    key={"plus"}
                    variant={"ghost"}
                    _icon={{
                      as: AntDesign,
                      name: "pluscircle",
                    }}
                    onPress={() => {
                      let value = cartItem.amountOfProduct + 1;
                      let _cartItem = { ...cartItem };
                      _cartItem.amountOfProduct = value;
                      update(_cartItem);
                    }}
                  />
                </HStack>
              </VStack>
            </HStack>

            <Actionsheet.Item
              onPress={() => {
                onCloseActionSheet();
              }}
            >
              Remover
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                onCloseActionSheet();
              }}
            >
              Cancelar
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
      <AlertDialog isOpen={isAlertOpen} onClose={onCloseAlert}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Retirar produto</AlertDialog.Header>
          <AlertDialog.Body>
            Deseja remover o produto{" "}
            <Text bold>{cartItem.product.description}</Text> do carrinho?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onCloseAlert}
              >
                Não
              </Button>
              <Button
                colorScheme="danger"
                onPress={() => {
                  console.log("onPress");
                  if (props.onRemove != undefined) {
                    props.onRemove(cartItem);
                  }
                }}
              >
                Sim
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Pressable>
  );
};

export default CartItem;
