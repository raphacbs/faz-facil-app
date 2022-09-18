import React from "react";
import { SafeAreaView } from "react-native";
import { Avatar, Box, Center, Heading, Text } from "native-base";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const SidebarMenu = (props: any) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box h={"11%"} backgroundColor={"theme.principal"}></Box>
      <Center>
        <Avatar marginTop={-10} size={"2xl"} bg="green.500">
          RC
        </Avatar>
      </Center>
      <DrawerContentScrollView {...props}>
        <Center p={1}>
          <Text>
            <Heading>F</Heading>eira <Heading>F</Heading>ácil
          </Text>
        </Center>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default SidebarMenu;
