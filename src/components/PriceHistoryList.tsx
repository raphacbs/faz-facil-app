import { myTheme } from "../theme/theme";

import moment from "moment";
// import "moment/locale/pt";
import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { PriceHistory } from "../types/PriceHistories";

type Props = {
  priceHistories: Array<PriceHistory>;
};

const PriceHistoryList = ({ priceHistories }: Props) => {
  // moment.locale("pt-br");
  const navigation = useNavigation();
  const sortedHistories: Array<PriceHistory> = priceHistories.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const renderEmptyHistory = () => {
    return (
      <View style={styles.contentEmptyHistory}>
        <Text style={styles.textEmptyHistory}>Sem preços </Text>
        <Button
          isLoading={false}
          title={"Add Preço"}
          schema={"principal"}
          size="m"
          onPress={function (): void {
            //@ts-ignore
            navigation.navigate("PriceInputScreen");
          }}
        />
      </View>
    );
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: PriceHistory;
    index: number;
  }) => {
    const price = item.price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const nextPrice =
      index < sortedHistories.length - 1
        ? sortedHistories[index + 1].price.toFixed(2)
        : null;

    const priceDiff =
      nextPrice !== null
        ? //@ts-ignore
          item.price.toFixed(2) - sortedHistories[index + 1].price.toFixed(2)
        : null;
    const priceDiffDisplay =
      priceDiff !== null
        ? `${priceDiff.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`
        : "";
    const [integerPart, decimalPart] = price.split(",");
    // console.log(integerPart, decimalPart);
    return (
      <View style={styles.priceHistoryItem}>
        <View>
          <Text style={styles.supermarketName}>{item.supermarket.name}</Text>
          <Text style={styles.priceHistoryMarket}>
            {item.supermarket.street}
          </Text>
        </View>
        <View>
          <Text style={styles.priceHistoryPrice}>
            <Text style={styles.integerPrice}>{integerPart}</Text>
            <Text style={styles.decimalPrice}>,{decimalPart}</Text>
          </Text>
          <Text style={styles.priceHistoryPriceDiff}>
            {priceDiffDisplay !== "" && priceDiff != null && (
              <Text
                style={[
                  styles.priceHistoryPriceDiff,
                  { color: priceDiff > 0 ? "red" : "green" },
                ]}
              >
                {priceDiff > 0 ? (
                  <Icon
                    name="caretup"
                    size={15}
                    color={myTheme.colors.danger}
                    style={styles.arrows}
                  />
                ) : (
                  <Icon
                    name="caretdown"
                    size={15}
                    color={myTheme.colors.success}
                    style={styles.arrows}
                  />
                )}

                {priceDiffDisplay}
              </Text>
            )}
          </Text>
          <Text style={styles.priceHistoryDate}>
            {moment(item.createdAt).fromNow()}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={sortedHistories}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContentContainer}
      ListEmptyComponent={renderEmptyHistory}
    />
  );
};

const styles = StyleSheet.create({
  listContentContainer: {
    paddingVertical: 8,
  },
  priceHistoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: myTheme.colors.light,
    borderRadius: 10,
    padding: 20,
  },
  supermarketName: {
    fontWeight: "bold",
  },
  textEmptyHistory: {
    fontWeight: "bold",
    justifyContent: "center",
    margin: 5,
  },
  contentEmptyHistory: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 70,
  },
  priceHistoryMarket: {
    flex: 3,
    fontSize: 14,
    margin: 1,
  },
  priceHistoryPrice: {
    flex: 2,
    textAlign: "right",
  },
  priceHistoryPriceDiff: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  priceHistoryDate: {
    flex: 2,
    fontSize: 14,
    alignSelf: "flex-end",
  },
  priceHistoryDistance: {
    flex: 2,
    fontSize: 14,
    textAlign: "right",
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 10,
  },
  arrows: {
    marginRight: 10,
  },
  integerPrice: {
    fontSize: 24, // tamanho da fonte para a parte inteira do preço
    fontWeight: "bold", // peso da fonte para a parte inteira do preço
  },
  decimalPrice: {
    fontSize: 14, // tamanho da fonte para a parte inteira do preço
  },
});

export default PriceHistoryList;
