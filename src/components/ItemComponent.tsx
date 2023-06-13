import {
  TouchableOpacity,
  View,
  Text,
  Switch,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Item } from "../types/Item";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Foundation from "react-native-vector-icons/Foundation";
import { myTheme } from "../theme/theme";
import { useEffect, useState } from "react";
import { updateItem } from "../store/actions/itemAction";
import { useMutation, useQueryClient } from "react-query";
import { useNavigation } from "@react-navigation/native";
import useUtils from "../hooks/useUtils";
import { useDispatch } from "react-redux";
import { setStatusSelectedShoppingList } from "../store/actions/shoppingListAction";

interface ItemProps {
  item: Item;
  onPressItem: (item: Item) => void;
}

const ItemComponent: React.FC<ItemProps> = ({ item, onPressItem }) => {
  const [localItem, setLocalItem] = useState<Item>({ ...item });
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    setLocalItem({ ...item });
  }, [item]);

  const {
    mutate: updateItemMutation,
    isLoading,
    error,
    isError,
  } = useMutation({
    mutationFn: (item: Item) => updateItem(item),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["shoppingLists"] });
      await queryClient.invalidateQueries({ queryKey: ["home-shoppingLists"] });
      await queryClient.invalidateQueries({ queryKey: ["items"] });
      console.log("fim da invalidação");
    },
    onMutate: async () => {
      console.log("altera status global da shopping list para loading");
      await dispatch(setStatusSelectedShoppingList("loading"));
    },
  });

  const toggleSwitch = (value: boolean) => {
    const updatedItem = { ...localItem, added: value };
    setLocalItem(updatedItem);
    updateItemMutation(updatedItem);
  };

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

  const { truncateString } = useUtils();

  return (
    <TouchableOpacity
      style={[styles.item, { flex: 1, width: "100%", height: "100%" }]}
      onPress={() => onPressItem(localItem)}
    >
      <View>
        <View style={styles.icon}>
          <View style={styles.rowOne}>
            <Icon name="barcode-scan" size={20} color={myTheme.colors.dark} />
            <Text style={[styles.itemSubtitle, { marginLeft: 5 }]}>
              {localItem.product.code}
            </Text>
          </View>
          <View style={styles.added}>
            <Text style={[styles.itemSubtitle, { marginLeft: 5 }]}>
              {localItem.added ? "Adicionado" : "Planejado"}
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: myTheme.colors.success }}
              thumbColor={
                localItem.added ? myTheme.colors.primary : myTheme.colors.light
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={localItem.added}
            />
          </View>
        </View>
        <View style={styles.description}>
          <Icon
            name="card-text-outline"
            size={20}
            color={myTheme.colors.dark}
          />
          <Text
            numberOfLines={2}
            style={[
              styles.itemTitle,
              { marginLeft: 5, marginRight: 5, width: 300 },
            ]}
          >
            {truncateString(localItem.product.description, 55)}
          </Text>
        </View>
        <View style={styles.brand}>
          <Icon name="factory" size={20} color={myTheme.colors.dark} />
          <Text style={[styles.itemSubtitle, { marginLeft: 5 }]}>
            {localItem.product.brand}
          </Text>
        </View>
        <View style={styles.price}>
          <View style={styles.unitPrice}>
            <Entypo name="price-tag" size={20} color={myTheme.colors.dark} />
            <Text style={[styles.itemSubtitle, { marginLeft: 5 }]}>
              {localItem.perUnit.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>
          </View>
          <View style={styles.unitPrice}>
            <Entypo name="colours" size={20} color={myTheme.colors.dark} />
            <Text style={[styles.itemSubtitle, { marginLeft: 5 }]}>
              {localItem.quantity} {localItem.unit.initials}
            </Text>
          </View>
          <View style={styles.unitPrice}>
            <Foundation
              name="pricetag-multiple"
              size={20}
              color={myTheme.colors.dark}
            />
            <Text style={[styles.itemSubtitle, { marginLeft: 5 }]}>
              {localItem.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  rowOne: {
    flexDirection: "row",
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

    alignItems: "center",
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
    marginBottom: 10,
    padding: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    height: 50,
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  price: {
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
});

export default ItemComponent;
