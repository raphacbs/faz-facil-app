import { Center, FlatList, HStack, Icon, Input, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import {
  useState,
  useTranslation,
  useRef,
  useNavigation,
  useSupermarket,
} from "../../hooks";

import Container from "../../components/Container";

import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import SupermarketItem from "./SupermarketItem";
import * as Location from "expo-location";

const SearchSupermarketScreen = () => {
  const {
    supermarkets,
    get,
    loading,
    params,
    error,
    updateSupermarket,
    resetSupermarkets,
  } = useSupermarket();
  const [location, setLocation] = useState<any>(null);

  const { t } = useTranslation();
  const [name, setName] = useState(params.name ? params.name : "");
  const inputSearch: any = useRef();
  const navigation = useNavigation();

  const search = async () => {
    await get({ ...params, pageNo: 1 });
  };

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
        resetSupermarkets();
        navigation.dispatch(e.data.action);
      }),
    [navigation]
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      await get({
        ...params,
        name: undefined,
        pageNo: 1,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const _renderItem = ({ item }: any) => {
    return (
      <SupermarketItem
        onPress={() => {
          updateSupermarket(item);
          navigation.goBack();
        }}
        supermarket={item}
      />
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
      <VStack marginBottom={3} h={"7%"}>
        <HStack justifyContent={"center"}>
          <Input
            placeholder={`${t("form_messages.placeholder_search_supermarket")}`}
            width="95%"
            borderRadius="4"
            m={1}
            returnKeyType="search"
            ref={inputSearch}
            value={name}
            fontSize="14"
            onChangeText={setName}
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
              name.length >= 1 ? (
                <Icon
                  m="2"
                  mr="3"
                  size="6"
                  color="gray.400"
                  as={<MaterialIcons name="close" />}
                  onPress={() => setName("")}
                />
              ) : null
            }
            onSubmitEditing={() => {
              if (name.trim() != "") {
                get({
                  ...params,
                  name: name.trim(),
                  pageNo: 1,
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                });
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
          data={supermarkets}
          renderItem={_renderItem}
          ListEmptyComponent={_ListEmptyComponent}
        />
      </Container>
    </VStack>
  );
};

export default SearchSupermarketScreen;
