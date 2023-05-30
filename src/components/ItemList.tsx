import React, { useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { myTheme } from "../theme/theme";
import { useMoment } from "../hooks/useMoment";
import { Item } from "../types/Item";
import ItemComponent from "./ItemComponent";
import ActionSheetItem from "./ActionSheetItem";
import { ActionSheetRef, SheetManager } from "react-native-actions-sheet";

interface Props {
  items: Item[];
  onPressItem: (item: Item) => void;
  handleNextPage: () => void;
  onAddPrice: (item: Item) => void;
}

const ItemList: React.FC<Props> = ({
  items,
  onPressItem,
  handleNextPage,
  onAddPrice,
}) => {
  const moment = useMoment();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const renderPrice = (price: string) => {
    const [integerPart, decimalPart] = price.split(",");
    return (
      <>
        <Text>
          <Text style={styles.integerPrice}>{integerPart}</Text>
          <Text style={styles.decimalPrice}>,{decimalPart}</Text>
        </Text>
      </>
    );
  };
  const renderItem = ({ item }: { item: Item }) => {
    return (
      <ItemComponent
        item={item}
        onPressItem={(item: Item) => {
          SheetManager.show("item-sheet", {
            payload: { item },
          });
        }}
      />
    );
  };

  const renderFooterComponent = () => {
    return <View style={{ marginBottom: 60 }}></View>;
  };

  return (
    <>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        onEndReached={handleNextPage}
        ListFooterComponent={renderFooterComponent}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  icon: {
    flexDirection: "row",
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
  itemSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  price: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
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
});

export default ItemList;
