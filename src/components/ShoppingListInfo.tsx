import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ShoppingList } from "../types/ShoppingList";
import { useSelector } from "react-redux";
import { myTheme } from "../theme/theme";

interface ShoppingListInfoProps {}

const ShoppingListInfo: React.FC<ShoppingListInfoProps> = (
  props: ShoppingListInfoProps
) => {
  const selectedShoppingList: ShoppingList = useSelector(
    //@ts-ignore
    (state) => state.shoppingList.selectedShoppingList
  );
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        height: 80,
        width: "100%",
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: myTheme.colors.primary,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={[styles.text, { alignSelf: "flex-start" }]}>
          Quantidade Itens
        </Text>
        <Text
          style={[styles.text, { alignSelf: "flex-end" }]}
        >{`${selectedShoppingList.itemsInfo.quantityAddedProduct} / ${selectedShoppingList.itemsInfo.quantityPlannedProduct}`}</Text>
      </View>
      <Text
        style={[styles.text, { alignSelf: "center", fontSize: 25 }]}
      >{`R$ ${selectedShoppingList.itemsInfo.totalValueAdded
        .toFixed(2)
        .replace(
          ".",
          ","
        )} / R$ ${selectedShoppingList.itemsInfo.plannedTotalValue
        .toFixed(2)
        .replace(".", ",")}`}</Text>
      <View
        style={{ flexDirection: "column", justifyContent: "flex-start" }}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: myTheme.colors.light,
    fontSize: 20,
  },
});

export default ShoppingListInfo;
