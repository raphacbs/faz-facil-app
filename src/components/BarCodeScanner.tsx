import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import { myTheme } from "../theme/theme";
import CustomButton from "./Button";
import BarcodeMask from "react-native-barcode-mask";

type BarCodeScanType = {
  onScannerCode: (code: string) => void;
  onPressInsertCode: () => void;
  onPressCancel: () => void;
};

export default function BarCodeScan({
  onScannerCode,
  onPressInsertCode,
  onPressCancel,
}: BarCodeScanType) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const { width, height } = Dimensions.get("window");
  const finderWidth = width * 0.8;
  const finderHeight = height * 0.2;
  const viewMinX = (width - finderWidth) / 2;
  const viewMinY = (height - finderHeight) / 2;

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
    bounds,
  }: BarCodeScannerResult) => {
    const { x, y } = bounds.origin;
    if (
      x >= viewMinX &&
      y >= viewMinY &&
      x <= viewMinX + finderWidth &&
      y <= viewMinY + finderHeight &&
      !scanned
    ) {
      setScanned(true);
      onScannerCode(data);
    } else {
      console.log("xy", x, y);
      console.log("data", data);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const handleCancel = () => {
    setScanned(false);
    onPressCancel();
  };

  const handleInsertCode = () => {
    onPressInsertCode();
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ width: height, height: height, alignSelf: "center" }}
        barCodeTypes={[
          BarCodeScanner.Constants.BarCodeType.ean13,
          BarCodeScanner.Constants.BarCodeType.ean8,
          BarCodeScanner.Constants.BarCodeType.code128,
        ]}
      >
        <BarcodeMask
          width={finderWidth}
          height={finderHeight}
          showAnimatedLine={true}
          outerMaskOpacity={0.4}
        />
      </BarCodeScanner>
      <View style={styles.buttonsContainer}>
        <CustomButton
          isLoading={false}
          title="Cancelar"
          schema="default"
          onPress={handleCancel}
        />
        <CustomButton
          isLoading={false}
          title="Insira o código"
          schema="principal"
          onPress={handleInsertCode}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: myTheme.colors.info,
  },
  scanner: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    top: "10%",
    left: 0,
    right: 0,
    padding: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 18,
    color: "#000",
  },
});
