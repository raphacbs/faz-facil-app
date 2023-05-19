import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { ShoppingList } from "../types/ShoppingList";

interface Props {
  shoppingLists: ShoppingList[];
  onPressShoppingList: (item: ShoppingList) => void;
  onCreateList: () => void;
}

const ShoppingListHorizontal: React.FC<Props> = ({
  shoppingLists,
  onPressShoppingList,
  onCreateList,
}) => {
  const truncateString = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }

    const ellipsis = "...";
    const ellipsisLength = ellipsis.length;

    const truncationLength = Math.floor((maxLength - ellipsisLength) / 2);
    const truncatedText =
      text.slice(0, truncationLength) +
      ellipsis +
      text.slice(text.length - truncationLength);

    return truncatedText;
  };

  const formatValue = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const renderShoppingListBlock = (item: ShoppingList, index: number) => {
    const { description, itemsInfo, supermarketName } = item;
    const formattedValue = formatValue(itemsInfo.totalValueAdded);
    const [integerPart, decimalPart] = formattedValue.split(",");

    return (
      <TouchableOpacity
        style={[styles.shoppingListBlock, index === 3 && styles.moreBlock]}
        onPress={() => onPressShoppingList(item)}
      >
        <Text style={styles.descriptionText}>
          {truncateString(description, 10)}
        </Text>
        <Text style={styles.supermarketNameText}>{supermarketName}</Text>
        <Text style={styles.price}>
          <Text style={styles.integerPartText}>{integerPart}</Text>
          <Text style={styles.decimalPartText}>,{decimalPart}</Text>
        </Text>
      </TouchableOpacity>
    );
  };

  const renderMoreBlock = () => {
    return (
      <TouchableOpacity
        style={[styles.moreBlock, styles.moreBlock]}
        onPress={() => {
          console.log("Clique no bloco 'mais'");
        }}
        key="more"
      >
        <Text style={styles.moreBlockText}>Mais</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyListComponent = () => (
    <TouchableOpacity style={styles.moreBlock} onPress={onCreateList}>
      <Text style={styles.createListButtonText}>Criar Lista</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={shoppingLists.slice(0, 3)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => renderShoppingListBlock(item, index)}
        ListHeaderComponent={renderEmptyListComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  shoppingListBlock: {
    width: 110,
    height: 110,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  moreBlock: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    width: 110,
    height: 110,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginRight: 8,
    padding: 8,
  },
  descriptionText: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  valueText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  integerPartText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  decimalPartText: {
    fontSize: 10,
  },
  moreBlockText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#888",
  },
  createListButton: {
    width: 100,
    height: 100,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  createListButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#888",
  },
  supermarketNameText: {
    fontSize: 10,
    marginBottom: 4,
  },
  price: {
    flex: 2,
    textAlign: "right",
  },
});

export default ShoppingListHorizontal;
