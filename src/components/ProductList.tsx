import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { myTheme } from "../theme/theme";
import { Product } from "../types/Product";

interface Props {
  products: Product[];
  onPressItem: (item: Product) => void;
  handleNextPage: () => void;
}

const ProductList: React.FC<Props> = ({
  products,
  onPressItem,
  handleNextPage,
}) => {
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

  const renderItem = ({ item }: { item: Product }) => {
    // Busca o último preço do produto ordenado por updateAt de forma decrescente
    const latestHistory = item.priceHistories?.sort((a, b) =>
      b.updatedAt.localeCompare(a.updatedAt)
    )[0];

    return (
      <TouchableOpacity
        style={[styles.item, { flex: 1, width: "100%" }]}
        onPress={() => onPressItem(item)}
      >
        <View style={styles.icon}>
          <Icon name="barcode-scan" size={20} color={myTheme.colors.dark} />
          <Text style={[styles.itemSubtitle, { marginLeft: 5 }]}>
            {item.code}
          </Text>
        </View>
        <View style={styles.icon}>
          <Icon
            name="card-text-outline"
            size={20}
            color={myTheme.colors.dark}
          />
          <Text style={[styles.itemTitle, { marginLeft: 5 }]}>
            {item.description}
          </Text>
        </View>
        <View style={styles.icon}>
          <Icon name="factory" size={20} color={myTheme.colors.dark} />
          <Text style={[styles.itemSubtitle, { marginLeft: 5 }]}>
            {item.brand}
          </Text>
        </View>
        {latestHistory ? (
          <>
            <View style={styles.price}>
              <Text>Último preço</Text>

              <Text style={styles.priceTitle}>
                {renderPrice(
                  latestHistory.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                )}
              </Text>
            </View>
            <Text
              style={styles.priceSubtitle}
            >{`Supermercado: ${latestHistory.supermarket.name}`}</Text>
          </>
        ) : (
          <Text style={styles.noPrice}>Sem preço</Text>
        )}
        <TouchableOpacity style={styles.updatePriceButton}>
          <Text style={styles.updatePriceButtonText}>Atualizar Preço</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.code}
      contentContainerStyle={styles.container}
      onEndReached={handleNextPage}
    />
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
    color: myTheme.colors.success,
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

export default ProductList;
