import { VStack, Heading, HStack, FlatList, Center } from "native-base";
import {
  useEffect,
  useItem,
  useShoppingList,
  useTranslation,
} from "../../hooks";
import { formatCurrency } from "../../utils/generic";
import { RefreshControl } from "react-native";
import Container from "../../components/Container";
import Item from "./Item";
import BottomSheetItem from "./BottomSheetItem";
import FABActions from "../Home/FABAction";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

const ItemScreen = () => {
  const { shoppingList } = useShoppingList();
  const { t } = useTranslation();

  const { get, items, item, loading, error, params } = useItem();

  const _renderItem = ({ item }: any) => {
    return <Item key={item.id} item={item} />;
  };

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    await get(params, shoppingList?.id);
  };

  return (
    <VStack h={"100%"}>
      <HStack
        justifyContent={"space-between"}
        bgColor={"theme.principal"}
        h={"5%"}
      >
        <Center marginRight={2} marginLeft={2} justifyContent={"center"}>
          <Heading size={"xs"} color={"white"}>
            {t("form_messages.label_quantity")}
          </Heading>
          <Heading
            size={"xs"}
            color={"white"}
          >{`${shoppingList?.itemsInfo.quantityAddedProduct}/${shoppingList?.itemsInfo.quantityPlannedProduct}`}</Heading>
        </Center>
        <Center marginRight={2} marginLeft={2} justifyContent={"center"}>
          <Heading size={"xs"} color={"white"}>
            {t("form_messages.label_total")}
          </Heading>
          <Heading size={"xs"} color={"white"}>{`${formatCurrency(
            shoppingList?.itemsInfo.totalValueAdded
          )}/${formatCurrency(
            shoppingList?.itemsInfo.plannedTotalValue
          )}`}</Heading>
        </Center>
      </HStack>
      <Container loading={loading} error={error} tryAgain={() => {}}>
        <VStack>
          <FlatList
            h={"90%"}
            backgroundColor="blue.50"
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={async () => {
                  await get({ ...params, pageNo: 1 }, shoppingList?.id);
                }}
              />
            }
            refreshing={false}
            data={items}
            renderItem={_renderItem}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              // setShowFooter(true);
              //TODO implementar paginação para os items da lista
            }}
            // ListFooterComponent={<ListFooter isVisible={showFooter} />}
          />
        </VStack>
      </Container>
      <FABActions />
      <BottomSheetItem />
    </VStack>
  );
};
export default gestureHandlerRootHOC(ItemScreen);
