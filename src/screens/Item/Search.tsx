import { FlatList, HStack, Icon, Input, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useTranslation, useRef, useApp } from "../../hooks";

import Container from "../../components/Container";

import ListFooter from "../../components/ListFooter";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { fetchItems } from "../../providers/useItemQuery";
import { IParamsItem } from "../../@types/item";
import Item from "./Item";
import { IShoppingList } from "../../@types/app";
const initialParams: IParamsItem = {
  pageNo: 1,
  pageSize: 10,
  sortBy: "product.description",
  sortDir: "asc",
  shoppingListId: "",
  productDesc: "",
};

const ItemSearchScreen = () => {
  const { currentShoppingList } = useApp();
  const [params, setParams] = useState<IParamsItem>({
    ...initialParams,
    shoppingListId: currentShoppingList ? currentShoppingList.id : "",
  });
  const [search, setSearch] = useState("");

  const {
    data,
    isSuccess,
    error,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery(
    ["itemSearch", search],
    ({ pageParam = 1 }) => fetchItems(pageParam, params),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.last) {
          return lastPage.pageNo + 1;
        }
        return false;
      },

      enabled: search != "",
    }
  );

  const { t } = useTranslation();
  const inputSearch: any = useRef();
  const shoppingList: IShoppingList = {
    id: params.shoppingListId,
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
  };

  const _renderItem = ({ item }: any) => {
    return <Item item={item} shoppingList={shoppingList} />;
  };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const tryAgain = () => {
    setSearch("");
  };

  return (
    <VStack h={"93%"}>
      <VStack h={"6%"}>
        <HStack justifyContent={"center"}>
          <Input
            placeholder={`${t("form_messages.placeholder_product_search")}`}
            width="95%"
            borderRadius="4"
            m={1}
            autoFocus
            returnKeyType="search"
            ref={inputSearch}
            value={params.productDesc}
            fontSize="14"
            onChangeText={(text) => {
              setParams({ ...params, productDesc: text });
            }}
            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="search" />}
              />
            }
            //@ts-ignore
            InputRightElement={
              //@ts-ignore
              params.productDesc.length >= 1 ? (
                <Icon
                  m="2"
                  mr="3"
                  size="6"
                  color="gray.400"
                  as={<MaterialIcons name="close" />}
                  onPress={() => {
                    setSearch("");
                    setParams({ ...params, productDesc: "" });
                  }}
                />
              ) : null
            }
            onSubmitEditing={() => {
              if (params.productDesc?.trim() != "") {
                setSearch(params.productDesc ? params.productDesc.trim() : "");
              } else {
                inputSearch.current.focus();
              }
            }}
          />
        </HStack>
      </VStack>
      <Container loading={isFetching} error={error} tryAgain={tryAgain}>
        <VStack>
          {isSuccess && (
            <FlatList
              marginTop={5}
              h={"97%"}
              refreshing={false}
              data={data.pages.map((page) => page.items).flat()}
              renderItem={_renderItem}
              ListFooterComponent={
                <ListFooter
                  isVisible={hasNextPage}
                  isLoading={isFetchingNextPage}
                  handleMore={loadMore}
                  sizeEmpty={0}
                />
              }
            />
          )}
        </VStack>
      </Container>
    </VStack>
  );
};

export default ItemSearchScreen;
