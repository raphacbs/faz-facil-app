import {
  VStack,
  Heading,
  HStack,
  FlatList,
  Center,
  Spinner,
} from "native-base";
import { useEffect, useState, useTranslation } from "../../hooks";
import { formatCurrency } from "../../utils/generic";
import Container from "../../components/Container";
import Item from "./Item";
import BottomSheetItem from "./BottomSheetItem";
import FABActions from "../Home/FABAction";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { IParamsItem } from "../../@types/item";
import useQueryItems from "../../providers/useItemQuery";
import ListFooter from "../../components/ListFooter";
import { getShoppingListById } from "../../providers/useShoppingList";
import FABItemActions from "./FABItemAction";

const initialParams = {
  pageNo: 1,
  pageSize: 10,
  sortBy: "updatedAt",
  sortDir: "desc",
  shoppingListId: "",
};

const ItemScreen = ({ route }: any) => {
  const { t } = useTranslation();
  const [params, setParams] = useState<IParamsItem>(initialParams);

  const {
    data,
    error,
    isLoading,
    isSuccess,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
  } = useQueryItems(params);

  const _renderItem = ({ item }: any) => {
    item.shoppingList = shoppingList;
    return <Item key={item.id} item={item} shoppingList={shoppingList} />;
  };

  const { shoppingList } = route.params;
  const { data: _shoppingList } = getShoppingListById(
    shoppingList.id,
    isSuccess
  );

  useEffect(() => {
    setParams({ ...params, shoppingListId: shoppingList.id });
  }, [route]);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
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
          {isFetching ? (
            <Spinner />
          ) : (
            <Heading
              size={"xs"}
              color={"white"}
            >{`${_shoppingList?.itemsInfo.quantityAddedProduct}/${_shoppingList?.itemsInfo.quantityPlannedProduct}`}</Heading>
          )}
        </Center>
        <Center marginRight={2} marginLeft={2} justifyContent={"center"}>
          <Heading size={"xs"} color={"white"}>
            {t("form_messages.label_total")}
          </Heading>
          {isFetching ? (
            <Spinner />
          ) : (
            <Heading size={"xs"} color={"white"}>{`${formatCurrency(
              _shoppingList?.itemsInfo.totalValueAdded
            )}/${formatCurrency(
              _shoppingList?.itemsInfo.plannedTotalValue
            )}`}</Heading>
          )}
        </Center>
      </HStack>
      <Container loading={isLoading} error={error} tryAgain={() => {}}>
        <VStack>
          {isSuccess && (
            <FlatList
              h={"90%"}
              backgroundColor="blue.50"
              refreshing={false}
              data={data.pages.map((page) => page.items).flat()}
              renderItem={_renderItem}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                <ListFooter
                  isVisible={hasNextPage}
                  isLoading={isFetchingNextPage}
                  handleMore={loadMore}
                  sizeEmpty={70}
                />
              }
            />
          )}
        </VStack>
      </Container>
      <FABItemActions shoppingListId={shoppingList.id} />
    </VStack>
  );
};
export default gestureHandlerRootHOC(ItemScreen);
