import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../../screens/Home";
import SidebarMenu from "../../components/SideBarMenu";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <SidebarMenu {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
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

export default DrawerNavigator;
