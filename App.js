import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListShoppingScreen from "./screens/ListShoppingScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Listas de Compras">
        <Stack.Screen name="Listas de Compras" component={ListShoppingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
