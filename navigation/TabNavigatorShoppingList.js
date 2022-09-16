import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ShoppingListScreen from "../screens/ShoppingListScreen";

const Tab = createMaterialTopTabNavigator();

export default function TabNavigatorShoppingList() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Abertas"
        component={ShoppingListScreen}
        initialParams={{ isArchived: false }}
        key={0}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Finalizadas"
        component={ShoppingListScreen}
        initialParams={{ isArchived: true }}
        key={1}
      />
    </Tab.Navigator>
  );
}
