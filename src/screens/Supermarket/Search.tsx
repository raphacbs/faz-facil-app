import { FlatList, HStack, Icon, Input, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import {
  useState,
  useTranslation,
  useRef,
  useNavigation,
  useApp,
  useEffect,
} from "../../hooks";

import Container from "../../components/Container";

import ListFooter from "../../components/ListFooter";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { fetchSupermarkets } from "../../providers/useSupermarketQuery";
import * as Location from "expo-location";
import SupermarketItem from "./SupermarketItem";

const ProductSearchScreen = ({ route }: any) => {
  const queryClient = useQueryClient();
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const [location, setLocation] = useState<any>(null);
  const { setSupermarket } = useApp();
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
    ["supermarketSearch", search],
    ({ pageParam = 1 }) =>
      fetchSupermarkets(
        pageParam,
        location.coords.latitude,
        location.coords.longitude,
        search
      ),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.last) {
          return lastPage.pageNo + 1;
        }
        return false;
      },

      enabled: location != null,
    }
  );

  const { t } = useTranslation();
  const inputSearch: any = useRef();

  const _renderItem = ({ item }: any) => {
    return (
      <SupermarketItem
        onPress={() => {
          setSupermarket(item);
          navigation.goBack();
        }}
        supermarket={item}
      />
    );
  };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const tryAgain = () => {
    setSearch("");
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

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
            //@ts-ignore
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

export default ProductSearchScreen;
