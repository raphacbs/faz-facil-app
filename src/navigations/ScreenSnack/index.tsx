import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "../DrawerNavigator";
import SignIn from "../../screens/SignIn";
import { useAuth, useTranslation, useNavigation, useApp } from "../../hooks";
import SignUp from "../../screens/SignUp";
import SearchScreen from "../../screens/Home/Search";
import ShoppingListForm from "../../screens/Home/ShoppingListForm";
import SearchSupermarketScreen from "../../screens/Supermarket/Search";
import ItemScreen from "../../screens/Item";
import { HStack, IconButton } from "native-base";

import { Ionicons } from "@expo/vector-icons";

import FilterItem from "../../screens/Item/FilterItem";
import ScanScreen from "../../screens/Product/Scan";
import AddItemScreen from "../../screens/Item/AddItem";
import ProductSearchScreen from "../../screens/Product/Search";
import ItemSearchScreen from "../../screens/Item/Search";
const Stack = createNativeStackNavigator();

const ScreenSnack = (props: any) => {
  const { currentShoppingList } = useApp();
  const { isSignedIn } = useAuth();
  const { t } = useTranslation();
  const navigation = useNavigation();
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
              title: `${t("sing_up_screen.screen_title")}`,
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
              title: `${t("search.title")}`,

              headerStyle: {
                backgroundColor: "#0099e6",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="ShoppingListRegister"
            component={ShoppingListForm}
            options={{
              title: `${t("shopping_list.registe_title")}`,

              headerStyle: {
                backgroundColor: "#0099e6",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="ShoppingListEdit"
            component={ShoppingListForm}
            options={{
              title: `${t("shopping_list.edit_title")}`,

              headerStyle: {
                backgroundColor: "#0099e6",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="SearchSupermarket"
            component={SearchSupermarketScreen}
            options={{
              title: `${t("search.title_supermarket")}`,

              headerStyle: {
                backgroundColor: "#0099e6",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="Item"
            component={ItemScreen}
            options={{
              title: currentShoppingList?.description,
              headerRight: () => (
                <HStack justifyContent={"flex-end"}>
                  {/* <FilterItem /> */}
                  <IconButton
                    size={"md"}
                    variant="ghost"
                    alignSelf={"center"}
                    _icon={{
                      as: Ionicons,
                      name: "search",
                      color: "white",
                    }}
                    onPress={() => {
                      //@ts-ignore
                      navigation.navigate("ItemSearch");
                    }}
                  />
                </HStack>
              ),
              headerStyle: {
                backgroundColor: "#0099e6",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="Scan"
            component={ScanScreen}
            options={{
              title: `${t("scan.title")}`,
              headerStyle: {
                backgroundColor: "#0099e6",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="AddItem"
            component={AddItemScreen}
            options={{
              title: `${t("add_item.title")}`,
              headerStyle: {
                backgroundColor: "#0099e6",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="ProductSearch"
            component={ProductSearchScreen}
            options={{
              title: `${t("product.title")}`,
              headerStyle: {
                backgroundColor: "#0099e6",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="ItemSearch"
            component={ItemSearchScreen}
            options={{
              title: `${t("item_search.title")}`,
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
