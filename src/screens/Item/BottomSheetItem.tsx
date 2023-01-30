import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  VStack,
  Text,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  IconButton,
  TextArea,
} from "native-base";
import {
  useCallback,
  useEffect,
  useItem,
  useMemo,
  useRef,
  useShoppingList,
  useState,
  useTranslation,
} from "../../hooks";
import { Dimensions, Switch } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { compareDate, formatCurrency, formatDate } from "../../utils/generic";
import LineChart from "react-native-chart-kit/dist/line-chart";
import { IItem, IItemPut } from "../../@types/item";
import ModalInput from "./ModalInput";
import { Masks } from "react-native-mask-input";

const initialHist = {
  labels: [],
  datasets: [
    {
      data: [0],
    },
  ],
};

const BottomSheetItem = () => {
  const { t } = useTranslation();
  const { item, updateBackground } = useItem();
  const { get, params } = useShoppingList();
  const { shoppingList } = useShoppingList();
  const [priceIcon, setPriceIcon] = useState<any>({
    color: "coolGray.800",
    icon: "equal-box",
  });
  const [labels, setLabels] = useState([]);
  const [datas, setDatas] = useState([]);
  const [localItem, setLocalItem] = useState<IItem>({
    id: "",
    note: "",
    quantity: 0,
    price: 0,
    perUnit: 0,
    product: {
      code: "",
      description: "",
      brand: "",
      thumbnail: "",
      createdAt: "",
      updateAt: "",
      unit: "",
      priceHistories: [],
    },
    shoppingList: {
      id: "",
      description: "",
      supermarketId: "",
      supermarketName: "",
      createdAt: "",
      updatedAt: "",
      status: "",
      itemsInfo: {
        quantityPlannedProduct: 0,
        quantityAddedProduct: 0,
        plannedTotalValue: 0,
        totalValueAdded: 0,
      },
    },
    createdAt: "",
    updatedAt: "",
    added: false,
  });
  const [sendDataItem, setSendDataItem] = useState<boolean>(false);
  const [openQuantityModal, setOpenQuantityModal] = useState<boolean>(false);
  const [openPriceModal, setPriceModal] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<string>("");
  const [perUnit, setPerUnit] = useState<string>("0");

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["100%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const [hist, setHist] = useState(initialHist);

  const getHist = () => {
    if (item) {
      let prices = item?.product.priceHistories.filter(
        (i) => i.supermarket.id == shoppingList?.supermarketId
      );
      if (prices.length > 0) {
        prices = prices.sort(compareDate);
        const _labels = prices.map((x: any) =>
          formatDate(x.updatedAt, "DD/MM/YY")
        );
        const _datas = prices.map((x: any) => x.price);
        if (_labels.length == 0) {
          setHist(initialHist);
        } else {
          const datasets = [{ data: [] }];
          datasets[0].data = _datas;
          setHist({ ...hist, labels: _labels, datasets });
        }
      } else {
        setHist(initialHist);
      }
    } else {
      setHist(initialHist);
    }
  };

  const verifyIfPriceUp = () => {
    let prices = item?.product.priceHistories.filter(
      (i) => i.supermarket.id == shoppingList?.supermarketId
    );

    prices = prices.sort(compareDate);

    const _labels = item?.product.priceHistories.map((x: any) => x.updatedAt);
    const _datas = item?.product.priceHistories.map((x: any) => x.price);
    setLabels(labels);
    setDatas(datas);

    if (prices.length > 0) {
      const last = prices[prices.length - 1];
      if (item?.perUnit > last.price) {
        setPriceIcon({ color: "red.600", icon: "arrow-up-box" });
      } else if (item.perUnit < last.price) {
        setPriceIcon({ color: "green.600", icon: "arrow-down-box" });
      } else {
        setPriceIcon({
          color: "coolGray.800",
          icon: "equal-box",
        });
      }
    } else {
      setPriceIcon({
        color: "coolGray.800",
        icon: "equal-box",
      });
    }
  };

  const itemToItemPut = () => {
    const _item: IItemPut = {
      id: localItem.id,
      note: localItem.note,
      quantity: localItem.quantity,
      price: localItem.price,
      perUnit: localItem.perUnit,
      product: {
        code: localItem.product.code,
      },
      shoppingList: {
        id: localItem.shoppingList.id,
      },
      createdAt: localItem.createdAt,
      updateAt: localItem.updatedAt,
      added: localItem.added,
    };
    return _item;
  };

  const updateItem = async () => {
    const _item = itemToItemPut();
    updateBackground(_item);
    get({ ...params, pageParam: 1 });
    setSendDataItem(false);
  };
  useEffect(() => {
    sendDataItem && updateItem();
  }, [sendDataItem]);

  useEffect(() => {
    bottomSheetRef.current?.close();
  }, []);

  useEffect(() => {
    if (item) {
      bottomSheetRef.current?.snapToIndex(0);
      verifyIfPriceUp();
      getHist();
      setLocalItem(item);
      setQuantity(item.quantity + "");
      setPerUnit(item.perUnit + "");
    }
  }, [item]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <HStack marginRight={5} justifyContent={"flex-end"}>
        <Icon
          mr="3"
          size="6"
          color="gray.400"
          as={<MaterialIcons name="close" />}
          onPress={() => {
            bottomSheetRef.current?.close();
          }}
        />
      </HStack>
      <BottomSheetScrollView
        contentContainerStyle={{
          backgroundColor: "white",
        }}
      >
        <VStack marginLeft={2} marginRight={2} space={8}>
          <HStack justifyContent={"space-between"}>
            <VStack w="80%">
              <Heading size={"sm"} isTruncated>
                {localItem?.product.description}
              </Heading>
              <Text>{localItem?.product.code}</Text>
              <Heading size={"xs"} marginTop={2}>
                {t("form_messages.label_note")}
              </Heading>
              <TextArea
                autoCompleteType={false}
                value={localItem?.note}
                onChangeText={(text) => {
                  setLocalItem({
                    ...localItem,
                    note: text,
                  });
                }}
                w="100%"
                maxW="300"
              />
            </VStack>
            <Center>
              <Image
                w="20%"
                mt={-1}
                rounded={5}
                source={{
                  uri: "https://drive.google.com/uc?id=18TBAS2bPjI-HwC-_QiH7gUgkK5vKzdtd",
                }}
                alt="Alternate Text"
                size="md"
              />
              <Heading size={"xs"} marginTop={2}>
                {t("form_messages.label_is_added")}
              </Heading>
              <Switch
                value={localItem.added}
                onValueChange={(value) => {
                  setLocalItem({ ...localItem, added: value });
                  setSendDataItem(true);
                }}
                colorScheme="primary"
              />
            </Center>
          </HStack>
          <HStack justifyContent={"space-between"}>
            <VStack space={3}>
              <Heading size={"sm"}>
                {t("form_messages.label_price_per_unit")}
              </Heading>
              <Heading size={"sm"}>{t("form_messages.label_quantity")}</Heading>
              <Heading size={"sm"}>{t("form_messages.label_total")}</Heading>
            </VStack>
            <VStack alignItems={"flex-end"} space={2}>
              <Heading
                marginRight={2}
                size={"sm"}
                onPress={() => setPriceModal(true)}
              >
                {formatCurrency(localItem?.perUnit)}
              </Heading>
              <HStack space={2} justifyContent={"center"}>
                <IconButton
                  size={"sm"}
                  variant="ghost"
                  _icon={{
                    as: AntDesign,
                    name: "plussquare",
                    color: "green.600",
                  }}
                  onPress={() => {
                    let quantity = localItem?.quantity + 1;
                    setLocalItem({
                      ...localItem,
                      quantity,
                      price: parseFloat(
                        (localItem.perUnit * quantity).toFixed(2)
                      ),
                    });
                    setSendDataItem(true);
                  }}
                />

                <Heading
                  marginTop={1}
                  onPress={() => setOpenQuantityModal(true)}
                  size={"sm"}
                >
                  {localItem?.quantity}
                </Heading>
                <IconButton
                  size={"sm"}
                  variant="ghost"
                  _icon={{
                    as: AntDesign,
                    name: "minussquare",
                    color: "red.600",
                  }}
                  onPress={() => {
                    if (localItem?.quantity > 1) {
                      let quantity = localItem?.quantity - 1;
                      setLocalItem({
                        ...localItem,
                        quantity,
                        price: parseFloat(
                          (localItem.perUnit * quantity).toFixed(2)
                        ),
                      });
                      setSendDataItem(true);
                    }
                  }}
                />
              </HStack>
              <Heading marginRight={2} size={"sm"}>
                {formatCurrency(localItem?.price)}
              </Heading>
            </VStack>
          </HStack>

          <Center>
            <Heading size={"xs"} marginTop={2}>
              {t("form_messages.label_price_history")}
            </Heading>
            <LineChart
              data={hist}
              width={Dimensions.get("window").width - 50} // from react-native
              height={200}
              yAxisLabel="R$ "
              yAxisSuffix=""
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#0099e6",
                backgroundGradientFrom: "#0088e6",
                backgroundGradientTo: "#0050e6",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </Center>
          <ModalInput
            isOpen={openQuantityModal}
            header={"Change quantity"}
            mask={[/\d/, /\d/, /\d/]}
            onClose={() => {
              setQuantity(localItem.quantity + "");
              setOpenQuantityModal(false);
            }}
            value={quantity + ""}
            onSave={() => {
              setLocalItem({
                ...localItem,
                quantity: parseInt(quantity),
                price: parseFloat(
                  (localItem.perUnit * parseInt(quantity)).toFixed(2)
                ),
              });
              setSendDataItem(true);
            }}
            onChangeText={(
              formatted: string,
              extracted: string | undefined
            ) => {
              console.log(formatted, extracted);
              setQuantity(extracted ? extracted : "0");
            }}
          />
          <ModalInput
            isOpen={openPriceModal}
            header={"Change price"}
            mask={Masks.BRL_CURRENCY}
            onClose={() => {
              setPerUnit(localItem.perUnit + "");
              console.log(localItem.perUnit + "");
              setPriceModal(false);
            }}
            value={perUnit}
            onSave={() => {
              setLocalItem({
                ...localItem,
                perUnit: parseFloat(perUnit),
              });
              setSendDataItem(true);
            }}
            onChangeText={(
              formatted: string,
              extracted: string | undefined
            ) => {
              console.log(formatted, extracted);
              let newValue = formatted.replace("R$ ", "").replace(",", ".");
              setPerUnit(newValue ? newValue : "0");
              setLocalItem({
                ...localItem,
                price: parseFloat(
                  (parseFloat(newValue) * localItem.quantity).toFixed(2)
                ),
              });
            }}
          />
        </VStack>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default BottomSheetItem;
