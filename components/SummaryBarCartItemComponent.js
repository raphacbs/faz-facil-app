import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, FAB, Icon, withBadge } from "@rneui/themed";

const SummaryBarComponent = (props) => {
  const {
    backgroundColor,
    amount,
    totalCartItems,
    totalProducts,
    onPressAddItem,
  } = props;
  const BadgedIconTotalCartItems = withBadge(totalCartItems)(Icon);
  const BadgedIconTotalProducts = withBadge(totalProducts)(Icon);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 5,
          marginBottom: 10,
        }}
      >
        <BadgedIconTotalProducts
          color="white"
          type="fontisto"
          name="shopping-bag-1"
          style={{ alignItems: "flex-start" }}
        />
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <FAB
          visible={true}
          icon={{
            name: "add-shopping-cart",
            color: "green",
            type: "material",
          }}
          onPress={onPressAddItem}
          color="white"
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "flex-end",
          marginRight: 10,
          flex: 1,
        }}
      >
        <Text
          h3
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 15,
          }}
        >
          {amount}
        </Text>
      </View>
    </View>
  );
};

export default SummaryBarComponent;
