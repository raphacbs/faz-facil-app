import { BarCodeScanner } from "expo-barcode-scanner";
import { Dimensions, StyleSheet } from "react-native";
import {
  useEffect,
  useNavigation,
  useRef,
  useState,
  useTranslation,
} from "../../hooks";
import { Audio } from "expo-av";
import {
  AlertDialog,
  VStack,
  Button,
  Spinner,
  HStack,
  Actionsheet,
} from "native-base";
import BarcodeMask from "react-native-barcode-mask";
import { getProductByCode } from "../../providers/useProduct";
import { useQueryClient } from "react-query";
import InputCode from "../Item/InputCode";

const ScanScreen = ({ route }: any) => {
  const { t } = useTranslation();
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isInputCode, setIsInputCode] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [code, setCode] = useState<string | null>(null);

  const navigation = useNavigation();
  const finderWidth = 280;
  const finderHeight = 230;
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const viewMinX = (width - finderWidth) / 2;
  const viewMinY = (height - finderHeight) / 2;
  const queryClient = useQueryClient();

  const {
    data: product,
    isSuccess,
    isFetching,
    //@ts-ignore
  } = getProductByCode(code, enabled);

  const cancelRef = useRef(null);

  const playBeep = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/beep/beep.wav")
    );
    console.log("beep");
    await sound.playAsync();
  };

  useEffect(() => {
    if (isSuccess) {
      setEnabled(false);
      if (product.items.length > 0) {
        //@ts-ignore
        navigation.navigate("AddItem", {
          code: code,
          shoppingListId: route.params.shoppingListId,
        });
      } else {
        setOpenAlert(true);
      }
    }
  }, [isFetching]);

  const search = async (data: string) => {
    setCode(data);
    await queryClient.invalidateQueries({ queryKey: ["productByCode"] });
    setEnabled(true);
  };

  const handleBarCodeScanned = async ({
    type,
    data,
    //@ts-ignore
    bounds: { origin } = {},
  }: any) => {
    const { x, y } = origin;
    if (
      x >= viewMinX &&
      y >= viewMinY &&
      x <= viewMinX + finderWidth / 2 &&
      y <= viewMinY + finderHeight / 2
    ) {
      setScanned(true);
      await playBeep();
      search(data);
    }
  };

  const onCancel = async () => {
    setOpenAlert(false);
    setScanned(false);
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
      {isFetching && <Spinner size={"lg"} />}
      <HStack marginTop={"100%"} p={5} justifyContent={"space-evenly"}>
        <Button
          isDisabled={isFetching}
          rounded={20}
          colorScheme="blue"
          onPress={() => {
            setIsInputCode(true);
          }}
        >
          Digitar código
        </Button>
        <Button
          isDisabled={isFetching}
          rounded={20}
          colorScheme="blue"
          onPress={() => {
            setScanned(true);
          }}
        >
          Buscar por nome
        </Button>
      </HStack>
      <AlertDialog
        isOpen={openAlert}
        onClose={onCancel}
        size={"sm"}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialog.Content maxH="212">
          <AlertDialog.CloseButton />
          <AlertDialog.Header>
            {t("scan.alert_header_product_not_found")}
          </AlertDialog.Header>
          <AlertDialog.Body>
            {t("scan.message_not_found_product", { code: code })}
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={onCancel}>
                {t("form_messages.label_cancel")}
              </Button>
              <Button
                onPress={() => {
                  console.log("got to registe product");
                }}
              >
                {t("form_messages.label_apply")}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <Actionsheet
        isOpen={isInputCode}
        onClose={() => {
          setScanned(false);
          setIsInputCode(false);
        }}
      >
        <Actionsheet.Content>
          <VStack
            h={"100%"}
            w={"80%"}
            marginLeft={2}
            marginRight={2}
            space={10}
          >
            <InputCode
              onPress={(data) => {
                setIsInputCode(false);
                search(data);
              }}
            />
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </VStack>
  );
};

export default ScanScreen;
