import { Center, FlatList, HStack, Icon, Input, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import {
  useShoppingList,
  useState,
  useTranslation,
  useRef,
  useNavigation,
} from "../../hooks";

import Container from "../../components/Container";
import { TouchableOpacity } from "react-native";
import ShoppingList from "./ShoppingList";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { IShoppingList } from "../../@types/shoppingList";
import { fetchShoppingLists } from "../../providers/useShoppingList";
import ListFooter from "../../components/ListFooter";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";

const SearchScreen = () => {
  const queryClient = useQueryClient();
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const {
    data,
    isLoading,
    isSuccess,
    error,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery(
    ["searchShoppingList", search],
    ({ pageParam = 1 }) => fetchShoppingLists(pageParam, description),
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

  const _renderItem = ({ item }: any) => {
    return <ShoppingList shoppingList={item} />;
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
            placeholder={t("form_messages.placeholder_search_list")}
            width="95%"
            borderRadius="4"
            m={1}
            autoFocus
            returnKeyType="search"
            ref={inputSearch}
            value={description}
            fontSize="14"
            onChangeText={setDescription}
            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="search" />}
              />
            }
            InputRightElement={
              description.length >= 1 ? (
                <Icon
                  m="2"
                  mr="3"
                  size="6"
                  color="gray.400"
                  as={<MaterialIcons name="close" />}
                  onPress={() => {
                    setSearch("");
                    setDescription("");
                  }}
                />
              ) : null
            }
            onSubmitEditing={() => {
              if (description.trim() != "") {
                setSearch(description);
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

export default SearchScreen;
