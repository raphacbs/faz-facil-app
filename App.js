import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListShoppingScreen from "./screens/ListShoppingScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListShoppingScreen">
        <Stack.Screen
          name="ListShoppingScreen"
          component={ListShoppingScreen}
          options={{ title: "Listas de Compras" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
