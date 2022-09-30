import {
  HStack,
  VStack,
  Text,
  Avatar,
  Input,
  Spinner,
  FormControl,
  WarningOutlineIcon,
  Center,
  Heading,
} from "native-base";
import React from "react";
import {
  CartItemBodyType,
  ProductItemType,
  ShoppingListType,
} from "../../types";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { setCartItemBody } from "../../store/actions/shoppingCartAction";
import { setProductBodyPost } from "../../store/actions/productAction";

interface Props {
  product: ProductItemType;
  loading: boolean;
  cartItemBody: CartItemBodyType;
  productDidFounded: boolean;
  productBodyPost: any;
  shoppingList: ShoppingListType;
}

const ProductComponent = (props: Props) => {
  const {
    product,
    loading,
    cartItemBody,
    productDidFounded,
    productBodyPost,
    shoppingList,
  } = props;
  const [total, setTotal] = React.useState<string>("R$ 0,0");
  const [quantity, setQuantity] = React.useState<number>(1);
  const [price, setPrice] = React.useState<number>(0.0);
  const dispatch = useDispatch();

  React.useEffect(() => {
    calculateTotal();
    if (productDidFounded) {
      refreshCartItemBody();
    } else {
      refreshProductBodyPost();
    }
  }, [price, quantity]);

  const calculateTotal = () => {
    let _price = price + "";
    let len =
      _price.length > 0
        ? _price.substring(_price.length - 1, _price.length)
        : "";
    if (len != "." && len != "") {
      let _total = (price * quantity).toFixed(2) + "";
      setTotal("R$ " + _total.replace(".", ","));
    }
  };

  const refreshCartItemBody = () => {
    const body = { ...cartItemBody };
    let _price = (price + "").replace(".", ",");
    _price =
      _price.substring(_price.length - 1, _price.length) == ","
        ? _price + "00"
        : _price;
    _price =
      _price.indexOf(",") - (_price.length - 2) == 0 ? _price + "0" : _price;
    body.amountOfProduct = quantity;
    body.isChecked = true;
    body.price = _price;
    body.productId = product.id;
    dispatch(setCartItemBody(body));
  };

  const refreshProductBodyPost = () => {
    onChangeProduct({ ...productBodyPost });
  };

  const handleQuantity = (value: any) => {
    const _quantity = isNaN(parseInt(value)) ? 0 : parseInt(value);
    setQuantity(_quantity);
  };

  const onChangeProduct = (productBodyPost: any) => {
    let _price = (price + "").replace(".", ",");
    _price =
      _price.substring(_price.length - 1, _price.length) == ","
        ? _price + "00"
        : _price;
    _price =
      _price.indexOf(",") - (_price.length - 2) == 0 ? _price + "0" : _price;

    dispatch(
      setProductBodyPost({
        ...productBodyPost,
        price: _price,
        amountOfProduct: quantity,
      })
    );
  };

  const handlePrice = (value: any) => {
    let len =
      value.length > 0 ? value.substring(value.length - 1, value.length) : "0";
    if (len == "." || len == "") {
      setPrice(value);
    } else {
      const _price = isNaN(parseFloat(value)) ? 0.0 : parseFloat(value);
      setPrice(_price);
    }
  };

  return (
    <VStack>
      {loading ? (
        <Spinner color="indigo.500" />
      ) : productDidFounded ? (
        <VStack space={2}>
          <Center>
            <Avatar
              bg="green.500"
              source={{
                uri: product.image,
              }}
              size="lg"
            ></Avatar>
          </Center>

          <HStack space={2}>
            <FormControl isInvalid={false} w="50%" maxW="300px">
              <FormControl.Label>Preço</FormControl.Label>
              <Input
                placeholder="8.0"
                keyboardType="number-pad"
                value={price + ""}
                selectTextOnFocus={true}
                onChangeText={handlePrice}
              />
            </FormControl>
            <FormControl isInvalid={false} w="40%" maxW="300px">
              <FormControl.Label>Quantidade</FormControl.Label>
              <Input
                placeholder="1"
                keyboardType="numeric"
                value={quantity + ""}
                selectTextOnFocus={true}
                onChangeText={handleQuantity}
              />
            </FormControl>
          </HStack>
          <Center>
            <Heading size={"md"}>Total: {total}</Heading>
          </Center>
        </VStack>
      ) : (
        <VStack space={2}>
          <Heading size={"xs"}>Código de barras: {productBodyPost.ean}</Heading>
          <FormControl isInvalid={false} w="100%" maxW="300px">
            <FormControl.Label>Descrição</FormControl.Label>
            <Input
              placeholder="BISCOITO VITARELA"
              value={productBodyPost.description}
              onChangeText={(value: string) => {
                onChangeProduct({
                  ...productBodyPost,
                  description: value.toUpperCase(),
                });
              }}
              autoCapitalize={"characters"}
            />
          </FormControl>
          <FormControl isInvalid={false} w="100%" maxW="300px">
            <FormControl.Label>Marca</FormControl.Label>
            <Input
              placeholder="VITARELA"
              value={productBodyPost.brand}
              autoCapitalize={"characters"}
              onChangeText={(value: string) => {
                onChangeProduct({ ...productBodyPost, brand: value });
              }}
            />
          </FormControl>
          <HStack space={2}>
            <FormControl isInvalid={false} w="50%" maxW="300px">
              <FormControl.Label>Preço</FormControl.Label>
              <Input
                placeholder="8.0"
                keyboardType="number-pad"
                value={price + ""}
                selectTextOnFocus={true}
                onChangeText={handlePrice}
              />
            </FormControl>
            <FormControl isInvalid={false} w="40%" maxW="300px">
              <FormControl.Label>Quantidade</FormControl.Label>
              <Input
                placeholder="1"
                keyboardType="numeric"
                value={quantity + ""}
                selectTextOnFocus={true}
                onChangeText={handleQuantity}
              />
            </FormControl>
          </HStack>
          <Center>
            <Heading size={"md"}>Total: {total}</Heading>
          </Center>
        </VStack>
      )}
    </VStack>
  );
};

const mapStateToProps = (store: any) => {
  return {
    loading: store.shoppingCartReducer.loading,
    cartItemBody: store.shoppingCartReducer.cartItemBodyType,
    productDidFounded: store.shoppingCartReducer.productDidFounded,
    productBodyPost: store.shoppingCartReducer.productBodyPost,
    shoppingList: store.shoppingListReducer.shoppingList,
  };
};

export default connect(mapStateToProps)(ProductComponent);
