import * as React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createNavigationContainerRef } from "@react-navigation/native";
import ListShoppingScreen from "./screens/ListShoppingScreen";
import ShoppingCartScreen from "./screens/ShoppingCartScreen";
import HelloWorldScreen from "./screens/HelloWorldScreen";
import { ThemeProvider, createTheme, Button, Icon } from "@rneui/themed";
import CreateShoppingListScreen from "./screens/CreateShoppingListScreen";
import BarCodeScanScreen from "./screens/BarCodeScanScreen";
import ProductScreen from "./screens/ProductScreen";
import { NativeBaseProvider, extendTheme } from "native-base";

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

function App() {
  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: "#E3F2F9",
        100: "#C5E4F3",
        200: "#A2D4EC",
        300: "#7AC1E4",
        400: "#47A9DA",
        500: "#0088CC",
        600: "#007AB8",
        700: "#006BA1",
        800: "#005885",
        900: "#003F5E",
      },
      // Redefining only one shade, rest of the color will remain same.
      amber: {
        400: "#d97706",
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: "dark",
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ListShopping">
          <Stack.Screen
            name="HelloWorld"
            component={HelloWorldScreen}
            options={{ title: "Hello World!" }}
          />
          <Stack.Screen
            name="ListShopping"
            component={ListShoppingScreen}
            options={({ navigation }) => ({
              title: "Listas de Compras",
              headerRight: () => (
                <Button
                  type="clear"
                  color="white"
                  buttonStyle={{
                    backgroundColor: "green",
                    borderWidth: 2,
                    borderColor: "white",
                    borderRadius: 30,
                  }}
                  onPress={() => {
                    navigation.navigate("CreateShoppingList", {
                      id: null,
                      description: "",
                      supermarket: "",
                    });
                  }}
                >
                  <Icon name="plus" type="font-awesome" color="white" />
                </Button>
              ),
            })}
          />
          <Stack.Screen
            name="ShoppingCart"
            component={ShoppingCartScreen}
            options={({ route }) => ({
              title: route.params.name,
            })}
          />
          <Stack.Screen
            name="CreateShoppingList"
            component={CreateShoppingListScreen}
            options={{
              title: "Criar lista",
            }}
          />
          <Stack.Screen
            name="ReadBarCode"
            component={BarCodeScanScreen}
            options={{
              title: "Lê produto",
            }}
          />
          <Stack.Screen
            name="Product"
            component={ProductScreen}
            options={{
              title: "Produto",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
