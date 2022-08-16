import {
  Box,
  Center,
  Badge,
  HStack,
  IconButton,
  Text,
  VStack,
  Icon,
} from "native-base";
import React from "react";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const SummaryBarComponent = (props) => {
  const {
    backgroundColor,
    amount,
    totalCartItems,
    totalProducts,
    onPressAddItem,
  } = props;

  return (
    <VStack
      justifyContent={"center"}
      flex={2}
      bgColor={"theme.principal"}
      borderColor="white"
    >
      <Center>
        <HStack
          w="95%"
          h="75%"
          bgColor={"primary.300"}
          rounded={30}
          justifyContent="space-between"
        >
          <Center h="100%" w="30%">
            <Box alignItems="center">
              <VStack>
                <Badge // bg="red.400"
                  colorScheme="danger"
                  rounded="full"
                  mb={-4}
                  mr={-4}
                  zIndex={1}
                  variant="solid"
                  alignSelf="flex-end"
                  _text={{
                    fontSize: 10,
                  }}
                >
                  {totalProducts}
                </Badge>
                <Icon
                  as={FontAwesome5}
                  name="shopping-basket"
                  color="white"
                  size={9}
                />
              </VStack>
            </Box>
          </Center>
          <Center h="100%" w="30%">
            <IconButton
              onPress={onPressAddItem}
              rounded={30}
              shadow={10}
              size={"lg"}
              alignSelf={"center"}
              colorScheme="indigo"
              variant="solid"
              alignContent={"center"}
              _icon={{
                size: 35,
                as: MaterialIcons,
                name: "add-shopping-cart",
              }}
            />
          </Center>
          <Center h="100%" w="30%">
            <Text fontWeight={"black"} fontSize="xl">
              {amount}
            </Text>
          </Center>
        </HStack>
      </Center>
    </VStack>
  );
};

export default SummaryBarComponent;
