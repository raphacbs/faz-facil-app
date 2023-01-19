import React from "react";
import {
  VStack,
  HStack,
  Text,
  Box,
  Center,
  Image,
  Button,
  IconButton,
  Heading,
  Skeleton,
  AlertDialog,
  Input,
  Icon,
  Pressable,
  Actionsheet,
  Toast,
  useToast,
  Spinner,
} from "native-base";
import { Checkbox } from "react-native-paper";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { CartItemType, PriceHistoryType } from "../../types";
import { useDispatch } from "react-redux";
import {
  deleteCartItem,
  putCartItem,
} from "../../store/actions/shoppingCartAction";
import { connect } from "react-redux";
import Modal from "../Modal";
import {
  Chart,
  Line,
  Area,
  HorizontalAxis,
  VerticalAxis,
} from "react-native-responsive-linechart";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import { Dimensions } from "react-native";
import { getByProductId } from "../../store/actions/priceHistoryAction";
interface Props {
  cartItem: CartItemType;
  index: number;
  loadingPrice: boolean;
  priceHistoryList: Array<PriceHistoryType>;
}

const CartItemComponent = (props: Props) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { cartItem, index, priceHistoryList, loadingPrice } = props;
  const [openActionSheet, setOpenActionSheet] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const cancelRef = React.useRef(null);

  const onCloseActionSheet = () => setOpenActionSheet(false);
  const onCloseAlert = () => setOpenAlert(false);

  const onUpdateCartItem = (cartItem: CartItemType) => {
    dispatch(putCartItem(cartItem));
  };

  const onDeleteCartItem = async () => {
    setOpenAlert(false);
    setOpenActionSheet(false);
    dispatch(deleteCartItem(cartItem));
    toast.show({
      render: () => {
        return (
          <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
            Item removido com sucesso!
          </Box>
        );
      },
    });
  };

  const handleOpenActionSheet = () => {
    setOpenActionSheet(true);
    dispatch(getByProductId(cartItem.product.id));
  };

  const renderChartPriceHistory = () => {
    const labels = priceHistoryList.map((x) => x.date);
    const data =
      priceHistoryList.length > 0
        ? priceHistoryList.map((x) =>
            parseFloat(x.price.replace("R$ ", "").replace(",", "."))
          )
        : [0];
    console.log("labels", labels);
    console.log("data", data);
    return (
      <VStack>
        <Heading size={"sm"}>Histórico de preços</Heading>
        {loadingPrice ? (
          <Spinner size={"lg"} />
        ) : (
          <LineChart
            data={{
              labels: labels,
              datasets: [
                {
                  data: data,
                },
              ],
            }}
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
        )}
      </VStack>
    );
  };

  const handleCheck = () => {
    onUpdateCartItem({
      ...cartItem,
      isChecked: !cartItem.isChecked,
    });
  };

  return (
    <Pressable
      rounded={8}
      shadow={5}
      p={2}
      bgColor={"gray.200"}
      width="95%"
      margin={2}
      borderWidth="1"
      borderColor="gray.200"
      onPress={() => {
        // setOpenActionSheet(true);
        handleOpenActionSheet();
      }}
    >
      <HStack space={2}>
        {/* <Checkbox
          size={"lg"}
          icon={<Icon as={FontAwesome} name="check" opacity={1} />}
          colorScheme="success"
          isChecked={cartItem.isChecked}
          onChange={handleCheck}
          
          value="one"
        >
          <Heading size={"sm"}>{"#" + index}</Heading>
        </Checkbox> */}
        <VStack justifyContent="center">
          <Checkbox
            status={cartItem.isChecked ? "checked" : "unchecked"}
            onPress={handleCheck}
            color="green"
          />
          <Heading marginLeft={1} size={"sm"}>
            {"#" + index}
          </Heading>
        </VStack>

        <VStack flex={1}>
          <Heading isTruncated marginTop={1} marginRight={2} size="xs">
            {cartItem.product.description}
          </Heading>

          <Text fontSize="sm">{cartItem.product.brand}</Text>
          <Text fontSize="2xs">{cartItem.product.ean}</Text>
        </VStack>
      </HStack>

      <HStack marginLeft={5} w={"100%"} justifyContent="space-around">
        <VStack>
          <Text fontSize="sm">Preço</Text>
          <Text fontWeight={"bold"} fontSize="sm">
            {cartItem.price}
          </Text>
        </VStack>
        <VStack>
          <Text fontSize="sm">QTD</Text>
          <Text fontWeight={"bold"} fontSize="sm">
            {cartItem.amountOfProduct}
          </Text>
        </VStack>
        <VStack>
          <Text fontSize="sm">Total</Text>
          <Text fontWeight={"bold"} fontSize="sm">
            {cartItem.subtotal}
          </Text>
        </VStack>
      </HStack>
      <Center>
        <Actionsheet isOpen={openActionSheet} onClose={onCloseActionSheet}>
          <Actionsheet.Content>
            <HStack w={"98%"} space={2}>
              <VStack>
                <Image
                  rounded={20}
                  h={30}
                  source={{
                    uri: cartItem.product.image,
                  }}
                  fallbackSource={{
                    uri: "https://drive.google.com/uc?id=1w361FjVApKKJn6g8H5NVZ3IVbL-fSpo4",
                  }}
                  alt="Product Image"
                  size="md"
                />
              </VStack>

              <VStack flex={1} w={"100%"}>
                <Heading size="xs">{cartItem.product.description}</Heading>
                <Text fontSize="sm">{cartItem.product.brand}</Text>
                <Text fontSize="2xs">{cartItem.product.ean}</Text>
                <HStack space={2} justifyContent="flex-start">
                  <VStack>
                    <Text fontSize="sm">Preço</Text>
                    <Text fontWeight={"bold"} fontSize="sm">
                      {cartItem.price}
                    </Text>
                  </VStack>
                  <VStack>
                    <Text fontSize="sm">Total</Text>
                    <Text fontWeight={"bold"} fontSize="sm">
                      {cartItem.subtotal}
                    </Text>
                  </VStack>
                </HStack>
                <HStack space={3} justifyContent="flex-end">
                  <IconButton
                    colorScheme="danger"
                    key={"minus"}
                    variant={"ghost"}
                    _icon={{
                      as: AntDesign,
                      name: "minuscircle",
                    }}
                    onPress={() => {
                      let value = cartItem.amountOfProduct - 1;
                      if (value <= 0) {
                        return;
                      }
                      onUpdateCartItem({
                        ...cartItem,
                        amountOfProduct: value,
                      });
                    }}
                  />
                  <Heading alignSelf={"center"} size="xs">
                    {cartItem.amountOfProduct}
                  </Heading>
                  <IconButton
                    colorScheme="success"
                    key={"plus"}
                    variant={"ghost"}
                    _icon={{
                      as: AntDesign,
                      name: "pluscircle",
                    }}
                    onPress={() => {
                      let value = cartItem.amountOfProduct + 1;
                      onUpdateCartItem({
                        ...cartItem,
                        amountOfProduct: value,
                      });
                    }}
                  />
                </HStack>
              </VStack>
            </HStack>
            <VStack>{renderChartPriceHistory()}</VStack>
            <Actionsheet.Item onPress={handleCheck}>
              {cartItem.isChecked ? "Check-out" : "Check-in"}
            </Actionsheet.Item>

            <Actionsheet.Item
              onPress={() => {
                setOpenAlert(true);
              }}
            >
              Remover
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                onCloseActionSheet();
              }}
            >
              Cancelar
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
      <Modal
        title="Remover Produto"
        body={
          <Text>
            Deseja remover o produto{" "}
            <Text bold>{cartItem.product.description}</Text> do carrinho?
          </Text>
        }
        isOpen={openAlert}
        buttonLeft={{
          label: "Sim",
          onPress: () => {
            onDeleteCartItem();
          },
          colorScheme: "danger",
        }}
        buttonRight={{
          label: "Não",
          onPress: () => {
            setOpenAlert(false);
          },
          colorScheme: "gray",
        }}
      />
    </Pressable>
  );
};

const mapStateToProps = (store: any) => {
  return {
    //loading: store.shoppingCartReducer.loading,
    //   cartItem: store.shoppingCartReducer.cartItem,
    loadingPrice: store.priceHistoryReducer.loadingPrice,
    priceHistoryList: store.priceHistoryReducer.priceHistoryList,
  };
};

export default connect(mapStateToProps)(CartItemComponent);
