import { FlatList, VStack } from "native-base";
import {
  useTranslation,
  useEffect,
  useShoppingList,
  useState,
} from "../../hooks";
import ShoppingList from "./ShoppingList";
import { RefreshControl, TouchableOpacity } from "react-native";
import React from "react";
import Container from "../../components/Container";
import ListFooter from "./ListFooter";

const HomeScreen = () => {
  const { t } = useTranslation();
  const { shoppingLists, get, params, loading, error } = useShoppingList();
  const [showFooter, setShowFooter] = useState(false);
  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    await get(params);
  };
  const _renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity onPress={() => {}}>
        <ShoppingList shoppingList={item} />
      </TouchableOpacity>
    );
  };

  return (
    <VStack h={"100%"}>
      <Container loading={loading} error={error} tryAgain={loadContent}>
        <FlatList
          h={"100%"}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={async () => {
                await get({ ...params, pageNo: 1 });
              }}
            />
          }
          refreshing={false}
          data={shoppingLists}
          renderItem={_renderItem}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            setShowFooter(true);
          }}
          ListFooterComponent={<ListFooter isVisible={showFooter} />}
        />
      </Container>
    </VStack>
  );
};

export default HomeScreen;
