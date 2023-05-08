/* eslint-disable prettier/prettier */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScreen from "../screens/SearchScreen";
import AuthScreen from "../screens/AuthScreen";
import SettingsScreen from "../../src/screens/SettingsScreen";
import Icon from "react-native-vector-icons/AntDesign";
import { myTheme } from "../../src/theme/theme";
import { createStackNavigator } from "@react-navigation/stack";
import ProductListScreen from "../../src/screens/ProductListScreen";
import ProductDetailsScreen from "../../src/screens/ProductDetailScreen";
import BarCodeScannerScreen from "../screens/BarCodeScannerScreen";
import MyTransition from "../navigation/MyTransition";
import PriceInputScreen from "../../src/screens/PriceInputScreen";
import SupermarketListScreen from "../../src/screens/SupermarketListScreen";
import PriceHistoryResumeScreen from "../screens/PriceHistoryResumeScreen";
// import {useTheme} from '../../hooks';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
            <Icon name="search1" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={AuthScreen}
        options={{
          tabBarLabel: "Home",
          title: "Faz Feira",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Configurações"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Configurações",
          tabBarIcon: ({ color, size }) => (
            <Icon name="setting" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainTabScreen = () => {
  return (
    // <Tab.Navigator
    //   initialRouteName="Home"
    //   screenOptions={{
    //     tabBarActiveTintColor: myTheme.colors.primary,
    //   }}
    // >
    //   <Tab.Screen
    //     name="TabHome"
    //     component={HomeStack}
    //     options={{
    //       tabBarLabel: "Home",
    //       headerShown: false,
    //       tabBarIcon: ({ color, size }) => (
    //         <Icon name="barcode" color={color} size={size} />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Minhas Listas"
    //     component={ListsScreen}
    //     options={{
    //       tabBarLabel: "Minhas Listas",
    //       tabBarIcon: ({ color, size }) => (
    //         <Icon name="bars" color={color} size={size} />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Configurações"
    //     component={SettingsScreen}
    //     options={{
    //       tabBarLabel: "Configurações",
    //       tabBarIcon: ({ color, size }) => (
    //         <Icon name="setting" color={color} size={size} />
    //       ),
    //     }}
    //   />
    // </Tab.Navigator>
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
        component={HomeStack}
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
        name="SupermarketListScreen"
        component={SupermarketListScreen}
        options={{
          title: "Supermercados",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PriceHistoryResumeScreen"
        component={PriceHistoryResumeScreen}
        options={{
          title: "Resumo",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};
export default MainTabScreen;
