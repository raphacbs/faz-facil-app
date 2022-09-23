import React, { useEffect, useState, useRef } from "react";
import {
  VStack,
  HStack,
  Badge,
  Box,
  Text,
  Icon,
  Spacer,
  Heading,
  Divider,
  IconButton,
  Center,
  Button,
} from "native-base";
import {
  FontAwesome,
  MaterialIcons,
  Zocial,
  Feather,
} from "@expo/vector-icons";

export default ListEmptyComponent = (props) => {
  return (
    <Center h={"100%"}>
      <VStack space={2} w={"80%"}>
        <Center>
          <Text fontSize="xl">{props.message}</Text>
        </Center>
        <Button onPress={props.onPress} rounded={15} size={"md"}>
          {props.buttonTitle}
        </Button>
      </VStack>
    </Center>
  );
};
