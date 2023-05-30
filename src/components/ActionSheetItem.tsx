import React, { ElementType, Ref, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Switch,
} from "react-native";
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
  useScrollHandlers,
} from "react-native-actions-sheet";
import { Item } from "../types/Item";
import { myTheme } from "../theme/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PriceItem from "./PriceItem";
import { initialState } from "../store/reducers/itemReducer";
import { useMutation, useQueryClient } from "react-query";
import { updateItem } from "../store/actions/itemAction";

const items = [
  100, 60, 150, 200, 170, 80, 41, 101, 61, 151, 202, 172, 82, 43, 103, 64, 155,
  205, 176, 86, 46, 106, 66, 152, 203, 173, 81, 42,
];

const ActionSheetItem: React.FC<SheetProps> = ({
  sheetId,
  payload,
}: SheetProps<{ item: Item }>) => {
  const [toggleAdd, setToggleAdd] = useState<boolean>(
    payload ? payload.item.added : false
  );
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollHandlers = useScrollHandlers<ScrollView>("1", actionSheetRef);
  const queryClient = useQueryClient();

  const {
    mutate: updateItemMutation,
    isLoading,
    error,
    isError,
  } = useMutation({
    mutationFn: (item: Item) => updateItem(item),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["shoppingLists"] });
      await queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  return (
    <ActionSheet
      id={sheetId}
      ref={actionSheetRef}
      onBeforeShow={() => {
        console.log("sheet payload", payload);
      }}
      containerStyle={{
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
      }}
      indicatorStyle={{
        width: 100,
      }}
      snapPoints={[50, 100]}
      initialSnapIndex={1}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}
      defaultOverlayOpacity={0.3}
      payload={payload}
      onClose={() => {}}
    >
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
              {payload?.item.product.code}
            </Text>
          </View>
          <View style={styles.added}>
            <Text style={[styles.itemSubtitle, { marginLeft: 5 }]}>
              {payload?.item.added ? "Adicionado" : "Planejado"}
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: myTheme.colors.success }}
              thumbColor={
                payload?.item.added
                  ? myTheme.colors.primary
                  : myTheme.colors.light
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => {
                setToggleAdd(value);
                const item = payload ? payload.item : initialState.selectedItem;
                updateItemMutation({ ...item, added: value });
              }}
              value={toggleAdd}
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
                {payload?.item.product.description}
              </Text>
            </View>

            <View style={[styles.image, { flex: 1 }]}>
              <Image
                source={{
                  uri: payload?.item.product.thumbnail
                    ? payload?.item.product.thumbnail
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
              {payload?.item.product.brand}
            </Text>
          </View>
          <PriceItem
            style={{ marginTop: 10 }}
            item={payload ? payload.item : initialState.selectedItem}
            onChange={(item) => {
              console.log(item);

              updateItemMutation(item);
            }}
          />
        </View>

        <ScrollView {...scrollHandlers} style={styles.scrollView}>
          <TextInput
            style={styles.input}
            multiline={true}
            placeholder={payload?.item?.product?.description}
          />

          <View>
            {items.map((item) => (
              <View
                key={item}
                // onPress={() => {
                //   SheetManager.hide(sheetId);
                // }}
                style={styles.listItem}
              >
                <View
                  style={[
                    styles.placeholder,
                    {
                      width: item,
                    },
                  ]}
                />

                <View style={styles.btnLeft} />
              </View>
            ))}
          </View>

          {/*  Add a Small Footer at Bottom */}
          <View style={styles.footer} />
        </ScrollView>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  rowOne: {
    flexDirection: "row",
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
