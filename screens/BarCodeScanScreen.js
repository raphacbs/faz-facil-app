import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, Dimensions, Text } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";
import { FontAwesome } from "@expo/vector-icons";
import { View, Button, AlertDialog, Input, Icon } from "native-base";

export default function BarCodeScanScreen({ route, navigation }, props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const finderWidth = 280;
  const finderHeight = 230;
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const viewMinX = (width - finderWidth) / 2;
  const viewMinY = (height - finderHeight) / 2;
  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [ean, setEan] = useState("");

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

  const sendEan = (ean) => {
    console.log("ean", ean);
    setEan(ean);
    navigation.goBack();
    route.params.onGoBack(ean);
  };

  const handleBarCodeScanned = (scanningResult) => {
    if (!scanned) {
      const { type, data, bounds: { origin } = {} } = scanningResult;
      const { x, y } = origin;
      if (
        x >= viewMinX &&
        y >= viewMinY &&
        x <= viewMinX + finderWidth / 2 &&
        y <= viewMinY + finderHeight / 2
      ) {
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
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
          flexDirection: "row",
        }}
      >
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
      </View>
      <BarcodeMask
        width={300}
        height={100}
        edgeColor={"#62B1F6"}
        showAnimatedLine
      />
      <Button colorScheme="blue" onPress={() => setIsOpen(!isOpen)}>
        Digitar código
      </Button>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Informe o Código de Barra</AlertDialog.Header>
          <AlertDialog.Body>
            <Input
              size="full"
              w={{
                base: "100%",
                md: "25%",
              }}
              value={ean}
              onChangeText={(text) => setEan(text)}
              autoFocus={true}
              keyboardType="numeric"
              InputLeftElement={
                <Icon
                  as={<FontAwesome name="barcode" />}
                  size={6}
                  ml="3"
                  color="muted.400"
                />
              }
              placeholder="código de barras"
            />
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Cancelar
              </Button>
              <Button
                colorScheme="green"
                onPress={() => {
                  sendEan(ean);
                }}
              >
                Pesquisar
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
