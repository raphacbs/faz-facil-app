import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListShoppingScreen from "./screens/ListShoppingScreen";
import HelloWorldScreen from "./screens/HelloWorldScreen";
import { ThemeProvider, createTheme } from "@rneui/themed";

const Stack = createNativeStackNavigator();

function App() {
  const theme = createTheme({
    components: {
      Button: {
        raised: true,
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ListShoppingScreen">
          <Stack.Screen
            name="HelloWorldScreen"
            component={HelloWorldScreen}
            options={{ title: "Hello World!" }}
          />
          <Stack.Screen
            name="ListShoppingScreen"
            component={ListShoppingScreen}
            options={{ title: "Listas de Compras" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
