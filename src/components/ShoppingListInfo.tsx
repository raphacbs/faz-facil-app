import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { ShoppingList } from "../types/ShoppingList";
import { useSelector } from "react-redux";
import { myTheme } from "../theme/theme";
import { useQueryClient } from "react-query";

interface ShoppingListInfoProps {
  isLoading: boolean;
}

const ShoppingListInfo: React.FC<ShoppingListInfoProps> = ({
  isLoading,
}: ShoppingListInfoProps) => {
  const queryClient = useQueryClient();
  // const queryState = queryClient.getQueryState(["shoppingLists", ""]);
  // console.log("state of de query is: " + queryState?.isInvalidated);
  // const queryData = queryClient.getQueryData("items");
  // console.log("Dados da consulta:", queryData);

  // Obtém todas as queryKeys processadas
  const processedQueryKeys = queryClient
    .getQueryCache()
    .getAll()
    .map((query) => query.queryKey);
  console.log("QueryKeys processadas:", processedQueryKeys);

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
        <Text style={[styles.text, { alignSelf: "flex-end" }]}>
          Quantidade Itens
        </Text>
        {isLoading ? (
          <ActivityIndicator
            style={{ alignSelf: "flex-end" }}
            color={myTheme.colors.light}
            size={"small"}
          />
        ) : (
          <Text style={[styles.text, { alignSelf: "flex-end" }]}>
            {`${selectedShoppingList.itemsInfo.quantityAddedProduct} / ${selectedShoppingList.itemsInfo.quantityPlannedProduct}`}
          </Text>
        )}
      </View>
      {isLoading ? (
        <ActivityIndicator
          style={{ alignSelf: "center" }}
          color={myTheme.colors.light}
          size={"small"}
        />
      ) : (
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
      )}

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
