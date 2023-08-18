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
import { Item, ItemNewProductPost, ItemPost } from "../types/Item";
import { myTheme } from "../theme/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PriceItem from "./PriceItem";
import { initialState } from "../store/reducers/itemReducer";
import { QueryKey, useMutation, useQueryClient } from "react-query";
import {
  addItemWithNewProduct,
  changeItemFromItems,
  removeItem,
  updateItem,
} from "../store/actions/itemAction";
import { Button } from "react-native-paper";
import useUtils from "../hooks/useUtils";
import { useDispatch, useSelector } from "react-redux";
import { setStatusSelectedShoppingList } from "../store/actions/shoppingListAction";
import Form, { Field } from "./Form";
import * as Yup from "yup";
import FormRegisterProduct from "./FormRegisterProduct";

const ActionSheetRegister: React.FC<SheetProps> = ({
  sheetId,
  payload,
}: SheetProps<{ item: Item }>) => {
  const [isCancel, setIsCancel] = useState<boolean>(false);
  //@ts-ignore
  const code = useSelector((state) => state.product.codeSearched);
  const [localItem, setLocalItem] = useState<Item>();

  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollHandlers = useScrollHandlers<ScrollView>("0", actionSheetRef);
  const queryClient = useQueryClient();
  const { equals } = useUtils();
  const router = useSheetRouter();
  const dispatch = useDispatch();

  const {
    mutate: addItemMutation,
    isLoading,
    error,
    isError,
  } = useMutation({
    mutationFn: (item: ItemNewProductPost) => addItemWithNewProduct(item),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["items"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["shoppingLists"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["home-shoppingLists"],
      });
    },
    onMutate: async () => {
      console.log("altera status global da shopping list para loading");
      await dispatch(setStatusSelectedShoppingList("loading"));
      actionSheetRef.current?.hide();
    },
  });

  const handleSubmit = (item: ItemNewProductPost) => {
    console.log(item);
    addItemMutation(item);
  };

  const fields: Field[] = [
    {
      name: "productCode",
      label: "Código",
      rule: Yup.string().required("Informe o código do produto"),
      placeholder: "",
      defaultValue: code,
    },
    {
      name: "productDescription",
      label: "Descrição",
      rule: Yup.string().required("Informe a descrição do produto"),
      placeholder: "BISCOITO AMANTEIGADO PACOTE 100G",
      isUpperCase: true,
      autoFocus: true,
    },
    {
      name: "productBrand",
      label: "Marca/Fabricante",
      rule: Yup.string().required("Informe a marca do produto"),
      placeholder: "VITARELLA",
      isUpperCase: true,
    },
  ];

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

  const RouteQuestion = ({ router }: RouteScreenProps) => {
    return (
      <View style={styles.containerRouteRemove}>
        <Text style={styles.text}>
          O produto com o código
          <Text style={{ fontWeight: "bold" }}> {code} </Text>
          não foi localizado, deseja cadastra-lo?
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            textColor={myTheme.colors.dark}
            style={{ marginBottom: 15 }}
            onPress={() => {
              actionSheetRef.current?.hide();
            }}
          >
            Não
          </Button>
          <Button
            mode="contained-tonal"
            buttonColor={myTheme.colors.primary}
            textColor={myTheme.colors.light}
            onPress={() => {
              router.navigate("route-register");
            }}
          >
            Sim
          </Button>
        </View>
      </View>
    );
  };
  const RouteFormCreate = ({ router }: RouteScreenProps) => {
    return (
      <View style={styles.containerRouteRegiste}>
        {/* <Form
          fields={fields}
          onSubmit={handleSubmit}
          submitButtonTitle="Salvar"
          isLoading={false}
        /> */}
        <FormRegisterProduct
          onSubmit={handleSubmit}
          submitButtonTitle="Salvar"
          isLoading={isLoading}
        />
      </View>
    );
  };

  const goRouteError = () => {
    router && router.navigate("route-error");
  };

  // useEffect(() => {
  //   if (statusRemove == "success") {
  //     actionSheetRef.current?.hide();
  //   }
  //   if (statusRemove == "error") {
  //     goRouteError();
  //   }
  // }, [statusRemove]);

  const routes: Route[] = [
    {
      name: "route-question",
      component: RouteQuestion,
    },
    {
      name: "route-loading",
      component: RouteLoading,
    },
    {
      name: "route-error",
      component: RouteError,
    },
    {
      name: "route-register",
      component: RouteFormCreate,
    },
  ];

  return (
    <ActionSheet
      id={sheetId}
      ref={actionSheetRef}
      onBeforeShow={() => {}}
      onBeforeClose={async (data) => {}}
      containerStyle={{
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
      }}
      indicatorStyle={{
        width: 100,
        height: 10,
      }}
      snapPoints={[100]}
      initialSnapIndex={0}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}
      defaultOverlayOpacity={0.5}
      payload={payload}
      onClose={() => {}}
      enableRouterBackNavigation={true}
      routes={routes}
      closeOnTouchBackdrop={true}
      closeOnPressBack={true}
      initialRoute="route-question"
    ></ActionSheet>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "column",
    margin: 30,
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
    flexDirection: "column",
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
  containerRouteRegiste: {
    flexDirection: "column",
    justifyContent: "space-between",

    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 50,
    height: "100%",
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
export default ActionSheetRegister;
