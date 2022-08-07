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

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

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
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
