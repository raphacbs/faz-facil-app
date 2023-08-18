/* eslint-disable prettier/prettier */
import BarCodeScan from "../components/BarCodeScanner";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setSearchCode } from "../store/actions/productActions";
import Container from "../components/Container";
import useConstants from "../hooks/useConstants";
import { useQueryClient } from "react-query";
import * as Haptics from "expo-haptics";

const BarCodeScannerScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { SET_PRODUCT_DETAILS } = useConstants();
  const dispatch = useDispatch();
  const [code, setCode] = useState<string>("");
  const queryClient = useQueryClient();

  const onPressInsertCode = () => {
    //@ts-ignore
    navigation.replace("SearchScreen");
  };

  const onScannerCode = (code: string) => {
    dispatch({
      type: "SET_SEARCH_TERM",
      payload: code,
    });

    dispatch(setSearchCode(code));

    //@ts-ignore
    if (route.params?.previousScreen) {
      //@ts-ignore
      navigation.replace("PriceInputScreen", {
        //@ts-ignore
        previousScreen: route.params?.previousScreen
          ? //@ts-ignore
            route.params?.previousScreen
          : "BarCodeScannerScreen",
      });
    } else {
      //@ts-ignore
      navigation.replace("ProductListScreen", {
        //@ts-ignore
        previousScreen: route.params?.previousScreen
          ? //@ts-ignore
            route.params?.previousScreen
          : "BarCodeScannerScreen",
      });
    }

    setCode(code);
  };
  const onPressCancel = () => {
    navigation.goBack();
  };

  return (
    <Container
      isLoading={false}
      error={undefined}
      loadingMessage="Buscando produto"
    >
      <BarCodeScan
        onScannerCode={onScannerCode}
        onPressInsertCode={onPressInsertCode}
        onPressCancel={onPressCancel}
      />
    </Container>
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
