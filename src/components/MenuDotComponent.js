import React, { useState } from "react";
import {
  VStack,
  HStack,
  Badge,
  Icon,
  Text,
  Box,
  Avatar,
  Button,
  Menu,
} from "native-base";
import { SimpleLineIcons, Entypo } from "@expo/vector-icons";

const MenuDotComponent = (props) => {
  const [shouldOverlapWithTrigger] = useState(false);
  return (
    <VStack space={6} alignSelf="flex-start" w="100%">
      <Menu
        shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
        placement={"auto"}
        trigger={(triggerProps) => {
          return (
            <Button alignSelf="center" variant="solid" {...triggerProps}>
              Menu
            </Button>
          );
        }}
      >
        <Menu.Item>Arial</Menu.Item>
        <Menu.Item>Nunito Sans</Menu.Item>
        <Menu.Item>Roboto</Menu.Item>
      </Menu>
    </VStack>
  );
};

export default MenuDotComponent;
