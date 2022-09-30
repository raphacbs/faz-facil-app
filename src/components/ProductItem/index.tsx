import {
  Button,
  Divider,
  HStack,
  VStack,
  Text,
  Center,
  Image,
  Heading,
} from "native-base";
import React from "react";
import { CartItemBodyType, ProductItemType } from "../../types";
import { useDispatch } from "react-redux";
import { postCartItem } from "../../store/actions/shoppingCartAction";
import Modal from "../Modal";
import ProductComponent from "../../screens/BarCodeScan/productComponent";
import { connect } from "react-redux";

interface Props {
  product: ProductItemType;
  shoppingListId: string;
  cartItemBody: CartItemBodyType;
  navigation: any;
}
const ProductItem = (props: Props) => {
  const { product, shoppingListId, cartItemBody, navigation } = props;
  const [openModalAdd, setOpenModalAdd] = React.useState(false);
  const dispatch = useDispatch();
  return (
    <VStack>
      <HStack space={1} paddingBottom={5}>
        <VStack flex={1}>
          <Center>
            <Image
              source={{
                uri: product.image,
              }}
              fallbackSource={{
                uri: "https://drive.google.com/uc?id=1w361FjVApKKJn6g8H5NVZ3IVbL-fSpo4",
              }}
              alt="Product Image"
              size="xl"
            />
          </Center>
        </VStack>
        <VStack flex={2}>
          <Text fontWeight={"bold"} fontSize="sm" w={"100%"}>
            {product.description}
          </Text>
          <Text fontSize="xs" w={"100%"}>
            {product.brand}
          </Text>
          <Text fontSize="xs" w={"100%"}>
            {product.ean}
          </Text>
          <Text fontSize="xs" w={"100%"}>
            último preço: R$ 5,60
          </Text>
          <Text fontSize="xs" w={"100%"}>
            Média de preço nos últimos 3 meses: R$ 5,50
          </Text>
        </VStack>
        <VStack flex={1} space={1}>
          <Button
            rounded={20}
            colorScheme="blue"
            onPress={() => {
              setOpenModalAdd(true);
            }}
          >
            Add
          </Button>
        </VStack>
      </HStack>
      <Divider marginTop={3} my="2" />
      <Modal
        isOpen={openModalAdd}
        title={
          <Heading size={"sm"} marginRight={5}>
            {product.description}
          </Heading>
        }
        buttonLeft={{
          label: "Cancelar",
          onPress: () => {
            setOpenModalAdd(false);
          },
          colorScheme: "gray",
        }}
        buttonRight={{
          label: "Adicionar",
          onPress: () => {
            dispatch(postCartItem(cartItemBody, shoppingListId));
            navigation.pop(2);
          },
          colorScheme: "blue",
        }}
        body={<ProductComponent product={product} />}
      />
    </VStack>
  );
};

const mapStateToProps = (store: any) => {
  return {
    cartItemBody: store.shoppingCartReducer.cartItemBody,
  };
};

export default connect(mapStateToProps)(ProductItem);
