import React from "react";
import {
  VStack,
  HStack,
  Actionsheet,
  Box,
  Text,
  Icon,
  AlertDialog,
  Heading,
  Button,
  IconButton,
  Center,
  Pressable,
  Progress,
} from "native-base";
import {
  FontAwesome,
  MaterialIcons,
  Zocial,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ShoppingList } from "../../types";

interface Props {
  item: ShoppingList;
  index: number;
}

const ShoppingListItem: React.FC<Props> = ({ item }) => {
  return (
    <Pressable
      rounded={8}
      shadow={5}
      p={2}
      bgColor={"gray.200"}
      width="95%"
      margin={2}
      borderWidth="1"
      borderColor="gray.200"
      //onPress={props.onPress}
    >
      <HStack>
        <Box
          marginLeft={-2}
          marginBottom={-2}
          marginTop={-2}
          marginRight={2}
          roundedLeft={8}
          bgColor={item.archived ? "gray.400" : "green.800"}
          w={1}
        ></Box>
        <VStack width="100%">
          <HStack space={2} justifyContent="space-between">
            <Center>
              <Heading color={"black"} size={"sm"}>
                {item.description}
              </Heading>
            </Center>
            <IconButton
              size={"md"}
              variant="ghost"
              alignSelf={"flex-end"}
              onPress={() => {}}
              _icon={{
                as: MaterialCommunityIcons,
                name: "dots-vertical",
                color: "gray.600",
              }}
            />
          </HStack>
          <HStack space={2} justifyContent="space-between">
            <HStack>
              <Icon
                marginTop={1}
                as={MaterialIcons}
                name="place"
                color="amber.600"
              />
              <Text>{item.supermarket}</Text>
            </HStack>
            <Heading marginRight={2} color={"blue.800"} size={"sm"}>
              {item.amount}
            </Heading>
          </HStack>
          <HStack space={2} justifyContent="space-between">
            <HStack>
              <Icon
                margin={1}
                as={FontAwesome}
                name="calendar"
                color="gray.500"
              />
              <Text>{item.createAt}</Text>
            </HStack>
            <HStack>
              <Icon
                marginRight={2}
                as={Zocial}
                name="cart"
                color="gray.500"
                size={"md"}
              />
              <Text marginRight={2}>{item.amountProducts}</Text>
            </HStack>
          </HStack>

          <Box w="100%">
            <Progress
              bg="coolGray.100"
              _filledTrack={{
                bg: "lime.500",
              }}
              value={50}
              size="sm"
            />
          </Box>
        </VStack>
      </HStack>
    </Pressable>
  );
};

export default ShoppingListItem;
