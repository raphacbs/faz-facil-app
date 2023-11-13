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
  Actionsheet,
  Spinner,
  Badge,
  Skeleton,
  ScrollView,
  Button,
} from "native-base";
import { useEffect, useRef, useState, useTranslation } from "../../hooks";
import { Dimensions, Switch } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { compareDate, formatCurrency, formatDate } from "../../utils/generic";
import LineChart from "react-native-chart-kit/dist/line-chart";
import { IItem, IItemPutAndPost } from "../../@types/item";
import ModalInput from "./ModalInput";
import { Masks } from "react-native-mask-input";
import { IShoppingList } from "../../@types/app";
import { useMutation, useQueryClient } from "react-query";
import { deleteItem, postOrPutItem } from "../../providers/useItemQuery";
import moment from "moment";
import AlertYesOrNo from "../../components/Alert";

type Props = {
  shoppingList: IShoppingList;
  item: IItem;
  isOpen: boolean;
  onClose: () => void;
};

const initialHist = {
  labels: [],
  datasets: [
    {
      data: [0],
    },
  ],
};

const ActionItem: React.FC<Props> = ({
  shoppingList,
  item,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  const [priceModal, setPriceModal] = useState(false);
  const [quantityModal, setQuantityModal] = useState(false);
  const [noteModal, setNoteModal] = useState(false);
  const [isOpenDelete, setOpenDelete] = useState(false);
  const [hist, setHist] = useState(initialHist);
  const [lastHist, setLastHist] = useState({
    id: "",
    price: 0,
    supermarket: {
      id: "",
      name: "",
      address: "",
    },
    createdAt: "",
    updatedAt: "",
  });
  const [priceIcon, setPriceIcon] = useState<any>({
    color: "coolGray.800",
    icon: "minus",
    diference: 0,
  });
  const actionItemRef = useRef(null);

  const getHistData = () => {
    if (item) {
      let prices = item?.product.priceHistories;
      console.log("prices", prices)
      if (prices != null && prices.length > 0) {
        prices = prices
          .sort(compareDate)
          .filter((x: any) =>
            moment(x.updatedAt, "YYYY-MM-DD-THH:mm:ss.00000").isBefore(
              moment(item.updatedAt, "YYYY-MM-DD-THH:mm:ss.00000")
            )
          );

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
    let prices = item.product.priceHistories;

    if (prices != null && prices.length > 0) {
      const last = prices[0];
      setLastHist(last);
      const diference = (item.perUnit - last.price).toFixed(2);
      if (item.perUnit > last.price) {
        setPriceIcon({ color: "red.600", icon: "caretup", diference });
      } else if (item.perUnit < last.price) {
        setPriceIcon({ color: "green.600", icon: "caretdown", diference });
      } else {
        setPriceIcon({
          color: "coolGray.800",
          icon: "minus",
          diference: 0,
        });
      }
    }
  };
  const queryClient = useQueryClient();
  const {
    mutate: updateItem,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (changeItem: IItemPutAndPost) => postOrPutItem(changeItem),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["shoppingLists"] });
      await queryClient.invalidateQueries({ queryKey: ["searchShoppingList"] });
      await queryClient.invalidateQueries({ queryKey: ["itemSearch"] });
      await queryClient.invalidateQueries({ queryKey: ["shoppingListById"] });
    },
  });

  const {
    mutate: delItem,
    isLoading: isLoadingDelete,
    isSuccess: isSuccessDelete,
  } = useMutation({
    mutationFn: (itemId: string) => deleteItem(itemId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["shoppingLists"] });
      await queryClient.invalidateQueries({ queryKey: ["searchShoppingList"] });
      await queryClient.invalidateQueries({ queryKey: ["shoppingListById"] });
      await queryClient.invalidateQueries({ queryKey: ["itemSearch"] });
      setOpenDelete(false);
    },
  });

  useEffect(() => {
    getHistData();
    verifyIfPriceUp();
  }, []);

  useEffect(() => {
    verifyIfPriceUp();
  }, [item]);

  return (
    <Center>
      <Actionsheet ref={actionItemRef} isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <VStack marginLeft={2} marginRight={2} space={2}>
            <HStack justifyContent={"space-between"}>
              <VStack w="80%">
                <Heading size={"sm"} isTruncated>
                  {item.product.description}
                </Heading>
                <Text>{item.product.code}</Text>
                <Heading size={"xs"} marginTop={2}>
                  {t("form_messages.label_note")}
                </Heading>
                <Text
                  onPress={() => {
                    setNoteModal(true);
                  }}
                  w="100%"
                  maxW="300"
                >
                  {item.note}
                </Text>
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
                {isLoading ? (
                  <Spinner color="emerald.500" />
                ) : (
                  <Switch
                    value={item.added}
                    onValueChange={(value) => {
                      updateItem({
                        ...item,
                        added: value,
                        updateAt: "",
                      });
                    }}
                  />
                )}
              </Center>
            </HStack>
            <ScrollView>
              {lastHist.id != "" && (
                <VStack>
                  <Heading size={"xs"}>
                    {`Last price: ${formatCurrency(lastHist.price)} found in ${
                      lastHist.supermarket.name
                    }`}
                  </Heading>
                </VStack>
              )}
              <HStack justifyContent={"space-between"}>
                <VStack space={3}>
                  <Heading size={"sm"}>
                    {t("form_messages.label_price_per_unit")}
                  </Heading>
                  <Heading size={"sm"}>
                    {t("form_messages.label_quantity")}
                  </Heading>
                  <Heading size={"sm"}>
                    {t("form_messages.label_total")}
                  </Heading>
                </VStack>

                <VStack alignItems={"flex-end"} space={2}>
                  <Skeleton.Text lines={1} px="4" isLoaded={!isLoading}>
                    <HStack space={2}>
                      <Icon
                        marginTop={1}
                        as={AntDesign}
                        name={priceIcon.icon}
                        color={priceIcon.color}
                      />
                      {priceIcon.diference != 0 && (
                        <Badge
                          colorScheme={
                            priceIcon.diference > 0 ? "danger" : "success"
                          }
                        >{`${formatCurrency(priceIcon.diference)}`}</Badge>
                      )}
                      <Heading
                        marginRight={2}
                        size={"sm"}
                        onPress={() => setPriceModal(true)}
                      >
                        {formatCurrency(item.perUnit)}
                      </Heading>
                    </HStack>
                  </Skeleton.Text>
                  <HStack space={2} justifyContent={"center"}>
                    <IconButton
                      size={"sm"}
                      variant="ghost"
                      _icon={{
                        as: AntDesign,
                        name: "minussquare",
                        color: "red.600",
                      }}
                      isDisabled={isLoading}
                      onPress={() => {
                        if (item.quantity > 0 && isLoading == false) {
                          updateItem({
                            ...item,
                            quantity: item.quantity - 1,
                            updateAt: "",
                          });
                        }
                      }}
                    />

                    {isLoading ? (
                      <Spinner color="emerald.500" />
                    ) : (
                      <Heading
                        marginTop={1}
                        onPress={() => setQuantityModal(true)}
                        size={"sm"}
                      >
                        {item.quantity}
                      </Heading>
                    )}

                    <IconButton
                      size={"sm"}
                      variant="ghost"
                      _icon={{
                        as: AntDesign,
                        name: "plussquare",
                        color: "green.600",
                      }}
                      isDisabled={isLoading}
                      onPress={() => {
                        if (isLoading == false) {
                          updateItem({
                            ...item,
                            quantity: item.quantity + 1,
                            updateAt: "",
                          });
                        }
                      }}
                    />
                  </HStack>
                  <Skeleton.Text lines={1} px="4" isLoaded={!isLoading}>
                    <Heading marginRight={2} size={"sm"}>
                      {formatCurrency(item.price)}
                    </Heading>
                  </Skeleton.Text>
                </VStack>
              </HStack>
              {lastHist.id != "" && (
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
                      labelColor: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
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
              )}
              <Button
                mb={"5%"}
                mt={"5%"}
                colorScheme={"danger"}
                onPress={() => {
                  setOpenDelete(true);
                }}
              >
                {t("form_messages.label_delete")}
              </Button>
              <ModalInput
                isOpen={quantityModal}
                isTextArea={false}
                header={"Change quantity"}
                mask={[/\d/, /\d/, /\d/]}
                onClose={() => {
                  setQuantityModal(false);
                }}
                value={item.quantity + ""}
                onSave={(text) => {
                  updateItem({
                    ...item,
                    quantity: parseInt(text),
                    updateAt: "",
                  });
                }}
                onChangeText={(
                  formatted: string,
                  extracted: string | undefined
                ) => {}}
              />
              <ModalInput
                isOpen={priceModal}
                header={"Change price"}
                mask={Masks.BRL_CURRENCY}
                isTextArea={false}
                onClose={() => {
                  setPriceModal(false);
                }}
                value={formatCurrency(item.perUnit)}
                onSave={(text) => {
                  let newValue = text
                    .replace("R$ ", "")
                    .replace(".", "")
                    .replace(",", ".");
                  updateItem({
                    ...item,
                    perUnit: parseFloat(newValue),
                    updateAt: "",
                  });
                }}
                onChangeText={(
                  formatted: string,
                  extracted: string | undefined
                ) => {}}
              />
              <ModalInput
                isOpen={noteModal}
                header={"Change note"}
                mask={[/a-zA-z/]}
                onClose={() => {
                  setNoteModal(false);
                }}
                isTextArea={true}
                value={item.note}
                onSave={(text) => {
                  updateItem({
                    ...item,
                    note: text,
                    updateAt: "",
                  });
                }}
                onChangeText={(
                  formatted: string,
                  extracted: string | undefined
                ) => {}}
              />
              <AlertYesOrNo
                body={
                  isLoadingDelete ? (
                    <Spinner />
                  ) : (
                    <Heading size={"xs"}>
                      {t("form_messages.label_delete_message", {
                        name: item.product.description,
                      })}
                    </Heading>
                  )
                }
                title={
                  <Heading color={"red.500"} size={"sm"}>
                    {t("form_messages.label_delete")}
                  </Heading>
                }
                isShow={isOpenDelete}
                onPressYes={() => {
                  delItem(item.id);
                }}
                onPressNo={() => {
                  setOpenDelete(false);
                }}
                onClose={() => {
                  setOpenDelete(false);
                }}
              />
            </ScrollView>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
};

export default ActionItem;
