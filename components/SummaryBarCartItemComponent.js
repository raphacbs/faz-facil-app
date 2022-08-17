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
import { Zocial, MaterialIcons } from "@expo/vector-icons";

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
      flex={1}
      bgColor={"theme.principal"}
      borderColor="white"
    >
      <Center>
        <HStack
          w="95%"
          h="85%"
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
                <Icon as={Zocial} name="cart" color="black" size={9} />
              </VStack>
            </Box>
          </Center>
          <Center h="100%" w="30%">
            <IconButton
              marginBottom={5}
              onPress={onPressAddItem}
              rounded={30}
              shadow={20}
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
            <Box alignItems="center">
              <Text fontWeight={"black"} fontSize="xl">
                {amount}
              </Text>
            </Box>
          </Center>
        </HStack>
      </Center>
    </VStack>
  );
};

export default SummaryBarComponent;
