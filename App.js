import * as React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListShoppingScreen from "./screens/ListShoppingScreen";
import ShoppingCartScreen from "./screens/ShoppingCartScreen";
import HelloWorldScreen from "./screens/HelloWorldScreen";
import { ThemeProvider, createTheme, Button, Icon } from "@rneui/themed";

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
        <Stack.Navigator initialRouteName="ListShopping">
          <Stack.Screen
            name="HelloWorld"
            component={HelloWorldScreen}
            options={{ title: "Hello World!" }}
          />
          <Stack.Screen
            name="ListShopping"
            component={ListShoppingScreen}
            options={{
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
                >
                  <Icon name="plus" type="font-awesome" color="white" />
                </Button>
              ),
            }}
          />
          <Stack.Screen
            name="ShoppingCart"
            component={ShoppingCartScreen}
            options={({ route }) => ({
              title: route.params.name,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
