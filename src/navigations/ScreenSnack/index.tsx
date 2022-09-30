import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShoppingListScreen from "../../screens/ShoppingList";
import DrawerNavigator from "../DrawerNavigator";
import ShoppingCartScreen from "../../screens/ShoppingCart";
import ProductSearchScreen from "../../screens/Product/ProductSearch";
import BarCodeScanScreen from "../../screens/BarCodeScan";

const Stack = createNativeStackNavigator();

const ScreenSnack = () => {
  return (
    <Stack.Navigator initialRouteName="DrawerNavigator">
      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ShoppingList"
        component={ShoppingListScreen}
        options={{
          title: "Criar lista",
          headerStyle: {
            backgroundColor: "#0099e6",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="ShoppingCart"
        component={ShoppingCartScreen}
        options={{
          headerStyle: {
            backgroundColor: "#0099e6",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="ProductSearch"
        component={ProductSearchScreen}
        options={{
          title: "Pesquisar Produtos",
          headerStyle: {
            backgroundColor: "#0099e6",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="BarCodeScan"
        component={BarCodeScanScreen}
        options={{
          title: "Adicionar produto",
          headerStyle: {
            backgroundColor: "#0099e6",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

export default ScreenSnack;
