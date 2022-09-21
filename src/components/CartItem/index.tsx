import React from "react";
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
import { CartItem } from "../../types";

interface Props {
  cartItem: CartItem;
  index: number;
}

const CartItemComponent = (props: Props) => {
  const { cartItem, index } = props;
  const [openActionSheet, setOpenActionSheet] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const cancelRef = React.useRef(null);

  const onCloseActionSheet = () => setOpenActionSheet(false);
  const onCloseAlert = () => setOpenAlert(false);

  return (
    <Pressable
      rounded={8}
      shadow={5}
      p={2}
      bgColor={"gray.200"}
      width="95%"
      margin={2}
      borderWidth="1"
      borderColor="gray.200"
      onPress={() => {
        setOpenActionSheet(true);
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
          }}
          value="one"
        >
          <Heading size={"sm"}>{"#" + index}</Heading>
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
        <Actionsheet isOpen={openActionSheet} onClose={onCloseActionSheet}>
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
                        return;
                      }
                      let _cartItem = { ...cartItem };
                      _cartItem.amountOfProduct = value;
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
      <AlertDialog
        isOpen={openAlert}
        onClose={onCloseAlert}
        leastDestructiveRef={cancelRef}
      >
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

export default CartItemComponent;
