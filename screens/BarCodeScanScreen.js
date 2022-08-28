import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, TouchableOpacity, Dimensions, Text } from "react-native";
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
  HStack,
} from "native-base";
import { Audio } from "expo-av";

export default function BarCodeScanScreen({ route, navigation }, props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showDialog, setShowDialog] = useState(
    route.params.scannerAgain == undefined ? false : true
  );
  const cancelRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [ean, setEan] = useState("");

  const finderWidth = 280;
  const finderHeight = 230;
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const viewMinX = (width - finderWidth) / 2;
  const viewMinY = (height - finderHeight) / 2;

  const onClose = () => setShowDialog(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

  const sendEan = (ean) => {
    console.log("route.params", route.params);
    setEan(ean);
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

  const handleBarCodeScanned = (scanningResult) => {
    console.log("Entrou: " + scanningResult);
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
        playBeep();
        setScanned(true);
        sendEan(data);
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <VStack flex={1}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <TouchableOpacity
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
      ></TouchableOpacity>

      <BarcodeMask
        width={300}
        height={100}
        edgeColor={"#62B1F6"}
        showAnimatedLine
      />
      <HStack justifyContent={"center"}>
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
      </HStack>
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
