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
} from "native-base";
import { IShoppingList } from "../../@types/shoppingList";
import { useTranslation } from "../../hooks";
import { convertStatusShoppingList } from "../../utils/converter";
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
  const status = convertStatusShoppingList(shoppingList.status);
  return (
    <Pressable
      onPress={() => {
        //TODO implementar o clique na lista para visualizar os itens
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
          <VStack width="100%">
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
                onPress={() => {}}
                _icon={{
                  as: MaterialCommunityIcons,
                  name: "dots-vertical",
                  color: "gray.600",
                }}
              />
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
                  shoppingList.itemsInfo.plannedTotalValue
                )} / ${formatCurrency(shoppingList.itemsInfo.totalValueAdded)}`}
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
                    shoppingList.createdAt,
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
                >{`${shoppingList.itemsInfo.quantityPlannedProduct}/${shoppingList.itemsInfo.quantityAddedProduct}`}</Text>
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
  );
};

export default ShoppingList;
