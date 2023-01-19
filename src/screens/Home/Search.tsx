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

const SearchScreen = () => {
  const { shoppingLists, get, params, loading, error, resetParams } =
    useShoppingList();
  const [shoppingListSearched, setShoppingListSearched] = useState<
    IShoppingList[]
  >([]);
  const { t } = useTranslation();
  const [description, setDescription] = useState(
    params.description ? params.description : ""
  );
  const inputSearch: any = useRef();
  const navigation = useNavigation();

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
        get({ ...params, description: undefined, pageNo: 1 });
        navigation.dispatch(e.data.action);
      }),
    [navigation]
  );

  useEffect(() => {
    setShoppingListSearched([...shoppingLists]);
  }, [shoppingLists]);

  useEffect(() => {
    if (description == "") {
      setShoppingListSearched([]);
    }
  }, [description]);

  const search = async () => {
    await get({ ...params, pageNo: 1 });
  };

  const _renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity onPress={() => {}}>
        <ShoppingList shoppingList={item} />
      </TouchableOpacity>
    );
  };

  const _ListEmptyComponent = () => (
    <Center>
      <LottieView
        source={require("../../../assets/shopping_list_empty.json")}
        style={{
          width: 300,
          height: 300,
          marginTop: "20%",
        }}
        loop={false}
        progress={100}
      />
    </Center>
  );

  return (
    <VStack h={"93%"}>
      <VStack h={"8%"}>
        <HStack justifyContent={"center"}>
          <Input
            placeholder={t("form_messages.placeholder_search_list")}
            width="95%"
            borderRadius="4"
            m={1}
            autoFocus
            onFocus={() => setShoppingListSearched([])}
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
                  onPress={() => setDescription("")}
                />
              ) : null
            }
            onSubmitEditing={() => {
              if (description.trim() != "") {
                get({ ...params, description: description.trim(), pageNo: 1 });
              } else {
                inputSearch.current.focus();
              }
            }}
          />
        </HStack>
      </VStack>
      <Container loading={loading} error={error} tryAgain={search}>
        <FlatList
          refreshing={false}
          data={shoppingListSearched}
          renderItem={_renderItem}
          ListEmptyComponent={_ListEmptyComponent}
        />
      </Container>
    </VStack>
  );
};

export default SearchScreen;
