import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ListItem, Chip, Avatar, Text } from "@rneui/themed";
import { SimpleStepper } from "react-native-simple-stepper";

const CartItem = (props) => {
  const { cartItem, increment, decrement } = props;
  const [amountOfProduct, setAmountOfProduct] = useState(
    cartItem.amountOfProduct
  );
  const [subtotal, setSubtotal] = useState(cartItem.subtotal);

  const update = (value) => {
    const item = {
      id: cartItem.id,
      unitValue: cartItem.unitValue,
      amountOfProduct: value,
    };
    console.log(item);
    increment(item);
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <Avatar
        rounded
        source={{
          uri: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
        }}
        size={80}
      />
      <ListItem.Content>
        <View>
          <ListItem.Title style={{ fontWeight: "bold" }}>
            {cartItem.product.description}
          </ListItem.Title>
          <ListItem.Subtitle style={{ marginBottom: 10 }}>
            <Chip
              title={cartItem.unitValue}
              containerStyle={{ marginVertical: 15 }}
            />
          </ListItem.Subtitle>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              marginRight: 10,
            }}
          >
            <Text h3>{cartItem.subtotal}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: 0,
            }}
          >
            <SimpleStepper
              valueChanged={(amountOfProduct) => {
                update(amountOfProduct);
              }}
              initialValue={amountOfProduct}
              minimumValue={1}
              maximumValue={100}
              showText={true}
              containerStyle={{
                backgroundColor: "transparent",
                flexDirection: "row",
                borderWidth: 1,
                borderRadius: 8,
                overflow: "hidden",
                alignItems: "center",
                borderColor: "green",
              }}
              separatorStyle={{
                width: StyleSheet.hairlineWidth,
                backgroundColor: "green",
                height: "100%",
              }}
            ></SimpleStepper>
          </View>
        </View>
      </ListItem.Content>
      <ListItem.Chevron />
    </View>
  );
};

export default CartItem;
