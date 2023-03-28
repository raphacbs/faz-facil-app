/* eslint-disable prettier/prettier */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../src/screens/HomeScreen";
import ListsScreen from "../../src/screens/ListsScreen";
import SettingsScreen from "../../src/screens/SettingsScreen";
import Icon from "react-native-vector-icons/AntDesign";
import { myTheme } from "../../src/theme/theme";
import { createStackNavigator } from "@react-navigation/stack";
import ProductListScreen from "../../src/screens/ProductListScreen";
import ProductDetailsScreen from "../../src/screens/ProductDetailScreen";

// import {useTheme} from '../../hooks';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: "Home", headerTitle: "Produtos" }}
      />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
        options={{
          title: "Detalhes do Produto",
          headerTitle: "Detalhes do Produto",
        }}
      />
    </Stack.Navigator>
  );
};

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: myTheme.colors.primary,
      }}
    >
      <Tab.Screen
        name="TabHome"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="barcode" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Minhas Listas"
        component={ListsScreen}
        options={{
          tabBarLabel: "Minhas Listas",
          tabBarIcon: ({ color, size }) => (
            <Icon name="bars" color={color} size={size} />
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
export default MainTabScreen;
