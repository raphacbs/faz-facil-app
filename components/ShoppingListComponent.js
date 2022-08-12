import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Chip, Icon } from "@rneui/themed";

const ShoppingListComponent = (props) => {
  const { shoppingList } = props;
  return (
    <View style={styles.container}>
      <View style={styles.viewDescriptionAndAmount}>
        <Text style={styles.description}>{shoppingList.description}</Text>
        <Text style={styles.amount}>{shoppingList.amount}</Text>
      </View>
      <View style={styles.body}>
        <View>
          <View style={styles.viewIconAndSupermarket}>
            <Icon name="place" type="material" color="green" />
            <Text style={styles.supermarket}>{shoppingList.supermarket}</Text>
          </View>
          <View style={styles.viewIconAndCreateAt}>
            <Icon size={20} name="calendar" type="font-awesome" color="green" />
            <Text style={{ marginLeft: 4 }}>
              {"Criada em " + shoppingList.createAt}
            </Text>
          </View>
        </View>
        <Chip
          title={shoppingList.amountProducts.toString()}
          color="success"
          icon={{
            name: "cart",
            type: "zocial",
            size: 15,
            color: "white",
          }}
          containerStyle={{ marginVertical: 15 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
  },
  viewDescriptionAndAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  description: { fontWeight: "bold", marginBottom: 10, fontSize: 15 },
  amount: {
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    fontSize: 20,
  },
  body: { flexDirection: "row", justifyContent: "space-between" },
  viewIconAndSupermarket: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  supermarket: { marginTop: 3, marginLeft: 2 },
  viewIconAndCreateAt: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 3,
    marginLeft: 3,
  },
});

export default ShoppingListComponent;
