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
  Icon,
  Pressable,
  Actionsheet,
  Toast,
  useToast,
} from "native-base";
import { Checkbox } from "react-native-paper";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { CartItemType } from "../../types";
import { useDispatch } from "react-redux";
import {
  deleteCartItem,
  putCartItem,
} from "../../store/actions/shoppingCartAction";
import { connect } from "react-redux";
import Modal from "../Modal";
interface Props {
  cartItem: CartItemType;
  index: number;
}

const CartItemComponent = (props: Props) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { cartItem, index } = props;
  const [openActionSheet, setOpenActionSheet] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const cancelRef = React.useRef(null);

  const onCloseActionSheet = () => setOpenActionSheet(false);
  const onCloseAlert = () => setOpenAlert(false);

  const onUpdateCartItem = (cartItem: CartItemType) => {
    dispatch(putCartItem(cartItem));
  };

  const onDeleteCartItem = async () => {
    setOpenAlert(false);
    setOpenActionSheet(false);
    dispatch(deleteCartItem(cartItem));
    toast.show({
      render: () => {
        return (
          <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
            Item removido com sucesso!
          </Box>
        );
      },
    });
  };

  const handleCheck = () => {
    onUpdateCartItem({
      ...cartItem,
      isChecked: !cartItem.isChecked,
    });
  };

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
        {/* <Checkbox
          size={"lg"}
          icon={<Icon as={FontAwesome} name="check" opacity={1} />}
          colorScheme="success"
          isChecked={cartItem.isChecked}
          onChange={handleCheck}
          
          value="one"
        >
          <Heading size={"sm"}>{"#" + index}</Heading>
        </Checkbox> */}
        <VStack justifyContent="center">
          <Checkbox
            status={cartItem.isChecked ? "checked" : "unchecked"}
            onPress={handleCheck}
            color="green"
          />
          <Heading marginLeft={1} size={"sm"}>
            {"#" + index}
          </Heading>
        </VStack>

        <VStack flex={1}>
          <Heading isTruncated marginTop={1} marginRight={2} size="xs">
            {cartItem.product.description}
          </Heading>

          <Text fontSize="sm">{cartItem.product.brand}</Text>
          <Text fontSize="2xs">{cartItem.product.ean}</Text>
        </VStack>
      </HStack>

      <HStack marginLeft={5} w={"100%"} justifyContent="space-around">
        <VStack>
          <Text fontSize="sm">Preço</Text>
          <Text fontWeight={"bold"} fontSize="sm">
            {cartItem.price}
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
                      {cartItem.price}
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
                      onUpdateCartItem({
                        ...cartItem,
                        amountOfProduct: value,
                      });
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
                      onUpdateCartItem({
                        ...cartItem,
                        amountOfProduct: value,
                      });
                    }}
                  />
                </HStack>
              </VStack>
            </HStack>
            <Actionsheet.Item onPress={handleCheck}>
              {cartItem.isChecked ? "Check-out" : "Check-in"}
            </Actionsheet.Item>

            <Actionsheet.Item
              onPress={() => {
                setOpenAlert(true);
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
      <Modal
        title="Remover Produto"
        body={
          <Text>
            Deseja remover o produto{" "}
            <Text bold>{cartItem.product.description}</Text> do carrinho?
          </Text>
        }
        isOpen={openAlert}
        buttonLeft={{
          label: "Sim",
          onPress: () => {
            onDeleteCartItem();
          },
          colorScheme: "danger",
        }}
        buttonRight={{
          label: "Não",
          onPress: () => {
            setOpenAlert(false);
          },
          colorScheme: "gray",
        }}
      />
    </Pressable>
  );
};

const mapStateToProps = (store: any) => {
  return {
    //loading: store.shoppingCartReducer.loading,
    //   cartItem: store.shoppingCartReducer.cartItem,
  };
};

export default connect()(CartItemComponent);
