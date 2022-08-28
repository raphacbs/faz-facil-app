import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createNavigationContainerRef } from "@react-navigation/native";
import ShoppingListScreen from "./screens/ShoppingListScreen";
import ShoppingCartScreen from "./screens/ShoppingCartScreen";
import HelloWorldScreen from "./screens/HelloWorldScreen";
import CreateShoppingListScreen from "./screens/CreateShoppingListScreen";
import BarCodeScanScreen from "./screens/BarCodeScanScreen";
import ProductScreen from "./screens/ProductScreen";
import { NativeBaseProvider, extendTheme, IconButton, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import SearchProduct from "./screens/SearchProductScreen";

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

function App() {
  // SplashScreen.preventAutoHideAsync()
  //   .then((result) =>
  //     console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  //   )
  //   .catch(console.warn);

  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 5000);
  }, []);

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
      theme: {
        principal: "#0099e6",
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: "light",
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ShoppingList">
          <Stack.Screen
            name="HelloWorld"
            component={HelloWorldScreen}
            options={{
              title: "Hello World!",
              headerStyle: {
                backgroundColor: "#0099e6",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="ShoppingList"
            component={ShoppingListScreen}
            options={({ navigation }) => ({
              title: "Listas de Compras",
              headerRight: () => (
                <IconButton
                  size={"sm"}
                  variant="ghost"
                  _icon={{
                    as: MaterialIcons,
                    name: "add-circle-outline",
                    size: 10,
                    color: "white",
                  }}
                  onPress={() => {
                    navigation.navigate("CreateShoppingList", {
                      id: null,
                      description: "",
                      supermarket: "",
                    });
                  }}
                />
              ),
              headerStyle: {
                backgroundColor: "#0099e6",
              },
              headerTintColor: "#fff",
            })}
          />
          <Stack.Screen
            name="ShoppingCart"
            component={ShoppingCartScreen}
            options={({ route }) => ({
              title: "Itens",
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
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
