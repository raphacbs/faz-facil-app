import {
  Box,
  Heading,
  HStack,
  VStack,
  Text,
  Pressable,
  Center,
  IconButton,
  Icon,
  Progress,
  Actionsheet,
  Badge,
} from "native-base";
import { IShoppingList } from "../../@types/shoppingList";
import { useNavigation, useState, useTranslation } from "../../hooks";
import {
  convertStatusShoppingList,
  convertStatusShoppingListColorSchema,
} from "../../utils/converter";
import {
  FontAwesome,
  MaterialIcons,
  Zocial,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { calculateProgress, formatCurrency } from "../../utils/generic";
import moment from "moment";

type Props = {
  shoppingList: IShoppingList;
};

const ShoppingList: React.FC<Props> = ({ shoppingList }) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const navigation = useNavigation();
  const onClose = () => {
    setOpen(false);
  };

  const messageStatus = () => {
    switch (shoppingList.status) {
      case "IN_PLANNING":
        return t("form_messages.label_status_to_in_progress");
      case "IN_PROGRESS":
        return t("form_messages.label_status_to_ready");
      case "READY":
        return t("form_messages.label_status_ready");
      default:
    }
  };
  const getDesIcon = () => {
    switch (shoppingList.status) {
      case "IN_PLANNING":
        return "add-shopping-cart";
      case "IN_PROGRESS":
        return "shopping-cart";
      default:
        "shopping-cart";
    }
  };

  return (
    <VStack>
      <Pressable
        onPress={async () => {
          //@ts-ignore
          navigation.navigate("Item", { shoppingList: shoppingList });
        }}
      >
        <VStack
          rounded={8}
          shadow={5}
          p={2}
          bgColor={"gray.200"}
          width="95%"
          margin={2}
          borderWidth="1"
          borderColor="gray.200"
        >
          <HStack>
            <Box
              marginLeft={-2}
              marginBottom={-2}
              marginTop={-2}
              marginRight={2}
              roundedLeft={8}
              bgColor={"green.800"}
              w={1}
            ></Box>
            <VStack space={2} width="100%">
              <HStack space={2} justifyContent="space-between">
                <Center>
                  <Heading color={"black"} size={"sm"}>
                    {shoppingList.description}
                  </Heading>
                </Center>
                <IconButton
                  size={"md"}
                  variant="ghost"
                  alignSelf={"flex-end"}
                  onPress={() => {
                    setOpen(true);
                  }}
                  _icon={{
                    as: MaterialCommunityIcons,
                    name: "dots-vertical",
                    color: "gray.600",
                  }}
                />
              </HStack>
              <HStack>
                <Badge
                  variant={"solid"}
                  colorScheme={convertStatusShoppingListColorSchema(
                    shoppingList.status
                  )}
                >
                  {t(convertStatusShoppingList(shoppingList.status))}
                </Badge>
              </HStack>
              <HStack space={2} justifyContent="space-between">
                <HStack>
                  <Icon
                    marginTop={1}
                    as={MaterialIcons}
                    name="place"
                    color="amber.600"
                  />
                  <Text>{shoppingList.supermarketName}</Text>
                </HStack>
                <Heading marginRight={2} color={"blue.800"} size={"sm"}>
                  {`${formatCurrency(
                    shoppingList.itemsInfo.totalValueAdded
                  )} / ${formatCurrency(
                    shoppingList.itemsInfo.plannedTotalValue
                  )}`}
                </Heading>
              </HStack>
              <HStack space={2} justifyContent="space-between">
                <HStack>
                  <Icon
                    margin={1}
                    as={FontAwesome}
                    name="calendar"
                    color="gray.500"
                  />
                  <Text>
                    {moment(
                      shoppingList.updatedAt,
                      "YYYY-MM-DD-THH:mm:ss.00000"
                    ).fromNow()}
                  </Text>
                </HStack>
                <HStack>
                  <Icon
                    marginRight={2}
                    as={Zocial}
                    name="cart"
                    color="gray.500"
                    size={"md"}
                  />
                  <Text
                    marginRight={2}
                  >{`${shoppingList.itemsInfo.quantityAddedProduct}/${shoppingList.itemsInfo.quantityPlannedProduct}`}</Text>
                </HStack>
              </HStack>
              <Box w="100%">
                <Progress
                  bg="coolGray.100"
                  _filledTrack={{
                    bg: "lime.500",
                  }}
                  value={calculateProgress(
                    shoppingList.itemsInfo.quantityAddedProduct,
                    shoppingList.itemsInfo.quantityPlannedProduct
                  )}
                  size="sm"
                />
              </Box>
            </VStack>
          </HStack>
        </VStack>
      </Pressable>
      <Center>
        <Actionsheet isOpen={open} onClose={onClose}>
          <Actionsheet.Content>
            <Actionsheet.Item
              startIcon={
                <Icon as={MaterialIcons} size="6" name={getDesIcon()} />
              }
              onPress={() => {}}
            >
              {messageStatus()}
            </Actionsheet.Item>
            <Actionsheet.Item
              startIcon={
                <Icon
                  as={MaterialCommunityIcons}
                  size="6"
                  name="square-edit-outline"
                />
              }
              onPress={async () => {
                //@ts-ignore
                navigation.navigate("ShoppingListEdit", { shoppingList });
              }}
            >
              {t("form_messages.label_edit")}
            </Actionsheet.Item>
            <Actionsheet.Item
              startIcon={<Icon as={MaterialIcons} size="6" name="close" />}
              onPress={() => {
                setOpen(false);
              }}
            >
              {t("form_messages.label_cancel")}
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
    </VStack>
  );
};

export default ShoppingList;
