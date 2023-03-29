/* eslint-disable prettier/prettier */
import BarCodeScan from "../components/BarCodeScanner";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

const BarCodeScannerScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressInsertCode = () => {
    navigation.goBack();
  };

  const onScannerCode = (code: string) => {
    console.log("code", code);
    dispatch({
      type: "SET_SEARCH_TERM",
      payload: code,
    });
    //@ts-ignore
    navigation.replace("ProductList");
  };
  const onPressCancel = () => {
    navigation.goBack();
  };

  return (
    <BarCodeScan
      onScannerCode={onScannerCode}
      onPressInsertCode={onPressInsertCode}
      onPressCancel={onPressCancel}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default BarCodeScannerScreen;
