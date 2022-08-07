import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "@rneui/themed";

const SummaryBarComponent = (props) => {
  const { backgroundColor, cartItemList } = props;
  const [data, setData] = useState(cartItemList);
  const [amount, setAmount] = useState(cartItemList.amountItems);

  console.log(amount);

  const calculateTotalAmount = () => {
    let _amount = data.reduce((accumulator, object) => {
      return accumulator + object.subtotal;
    }, 0);
    console.log(data);
    console.log(_amount);
    setAmount(_amount);
  };

  return (
    <View style={{ flex: 1, backgroundColor: backgroundColor }}>
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
        {"Valor Total " + amount}
      </Text>
    </View>
  );
};

export default SummaryBarComponent;
