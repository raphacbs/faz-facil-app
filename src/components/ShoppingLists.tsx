import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ShoppingList } from "../types/ShoppingList";
import { useSelector } from "react-redux";
import { useMoment } from "../hooks/useMoment";
import { myTheme } from "../theme/theme";

interface Props {
  onPressItem: (item: ShoppingList) => void;
  shoppingLists: Array<ShoppingList>;
  handleNextPage: () => void;
}

const ShoppingLists: React.FC<Props> = ({
  onPressItem,
  handleNextPage,
  shoppingLists,
}) => {
  const moment = useMoment();

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

  const renderShoppingListItem = ({ item }: { item: ShoppingList }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => onPressItem(item)}
      >
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.price}>
            <Text style={styles.valueText}>Total adicionado</Text>
            <Text>
              {renderPrice(
                item.itemsInfo.totalValueAdded.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              )}
            </Text>
          </View>
        </View>
        <Text style={styles.supermarket}>{item.supermarketName}</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.createdAt}>
            {moment(item.updatedAt).fromNow()}
          </Text>
          <View style={styles.price}>
            <Text style={styles.valueText}>Total Previsto</Text>
            <Text>
              {renderPrice(
                item.itemsInfo.plannedTotalValue.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              )}
            </Text>
          </View>
        </View>
        <View style={styles.quantity}>
          <Text>
            {item.itemsInfo.quantityAddedProduct}/
            {item.itemsInfo.quantityPlannedProduct}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={shoppingLists}
      renderItem={renderShoppingListItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      onEndReached={handleNextPage}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  descriptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#888888",
  },
  supermarket: {
    fontSize: 14,
    marginBottom: 4,
  },
  createdAt: {
    fontSize: 12,
    color: "#888888",
    alignSelf: "flex-start",
  },
  integerPrice: {
    fontSize: 24, // tamanho da fonte para a parte inteira do preço
    fontWeight: "bold", // peso da fonte para a parte inteira do preço
  },
  decimalPrice: {
    fontSize: 14, // tamanho da fonte para a parte inteira do preço
  },
  price: {
    borderRadius: 10,
    padding: 5,
    fontSize: 8,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  valueText: {
    fontSize: 8,
  },
  quantity: {
    borderRadius: 10,
    padding: 5,
    fontSize: 8,
    justifyContent: "center",
  },
});

export default ShoppingLists;
