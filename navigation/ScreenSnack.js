import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import ShoppingCartScreen from "../screens/ShoppingCartScreen";
import CreateShoppingListScreen from "../screens/CreateShoppingListScreen";
import BarCodeScanScreen from "../screens/BarCodeScanScreen";
import ProductScreen from "../screens/ProductScreen";
import SearchProduct from "../screens/SearchProductScreen";
import { IconButton } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createNativeStackNavigator();

export default ScreenSnack = () => {
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
        name="ShoppingCart"
        component={ShoppingCartScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerStyle: {
            backgroundColor: "#0099e6",
          },
          headerTintColor: "#fff",
        })}
      />
      <Stack.Screen
        name="CreateShoppingList"
        component={CreateShoppingListScreen}
        options={{
          title: "Criar lista",
          headerStyle: {
            backgroundColor: "#0099e6",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="ReadBarCode"
        component={BarCodeScanScreen}
        options={{
          title: "Lê produto",
          headerStyle: {
            backgroundColor: "#0099e6",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          title: "Produto",
          headerStyle: {
            backgroundColor: "#0099e6",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="SearchProduct"
        component={SearchProduct}
        options={{
          title: "Buscar produto",
          headerStyle: {
            backgroundColor: "#0099e6",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};
