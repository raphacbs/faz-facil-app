import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Chip, Icon } from "@rneui/themed";
import moment from "moment";

const ShoppingListComponent = (props) => {
  const { shoppingList } = props;
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontWeight: "bold", marginBottom: 10, fontSize: 15 }}>
          {shoppingList.description}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            marginBottom: 10,
            marginTop: 10,
            fontSize: 20,
          }}
        >
          R$ {shoppingList.amount}
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <Icon name="place" type="material" color="green" />
            <Text style={{ marginTop: 3, marginLeft: 2 }}>
              {shoppingList.supermarket}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              marginTop: 3,
              marginLeft: 3,
            }}
          >
            <Icon size={20} name="calendar" type="font-awesome" color="green" />
            <Text style={{ marginLeft: 4 }}>
              {"Criada " + moment(shoppingList.createAt).locale("pt").fromNow()}
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
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  amount: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: "bold",
  },
});

export default ShoppingListComponent;
