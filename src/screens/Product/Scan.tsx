import { BarCodeScanner } from "expo-barcode-scanner";
import { Dimensions, StyleSheet } from "react-native";
import { useEffect, useNavigation, useState } from "../../hooks";
import { Audio } from "expo-av";
import { VStack } from "native-base";
import BarcodeMask from "react-native-barcode-mask";

const ScanScreen = () => {
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const finderWidth = 280;
  const finderHeight = 230;
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const viewMinX = (width - finderWidth) / 2;
  const viewMinY = (height - finderHeight) / 2;

  const playBeep = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/beep/beep.wav")
    );
    console.log("beep");
    await sound.playAsync();
  };

  const handleBarCodeScanned = async ({
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
      await playBeep();
      setScanned(true);
      navigation.navigate("AddItem", { code: data });
    }
  };

  return (
    <VStack
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#0099e6",
      }}
    >
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
    </VStack>
  );
};

export default ScanScreen;
