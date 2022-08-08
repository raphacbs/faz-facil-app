import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";

export default function BarCodeScanScreen({ route, navigation }, props) {
  const { callbackHandleScannedCode } = props;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const finderWidth = 280;
  const finderHeight = 230;
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const viewMinX = (width - finderWidth) / 2;
  const viewMinY = (height - finderHeight) / 2;

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

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
        if (callbackHandleScannedCode != undefined) {
          callbackHandleScannedCode(data);
        }
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        navigation.goBack();
        route.params.onGoBack(data);
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
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
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
        >
          <Text style={{ fontSize: 18, margin: 5, color: "white" }}>
            {" "}
            Flip{" "}
          </Text>
        </TouchableOpacity>
      </View>

      <BarcodeMask
        width={300}
        height={100}
        edgeColor={"#62B1F6"}
        showAnimatedLine
      />

      {scanned && (
        <Button title="Scan Again" onPress={() => setScanned(false)} />
      )}
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
