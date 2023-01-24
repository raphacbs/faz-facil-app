import { FlatList, VStack } from "native-base";
import {
  useTranslation,
  useEffect,
  useShoppingList,
  useState,
} from "../../hooks";
import ShoppingList from "./ShoppingList";
import { RefreshControl } from "react-native";
import React from "react";
import Container from "../../components/Container";
import ListFooter from "./ListFooter";
import FABActions from "./FABAction";

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
    return <ShoppingList shoppingList={item} />;
  };

  return (
    <VStack h={"100%"}>
      <Container loading={loading} error={error} tryAgain={loadContent}>
        <VStack>
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
        </VStack>
      </Container>
      <FABActions />
    </VStack>
  );
};

export default HomeScreen;
