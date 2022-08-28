import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Button,
  AlertDialog,
  Input,
  Icon,
  VStack,
  Toast,
  Text,
  HStack,
} from "native-base";
import { Audio } from "expo-av";
import ModalAddProductComponent from "../components/ModalAddProductComponent";
import { BASE_URL, X_API_KEY } from "@env";

export default function BarCodeScanScreen({ route, navigation }, props) {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [product, setProduct] = useState({});
  const [ean, setEan] = useState("");

  const finderWidth = 280;
  const finderHeight = 230;
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const viewMinX = (width - finderWidth) / 2;
  const viewMinY = (height - finderHeight) / 2;
  const [isAlertOpen, setAlertIsOpen] = useState(false);

  const cancelRef = useRef(null);

  const onClose = () => setShowModalAdd(false);
  const onCloseAlert = () => {
    setAlertIsOpen(false);
    setScanned(false);
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

  const goProductScreen = () => {
    console.log("route.params", route.params);
    navigation.navigate("Product", {
      idShoppingCart: route.params.idShoppingCart,
      ean,
    });
    // navigation.goBack();
    // route.params.onGoBack(ean);
  };

  const playBeep = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/beep.mp3")
    );
    await sound.playAsync();
  };

  const handleBarCodeScanned = async (scanningResult) => {
    console.log("Entrou: " + scanningResult.data);
    console.log("scanned: " + scanned);
    if (!scanned) {
      const { type, data, bounds: { origin } = {} } = scanningResult;
      const { x, y } = origin;
      if (
        x >= viewMinX &&
        y >= viewMinY &&
        x <= viewMinX + finderWidth / 2 &&
        y <= viewMinY + finderHeight / 2
      ) {
        // playBeep();
        setScanned(true);
        await handleProduct(data);
        // sendEan(data);
      }
    }
  };

  const handleProduct = async (data) => {
    try {
      const url = `${BASE_URL}/api/v1/products?ean=${data}`;
      console.log(url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": X_API_KEY,
        },
      });
      console.log(response.status);
      if (response.status == 200) {
        const json = await response.json();

        setProduct(json.products[0]);
        setShowModalAdd(true);
      } else {
        setEan(data);
        setAlertIsOpen(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  if (hasPermission === null) {
    return <Text>Verificando permissão...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const onCloseModal = () => {
    setScanned(false);
    setShowModalAdd(false);
  };
  const onPressAddProduct = () => {
    navigation.goBack();
  };

  return (
    <VStack flex={1}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barCodeTypes={["ean13", "ean8", "code128"]}
      />
      <BarcodeMask
        width={300}
        height={100}
        edgeColor={"#62B1F6"}
        showAnimatedLine
      />
      {/* <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "flex-end",
        }}
        onPress={() => {
          setType(
            type === BarCodeScanner.Constants.Type.back
              ? BarCodeScanner.Constants.Type.front
              : BarCodeScanner.Constants.Type.back
          );
        }}
      ></TouchableOpacity> */}

      {/* <BarcodeMask
        width={300}
        height={100}
        edgeColor={"#62B1F6"}
        showAnimatedLine
      /> */}
      <VStack justifyContent={"center"}>
        <Button
          rounded={20}
          colorScheme="blue"
          onPress={() => {
            navigation.navigate("SearchProduct", {
              shoppingCartId: route.params.idShoppingCart,
            });
            // playBeep();
            // setScanned(true);
            // sendEan("7896012300916");
          }}
        >
          Buscar por nome
        </Button>
      </VStack>
      <VStack>
        <ModalAddProductComponent
          onClose={onCloseModal}
          visible={showModalAdd}
          product={product}
          shoppingCartId={route.params.idShoppingCart}
          onPressAdd={onPressAddProduct}
        />
      </VStack>
      <VStack>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isAlertOpen}
          onClose={onCloseAlert}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Produto não encontrado</AlertDialog.Header>
            <AlertDialog.Body>
              O produto com o código de barras <Text bold>{ean}</Text> não foi
              localizado na base da dados. Deseja cadastra-lo?
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onCloseAlert}
                  ref={cancelRef}
                >
                  Não
                </Button>
                <Button colorScheme="success" onPress={goProductScreen}>
                  Cadastrar
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </VStack>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
