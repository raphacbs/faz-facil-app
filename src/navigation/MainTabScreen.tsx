/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScreen from "../screens/SearchScreen";
import AuthScreen from "../screens/AuthScreen";
import ProfileScreen from "../../src/screens/ProfileScreen";

import { myTheme } from "../../src/theme/theme";
import { createStackNavigator } from "@react-navigation/stack";
import ProductListScreen from "../../src/screens/ProductListScreen";
import ProductDetailsScreen from "../../src/screens/ProductDetailScreen";
import BarCodeScannerScreen from "../screens/BarCodeScannerScreen";
import MyTransition from "../navigation/MyTransition";
import PriceInputScreen from "../../src/screens/PriceInputScreen";
import SupermarketListScreen from "../../src/screens/SupermarketListScreen";
import PriceHistoryResumeScreen from "../screens/PriceHistoryResumeScreen";
import HomeScreen from "../screens/HomeScreen";
import { signIn } from "../store/actions/userAction";
import { useDispatch } from "react-redux";
import CreateShoppingListScreen from "../screens/CreateShoppingListScreen";
import ShoppingListResumeScreen from "../screens/ShoppingListResumeScreen";
import { useIsFocused } from "@react-navigation/native";
import MyShoppingListsScreen from "../screens/MyShoppingListsScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Unit } from "../types/Unit";
import { setUnits } from "../store/actions/unitAction";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

interface Props {
  units: Array<Unit>;
}

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",

        cardStyle: { backgroundColor: "#fff" },
        transitionSpec: {
          //@ts-ignore
          open: MyTransition.transitionSpec,
          //@ts-ignore
          close: MyTransition.transitionSpec,
        },
        cardStyleInterpolator: MyTransition.cardStyleInterpolator,
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Resumo",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyShoppingListsScreen"
        component={MyShoppingListsScreen}
        options={{
          title: "Minhas Listas",
          headerTitle: "Minhas Listas",
        }}
      />
      <Stack.Screen
        name="ShoppingListScreen"
        component={ShoppingListScreen}
        options={{
          title: "Resumo",
          headerStyle: {
            backgroundColor: myTheme.colors.primary,
          },
          headerTitleStyle: {
            color: myTheme.colors.light,
          },
          headerTintColor: myTheme.colors.light,
          headerRight: () => (
            <Ionicons
              name="ios-search"
              size={24}
              color={myTheme.colors.light}
              style={{ marginRight: 10 }}
              onPress={() => {
                // Lógica para lidar com o clique na lupa
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const TabStack = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const isLogged = async () => {
      // await getUserLogged();
      await dispatch(signIn());
    };
    isLogged();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        tabBarActiveTintColor: myTheme.colors.primary,
      }}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Pesquisar",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          title: "Faz Feira",
          headerTitleStyle: { color: myTheme.colors.light },
          headerStyle: {
            backgroundColor: myTheme.colors.primary,
            // borderBottomLeftRadius: 20,
            // borderBottomRightRadius: 20,
          },
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Perfil",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainTabScreen: React.FC<Props> = ({ units }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  dispatch(setUnits(units));
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",

        cardStyle: { backgroundColor: "#fff" },
        transitionSpec: {
          //@ts-ignore
          open: MyTransition.transitionSpec,
          //@ts-ignore
          close: MyTransition.transitionSpec,
        },
        cardStyleInterpolator: MyTransition.cardStyleInterpolator,
      }}
    >
      <Stack.Screen
        name="Main"
        component={TabStack}
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen
        name="ProductListScreen"
        component={ProductListScreen}
        options={{ title: "Home", headerTitle: "Produtos" }}
      />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
        options={{
          title: "Produto",
          headerTitle: "Produto",
        }}
      />
      <Stack.Screen
        name="BarCodeScannerScreen"
        component={BarCodeScannerScreen}
        options={{
          title: "Leitura de código",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PriceInputScreen"
        component={PriceInputScreen}
        options={{
          title: "Add preço",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: "Add preço",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SupermarketListScreen"
        component={SupermarketListScreen}
        options={{
          title: "Selecione o supermercado",
          headerStyle: {
            backgroundColor: myTheme.colors.primary,
          },
          headerTitleStyle: {
            color: myTheme.colors.light,
          },
          headerTintColor: myTheme.colors.light,
        }}
      />
      <Stack.Screen
        name="PriceHistoryResumeScreen"
        component={PriceHistoryResumeScreen}
        options={{
          title: "Resumo",
          headerStyle: {
            backgroundColor: myTheme.colors.primary,
          },
          headerTitleStyle: {
            color: myTheme.colors.light,
          },
          headerTintColor: myTheme.colors.light,
        }}
      />
      <Stack.Screen
        name="ShoppingListResumeScreen"
        component={ShoppingListResumeScreen}
        options={{
          title: "Resumo",
          headerStyle: {
            backgroundColor: myTheme.colors.primary,
          },
          headerTitleStyle: {
            color: myTheme.colors.light,
          },
          headerTintColor: myTheme.colors.light,
        }}
      />
      {/* <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Resumo",
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateShoppingListScreen"
        component={CreateShoppingListScreen}
        options={({ navigation }) => ({
          title: "Insira o nome da lista",
          headerStyle: {
            backgroundColor: myTheme.colors.primary,
          },
          headerTitleStyle: {
            color: myTheme.colors.light,
          },
          headerTintColor: myTheme.colors.light,
          tabBarVisible: isFocused, // Adicione essa linha para exibir as abas
        })}
      />
    </Stack.Navigator>
  );
};
export default MainTabScreen;
