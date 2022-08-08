import React, { useState, useEffect } from "react";
import { Button, ListItem, Input } from "@rneui/themed";
import { StyleSheet, View } from "react-native";

const ProductSheet = (props) => {
  const { ean } = props;
  const [isVisible, setIsVisible] = useState({ ...props.isVisible });

  useEffect(() => {
    setIsVisible(props.isVisible);
  }, [props.isVisible]);

  return <View></View>;
};

export default ProductSheet;
