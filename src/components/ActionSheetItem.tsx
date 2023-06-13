import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  Switch,
  ActivityIndicator,
} from "react-native";
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
  useScrollHandlers,
  Route,
  useSheetRouter,
  RouteScreenProps,
  useSheetRouteParams,
} from "react-native-actions-sheet";
import { Item } from "../types/Item";
import { myTheme } from "../theme/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PriceItem from "./PriceItem";
import { initialState } from "../store/reducers/itemReducer";
import { QueryKey, useMutation, useQueryClient } from "react-query";
import {
  changeItemFromItems,
  removeItem,
  updateItem,
} from "../store/actions/itemAction";
import { Button } from "react-native-paper";
import useUtils from "../hooks/useUtils";
import { useDispatch, useSelector } from "react-redux";
import { setStatusSelectedShoppingList } from "../store/actions/shoppingListAction";

const ActionSheetItem: React.FC<SheetProps> = ({
  sheetId,
  payload,
}: SheetProps<{ item: Item }>) => {
  const [toggleAdd, setToggleAdd] = useState<boolean>(
    payload ? payload.item.added : false
  );
  const [isCancel, setIsCancel] = useState<boolean>(false);
  const item: Item = useSelector(
    //@ts-ignore
    (state) => state.item.selectedItem
  );
  const [localItem, setLocalItem] = useState<Item>({ ...item });

  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollHandlers = useScrollHandlers<ScrollView>("1", actionSheetRef);
  const queryClient = useQueryClient();
  const { equals } = useUtils();
  const router = useSheetRouter();
  const dispatch = useDispatch();
  const {
    mutate: updateItemMutation,
    isLoading,
    error,
    isError,
  } = useMutation({
    mutationFn: (item: Item) => updateItem(item),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shoppingLists"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["home-shoppingLists"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["items", item.shoppingList.id],
      });
    },
    onMutate: async () => {
      console.log("altera status global da shopping list para loading");
      await dispatch(setStatusSelectedShoppingList("loading"));
    },
  });

  const {
    mutate: removeItemMutation,
    isLoading: isLoadingRemove,
    error: errorRemove,
    isError: isErrorRemove,
    status: statusRemove,
  } = useMutation({
    mutationFn: (itemId: string) => removeItem(itemId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["shoppingLists"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["home-shoppingLists"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["items", item.shoppingList.id],
      });
      const data = queryClient.getQueryData("shoppingLists");
      console.log("data", data);
    },
    onMutate: async () => {
      console.log("altera status global da shopping list para loading");
      await dispatch(setStatusSelectedShoppingList("loading"));
    },
  });

  const RouteLoading = ({ router }: RouteScreenProps) => {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size={80} color={myTheme.colors.primary} />
        <Text>Processando</Text>
      </View>
    );
  };

  const RouteError = ({ router }: RouteScreenProps) => {
    return (
      <View style={styles.containerLoading}>
        <Text>Desculpe ocorreu um erro</Text>
        <Button
          icon="close"
          mode="contained"
          style={{ marginRight: 30 }}
          buttonColor={myTheme.colors.primary}
          onPress={() => {
            router.goBack();
          }}
        >
          Tentar Novamente
        </Button>
      </View>
    );
  };

  const RouteRemove = ({ router }: RouteScreenProps) => {
    return (
      <View style={styles.containerRouteRemove}>
        <Text style={styles.text}>
          Deseja remover o item
          <Text style={{ fontWeight: "bold" }}>
            {" "}
            {localItem.product.description}
          </Text>
          ?
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            icon="trash-can-outline"
            mode="contained"
            buttonColor={myTheme.colors.danger}
            style={{ marginLeft: 30 }}
            onPress={() => {
              removeItemMutation(localItem.id);
              router.navigate("route-loading");
            }}
          >
            Sim
          </Button>
          <Button
            icon="close"
            mode="contained"
            style={{ marginRight: 30 }}
            buttonColor={myTheme.colors.secondary}
            onPress={() => {
              router.goBack();
            }}
          >
            Não
          </Button>
        </View>
      </View>
    );
  };

  const RouteItem = ({ router, payload }: RouteScreenProps) => {
    const params = useSheetRouteParams();
    const [item, setItem] = useState<Item>(
      payload ? { ...payload.item } : initialState.selectedItem
    );
    return (
      <View
        style={{
          paddingHorizontal: 12,
          maxHeight: "100%",
        }}
      >
        <View style={styles.container}>
          <View style={styles.rowOne}>
            <MaterialCommunityIcons
              name="barcode-scan"
              size={20}
              color={myTheme.colors.dark}
            />
            <Text style={[styles.itemSubtitle, { marginLeft: 5 }]}>
              {item.product.code}
            </Text>
          </View>
          <View style={styles.added}>
            <Text style={[styles.itemSubtitle, { marginLeft: 5 }]}>
              {item.added ? "Adicionado" : "Planejado"}
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: myTheme.colors.success }}
              thumbColor={
                item.added ? myTheme.colors.primary : myTheme.colors.light
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => {
                // setToggleAdd(value);
                setItem({ ...item, added: value });
                setLocalItem({ ...item, added: value });
                // updateItemMutation({ ...item, added: value });
              }}
              value={item.added}
            />
          </View>
        </View>
        <View style={styles.container2}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={[styles.description, { flex: 2 }]}>
              <MaterialCommunityIcons
                name="card-text-outline"
                size={20}
                color={myTheme.colors.dark}
              />
              <Text style={[styles.itemTitle, { marginLeft: 5 }]}>
                {item.product.description}
              </Text>
            </View>

            <View style={[styles.image, { flex: 1 }]}>
              <Image
                source={{
                  uri: item.product.thumbnail
                    ? item.product.thumbnail
                    : "https://drive.google.com/uc?id=1w361FjVApKKJn6g8H5NVZ3IVbL-fSpo4",
                }}
                style={styles.thumbnail}
              />
            </View>
          </View>

          <View style={styles.brand}>
            <MaterialCommunityIcons
              name="factory"
              size={20}
              color={myTheme.colors.dark}
            />
            <Text style={[styles.itemSubtitle, { marginLeft: 5 }]}>
              {item.product.brand}
            </Text>
          </View>
          <PriceItem
            style={{ marginTop: 10 }}
            item={item}
            onChange={(item) => {
              setLocalItem(item);
            }}
          />
        </View>
        <View style={styles.contentBtn}>
          <Button
            mode="contained"
            buttonColor={myTheme.colors.danger}
            onPress={() => {
              router.navigate("route-remove");
            }}
          >
            Remover
          </Button>
          <Button
            mode="contained"
            buttonColor={myTheme.colors.secondary}
            onPress={async () => {
              await setIsCancel(true);
              actionSheetRef.current?.hide();
            }}
          >
            Cancelar
          </Button>
        </View>
        <View style={styles.contentBtnSave}>
          <Button
            mode="contained"
            buttonColor={myTheme.colors.success}
            onPress={async () => {
              await setIsCancel(false);
              actionSheetRef.current?.hide();
            }}
          >
            Salvar
          </Button>
        </View>
        <ScrollView {...scrollHandlers} style={styles.scrollView}></ScrollView>
      </View>
    );
  };

  const goRouteError = () => {
    router && router.navigate("route-error");
  };

  useEffect(() => {
    if (statusRemove == "success") {
      actionSheetRef.current?.hide();
    }
    if (statusRemove == "error") {
      goRouteError();
    }
  }, [statusRemove]);

  const routes: Route[] = [
    {
      name: "route-remove",
      component: RouteRemove,
    },
    {
      name: "route-item",
      component: RouteItem,
    },
    {
      name: "route-loading",
      component: RouteLoading,
    },
    {
      name: "route-error",
      component: RouteError,
    },
  ];

  return (
    <ActionSheet
      id={sheetId}
      ref={actionSheetRef}
      onBeforeShow={() => {}}
      onBeforeClose={async (data) => {
        const ignoreProperties = ["product", "shoppingList"];
        if (
          //@ts-ignore
          equals(data?.item, localItem, ignoreProperties) == false &&
          isCancel == false
        ) {
          await dispatch(changeItemFromItems({ ...localItem }));
          updateItemMutation({ ...localItem });
        }
      }}
      containerStyle={{
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
      }}
      indicatorStyle={{
        width: 100,
        height: 10,
      }}
      snapPoints={[50, 100]}
      initialSnapIndex={1}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}
      defaultOverlayOpacity={0.5}
      payload={payload}
      onClose={() => {}}
      enableRouterBackNavigation={true}
      routes={routes}
      closeOnTouchBackdrop={false}
      closeOnPressBack={false}
      initialRoute="route-item"
    ></ActionSheet>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    margin: 40,
    justifyContent: "space-between",
    width: "100%",
  },
  text: {
    fontSize: 15,
    alignSelf: "center",
  },
  rowOne: {
    flexDirection: "row",
  },
  btnRemove: {
    backgroundColor: "#BDBDBD",
    borderBottomEndRadius: 20,
    borderColor: "#BDBDBD",
  },
  contentBtn: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentBtnSave: {
    marginTop: 10,
    marginBottom: 30,
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  footer: {
    height: 100,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  placeholder: {
    height: 15,
    backgroundColor: "#f0f0f0",
    marginVertical: 15,
    borderRadius: 5,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  btnLeft: {
    width: 30,
    height: 30,
    backgroundColor: "#f0f0f0",
    borderRadius: 100,
  },
  input: {
    width: "100%",
    minHeight: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  containerLoading: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
    marginLeft: 15,
    marginRight: 15,
    height: 200,
  },
  containerRouteRemove: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 50,
    height: 200,
  },
  container2: {
    flexDirection: "column",
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  scrollView: {
    width: "100%",
    padding: 12,
  },
  added: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  description: {
    flexDirection: "row",
    justifyContent: "flex-start",

    alignContent: "center",
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    backgroundColor: "#fff",
    borderColor: "#eeeee4",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  unitPrice: {
    flexDirection: "row",
  },
  priceTitle: {
    color: myTheme.colors.light,
    backgroundColor: myTheme.colors.success,
    borderRadius: 10,
    padding: 5,
    marginLeft: 10,
  },
  priceSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  noPrice: {
    marginTop: 16,
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  updatePriceButton: {
    backgroundColor: myTheme.colors.primary,
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  updatePriceButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  integerPrice: {
    fontSize: 24, // tamanho da fonte para a parte inteira do preço
    fontWeight: "bold", // peso da fonte para a parte inteira do preço
  },
  decimalPrice: {
    fontSize: 14, // tamanho da fonte para a parte inteira do preço
  },
  thumbnail: {
    width: 100,
    height: 80,
    borderRadius: 10,
    marginLeft: 10,
  },
  image: {
    flexDirection: "column",
    marginRight: 5,
    justifyContent: "flex-end",
  },
});
export default ActionSheetItem;
