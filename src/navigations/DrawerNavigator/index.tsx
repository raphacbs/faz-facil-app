import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreenOld from "../../screens/Home";
import { useTranslation } from "../../hooks";
import Filter from "../../screens/Home/Filter";
import { HStack, IconButton } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import SidebarMenu from "../../components/SideBarMenu";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { t } = useTranslation();

  return (
    <Drawer.Navigator drawerContent={(props) => <SidebarMenu {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeScreenOld}
        initialParams={{ isArchived: false }}
        //@ts-ignore
        options={({ navigation }) => ({
          title: t("shopping_list.title"),
          headerStyle: {
            backgroundColor: "#0099e6",
          },
          headerTintColor: "#fff",
          headerRight: () => (
            <HStack justifyContent={"flex-end"}>
              {/* <Filter /> */}
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
                  navigation.navigate("SearchList");
                }}
              />
            </HStack>
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
