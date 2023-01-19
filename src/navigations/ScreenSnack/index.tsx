import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShoppingListScreen from "../../screens/ShoppingList";
import DrawerNavigator from "../DrawerNavigator";
import ShoppingCartScreen from "../../screens/ShoppingCart";
import ProductSearchScreen from "../../screens/Product/ProductSearch";
import BarCodeScanScreen from "../../screens/BarCodeScan";
import SignIn from "../../screens/SignIn";
import { useEffect, useDispatch, useAuth, useTranslation } from "../../hooks";
import { isSignedIn } from "../../services/TokenService";
import SignUp from "../../screens/SignUp";
import SearchScreen from "../../screens/Home/Search";

const Stack = createNativeStackNavigator();

const ScreenSnack = (props: any) => {
  const { isSignedIn } = useAuth();
  const { t } = useTranslation();
  console.log("_isSignedIn", isSignedIn);
  return (
    <Stack.Navigator>
      {!isSignedIn ? (
        <Stack.Group key={"unauthorized"}>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              title: t("sing_up_screen.screen_title"),
            }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group key={"authorized"}>
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SearchList"
            component={SearchScreen}
            options={{
              title: t("search.title"),

              headerStyle: {
                backgroundColor: "#0099e6",
              },
              headerTintColor: "#fff",
            }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default ScreenSnack;
