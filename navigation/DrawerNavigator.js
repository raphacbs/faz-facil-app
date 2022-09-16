import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import { IconButton } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import CustomSidebarMenu from "../components/CustomSidebarMenu";

const Drawer = createDrawerNavigator();

export default DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
    >
      <Drawer.Screen
        name="ShoppingList"
        component={ShoppingListScreen}
        initialParams={{ isArchived: false }}
        options={({ navigation }) => ({
          title: "Minhas Listas",
          headerStyle: {
            backgroundColor: "#0099e6",
          },
          headerTintColor: "#fff",
        })}
      />
    </Drawer.Navigator>
  );
};
