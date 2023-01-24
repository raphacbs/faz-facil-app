import {
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  Pressable,
  VStack,
  Text,
  Checkbox,
  Stack,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IItem, IItemPut } from "../../@types/item";
import {
  useEffect,
  useItem,
  useShoppingList,
  useState,
  useTranslation,
} from "../../hooks";
import moment from "moment";
import { formatCurrency } from "../../utils/generic";

type Props = {
  item: IItem;
};

const Item: React.FC<Props> = ({ item }) => {
  const [groupValues, setGroupValues] = useState([
    item.added ? "true" : "false",
  ]);
  const [priceIcon, setPriceIcon] = useState<any>({
    color: "coolGray.800",
    icon: "equal-box",
  });
  const { t } = useTranslation();
  const { shoppingList, params, get } = useShoppingList();
  const { updateBackground, loadingItem, _setItem } = useItem();

  function compare(a: any, b: any) {
    if (
      moment(a.updatedAt, "YYYY-MM-DD-THH:mm:ss.00000").isSameOrAfter(
        moment(b.updatedAt, "YYYY-MM-DD-THH:mm:ss.00000")
      )
    ) {
      return 1;
    } else {
      return -1;
    }
  }

  const verifyIfPriceUp = () => {
    let prices = item.product.priceHistories.filter(
      (i) => i.supermarket.id == shoppingList?.supermarketId
    );

    prices = prices.sort(compare);

    if (prices.length > 0) {
      const last = prices[prices.length - 1];
      if (item.perUnit > last.price) {
        setPriceIcon({ color: "red.600", icon: "arrow-up-box" });
      } else if (item.perUnit < last.price) {
        setPriceIcon({ color: "green.600", icon: "arrow-down-box" });
      } else {
        setPriceIcon({
          color: "coolGray.800",
          icon: "equal-box",
        });
      }
    }
  };

  const itemToItemPut = () => {
    const _item: IItemPut = {
      id: item.id,
      note: item.note,
      quantity: item.quantity,
      price: item.price,
      perUnit: item.perUnit,
      product: {
        code: item.product.code,
      },
      shoppingList: {
        id: item.shoppingList.id,
      },
      createdAt: item.createdAt,
      updateAt: item.updatedAt,
      added: item.added,
    };
    return _item;
  };

  const updatePropAdded = async (added: boolean) => {
    const _item = itemToItemPut();
    _item.added = added;
    await updateBackground(_item);
    await get({ ...params, pageNo: 1 });
  };

  useEffect(() => {
    verifyIfPriceUp();
  }, []);

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
      isDisabled={loadingItem}
      onPress={() => {
        _setItem(item);
      }}
    >
      <Stack>
        <HStack space={2}>
          <Checkbox.Group
            onChange={setGroupValues}
            value={groupValues}
            accessibilityLabel="choose numbers"
          >
            <Checkbox
              onChange={(value) => {
                updatePropAdded(value);
              }}
              accessibilityLabel="Item added"
              value="true"
            ></Checkbox>
          </Checkbox.Group>

          <VStack flex={1}>
            <Heading isTruncated marginRight={2} size="xs">
              {item.product.description}
            </Heading>
            <Text fontSize="sm">{item.product.brand}</Text>
            <Text fontSize="2xs">{item.product.code}</Text>
          </VStack>
          <Image
            mt={-1}
            rounded={5}
            source={{
              uri: "https://drive.google.com/uc?id=18TBAS2bPjI-HwC-_QiH7gUgkK5vKzdtd",
            }}
            alt="Alternate Text"
            size="sm"
          />
        </HStack>

        <HStack marginLeft={5} w={"90%"} justifyContent="space-between">
          <VStack>
            <Center>
              <Text fontSize="sm">
                {t("form_messages.label_price_per_unit")}
              </Text>
              <HStack>
                <Text fontWeight={"bold"} fontSize="sm">
                  {formatCurrency(item.perUnit)}
                </Text>
                <Icon
                  marginTop={1}
                  as={MaterialCommunityIcons}
                  name={priceIcon.icon}
                  color={priceIcon.color}
                />
              </HStack>
            </Center>
          </VStack>
          <VStack>
            <Center>
              <Text fontSize="sm">{t("form_messages.label_quantity")}</Text>
              <Text fontWeight={"bold"} fontSize="sm">
                {item.quantity}
              </Text>
            </Center>
          </VStack>
          <VStack>
            <Center>
              <Text fontSize="sm">{t("form_messages.label_total")}</Text>
              <Text fontWeight={"bold"} fontSize="sm">
                {formatCurrency(item.price)}
              </Text>
            </Center>
          </VStack>
        </HStack>
      </Stack>
    </Pressable>
  );
};

export default Item;
