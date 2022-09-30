import React from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  Button,
  Center,
  HStack,
  VStack,
  Text,
  Heading,
  FormControl,
  Input,
  Spinner,
  Skeleton,
} from "native-base";
import { View, StyleSheet, Dimensions } from "react-native";
import { container } from "./styles";
import BarcodeMask from "react-native-barcode-mask";

import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import Modal from "../../components/Modal";
import {
  CartItemBodyType,
  ProductItemType,
  ShoppingCartType,
  ShoppingListType,
} from "../../types";
import ProductItem from "../../components/ProductItem";
import {
  getProductByEan,
  postProduct,
  setProductBodyPost,
} from "../../store/actions/productAction";
import ProductComponent from "./productComponent";
import { postCartItem } from "../../store/actions/shoppingCartAction";
import { color } from "react-native-reanimated";
import { Audio } from "expo-av";
interface Props {
  navigation: any;
  product: ProductItemType;
  shoppingCart: ShoppingCartType;
  onAddProduct: (product: ProductItemType) => void;
  loading: boolean;
  cartItemBody: CartItemBodyType;
  shoppingList: ShoppingListType;
  productDidFounded: boolean;
  productBodyPost: any;
}

const BarCodeScanScreen = (props: Props) => {
  const {
    navigation,
    shoppingCart,
    product,
    loading,
    cartItemBody,
    shoppingList,
    productDidFounded,
    productBodyPost,
  } = props;
  const [hasPermission, setHasPermission] = React.useState<boolean>(false);
  const [scanned, setScanned] = React.useState(false);
  const [ean, setEan] = React.useState("");
  const [showModalInputBarCode, setShowModalInputBarCode] =
    React.useState(false);
  const finderWidth = 280;
  const finderHeight = 230;
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const viewMinX = (width - finderWidth) / 2;
  const viewMinY = (height - finderHeight) / 2;
  const dispatch = useDispatch();

  const playBeep = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/beep/beep.wav")
    );
    console.log("beep");
    await sound.playAsync();
  };

  React.useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  React.useEffect(() => {
    if (showModalInputBarCode) {
      setShowModalInputBarCode(false);
      setScanned(true);
    }
    console.log(loading);
  }, [loading]);

  const handleBarCodeScanned = ({
    type,
    data,
    bounds: { origin } = {},
  }: any) => {
    const { x, y } = origin;
    if (
      x >= viewMinX &&
      y >= viewMinY &&
      x <= viewMinX + finderWidth / 2 &&
      y <= viewMinY + finderHeight / 2
    ) {
      playBeep();
      dispatch(
        setProductBodyPost({
          ...productBodyPost,
          ean: data,
          brand: "",
          description: "",
        })
      );
      dispatch(getProductByEan(data));
      setScanned(true);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleScanAgain = () => {
    setScanned(false);
  };

  // const handleSearchProduct =  React.useCallback(
  //   (ean: string) => {
  //     dispatch(getProductByEan(ean));
  //   },
  //   [dispatch]
  // );

  const handleSearchProduct = (ean: string) => {
    dispatch(
      setProductBodyPost({
        ...productBodyPost,
        ean: ean,
        brand: "",
        description: "",
      })
    );

    dispatch(getProductByEan(ean));
  };

  return (
    <VStack style={container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barCodeTypes={["ean13", "ean8", "code128"]}
      >
        <BarcodeMask
          width={300}
          height={100}
          showAnimatedLine={true}
          outerMaskOpacity={0.2}
        />
      </BarCodeScanner>

      <HStack marginTop={"100%"} p={5} justifyContent={"space-evenly"}>
        <Button
          rounded={20}
          colorScheme="blue"
          onPress={() => {
            setEan("");
            setShowModalInputBarCode(true);
          }}
        >
          Digitar código
        </Button>
        <Button
          rounded={20}
          colorScheme="blue"
          onPress={() => {
            const screenTitle: string = "ProductSearch";
            navigation.navigate(screenTitle);
          }}
        >
          Buscar por nome
        </Button>
      </HStack>
      {scanned ? (
        <Button
          variant={"link"}
          _text={{ color: "white" }}
          onPress={() => {
            setScanned(false);
          }}
        >
          Scannear Novamente
        </Button>
      ) : null}

      <Modal
        isOpen={scanned}
        title={
          <Skeleton.Text lines={1} isLoaded={!loading}>
            <Heading size={"sm"} marginRight={5}>
              {productDidFounded
                ? product.description
                : "Produto não encontrado, cadastre-o"}
            </Heading>
          </Skeleton.Text>
        }
        buttonLeft={{
          label: "Cancelar",
          onPress: () => {
            handleScanAgain();
          },
          colorScheme: "gray",
        }}
        buttonRight={{
          label: "Adicionar",
          onPress: () => {
            if (productDidFounded) {
              dispatch(postCartItem(cartItemBody, shoppingList.id));
            } else {
              dispatch(postProduct(productBodyPost, shoppingList.id));
            }
            navigation.goBack();
          },
          colorScheme: "blue",
        }}
        body={<ProductComponent product={product} />}
      />

      <Modal
        isOpen={showModalInputBarCode}
        buttonLeft={{
          label: "Cancelar",
          onPress: () => {
            setShowModalInputBarCode(false);
          },
          colorScheme: "gray",
        }}
        buttonRight={{
          label: "Buscar",
          onPress: () => {
            handleSearchProduct(ean);
          },
          colorScheme: "blue",
        }}
        title={
          <Heading size={"sm"} marginRight={5}>
            Informe o código de barras
          </Heading>
        }
        body={
          loading ? (
            <Center>
              <Spinner size="lg" />
            </Center>
          ) : (
            <FormControl isInvalid={false} w="100%" maxW="300px">
              <FormControl.Label>Código de barras</FormControl.Label>
              <Input
                selectionColor={"gray.500"}
                autoFocus={true}
                placeholder="1234567890123"
                keyboardType="number-pad"
                maxLength={13}
                value={ean}
                selectTextOnFocus={true}
                onChangeText={(value) => {
                  setEan(value);
                  dispatch(
                    setProductBodyPost({ ...productBodyPost, ean: value })
                  );
                }}
              />
            </FormControl>
          )
        }
      />
    </VStack>
  );
};

const mapStateToProps = (store: any) => {
  return {
    shoppingCart: store.shoppingCartReducer.shoppingCart,
    cartItemBody: store.shoppingCartReducer.cartItemBody,
    product: store.shoppingCartReducer.product,
    loading: store.commonReducer.loading,
    shoppingList: store.shoppingListReducer.shoppingList,
    productDidFounded: store.shoppingCartReducer.productDidFounded,
    productBodyPost: store.shoppingCartReducer.productBodyPost,
  };
};

export default connect(mapStateToProps)(BarCodeScanScreen);
