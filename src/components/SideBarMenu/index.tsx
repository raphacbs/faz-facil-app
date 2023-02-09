import React from "react";
import { SafeAreaView } from "react-native";
import { Avatar, Box, Button, Center, Heading, Text } from "native-base";
import { useTranslation, useNavigation, useAuth } from "../../hooks";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Constants from "expo-constants";

const SidebarMenu = (props: any) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { signOut, userSigned } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box h={"11%"} backgroundColor={"theme.principal"}></Box>
      <Center>
        <Avatar marginTop={-10} size={"2xl"} bg="green.500">
          {userSigned?.initials}
        </Avatar>
        <Heading size={"sm"}>{`${t("drawer_navigator.hello_user")} ${
          userSigned?.firstName
        }`}</Heading>
      </Center>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Center>
        <Button
          width={"50%"}
          colorScheme="danger"
          marginBottom={10}
          onPress={async () => {
            signOut();
          }}
        >
          {t("drawer_navigator.button_logout_label")}
        </Button>
        <Text>{`${t("version_label")}:${Constants.expoConfig?.version}`}</Text>
      </Center>
    </SafeAreaView>
  );
};

export default SidebarMenu;
