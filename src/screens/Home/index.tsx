import { FlatList, Heading, VStack } from "native-base";
import { useState } from "../../hooks";
import ShoppingList from "./components/ShoppingList";
import React from "react";
import Container from "../../components/Container";
import ListFooter from "../../components/ListFooter";
import FABActions from "./components/FABAction";
import useQueryShoppingLists from "../../providers/useShoppingList";

const HomeScreen = () => {
  const [params, setParams] = useState({
    pageParam: 1,
    pageSize: 10,
    sortBy: "updatedAt",
    sortDir: "desc",
  });

  const {
    data,
    isLoading,
    isSuccess,
    error,
    hasNextPage,
    isFetchingNextPage,
    isFetching,

    fetchNextPage,
  } = useQueryShoppingLists();

  const _renderItem = ({ item }: any) => {
    return <ShoppingList shoppingList={item} />;
  };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <VStack flex={1}>
      <VStack flex={1}>
        <Container loading={isLoading} error={error} tryAgain={fetchNextPage}>
          <VStack h={"100%"}>
            {isSuccess && (
              <FlatList
                refreshing={false}
                data={data.pages.map((page) => page.items).flat()}
                renderItem={_renderItem}
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
            <FABActions />
          </VStack>
        </Container>
      </VStack>
    </VStack>
  );
};

export default HomeScreen;
