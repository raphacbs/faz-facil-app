import React from "react";
import { VStack, HStack, Badge, Box, Text, Icon, Spacer } from "native-base";
import { FontAwesome, MaterialIcons, Zocial } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const ShoppingListComponent = (props) => {
  const { shoppingList } = props;
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Box
        flex="1"
        safeAreaRight
        width="95%"
        borderWidth="1"
        //borderColor="primary.300"
        shadow="4"
        //bg="primary.300"
        p="3"
        rounded="8"
        margin={3}
      >
        <VStack width="100%" mt="0" px="1">
          <HStack width="100%" justifyContent="space-between">
            <VStack flex={1}>
              <Text
                color="black"
                mt="3"
                fontWeight="medium"
                fontSize="lg"
                width="100%"
                marginTop={-1}
              >
                {shoppingList.description}
              </Text>
            </VStack>
          </HStack>
          <HStack width="100%" justifyContent="space-between">
            <VStack>
              <Badge
                rounded="lg"
                _text={{
                  fontSize: 15,
                }}
                colorScheme="blueGray"
                alignSelf="flex-start"
                variant="solid"
                startIcon={
                  <Icon
                    as={MaterialIcons}
                    name="place"
                    color="white"
                    _dark={{
                      color: "warmGray.50",
                    }}
                  />
                }
              >
                {shoppingList.supermarket}
              </Badge>
            </VStack>
            <VStack>
              <Text
                color="black"
                mt="3"
                fontWeight="bold"
                fontSize="2xl"
                width="100%"
                height="100%"
                marginTop={-1}
                flex={10}
              >
                {shoppingList.amount}
              </Text>
            </VStack>
          </HStack>
          <HStack justifyContent={"space-between"}>
            <VStack>
              <Badge
                rounded="lg"
                _text={{
                  fontSize: 15,
                }}
                colorScheme="green"
                alignSelf="flex-start"
                variant="solid"
                startIcon={
                  <Icon
                    as={FontAwesome}
                    name="calendar"
                    color="white"
                    _dark={{
                      color: "warmGray.50",
                    }}
                  />
                }
              >
                {shoppingList.createAt}
              </Badge>
            </VStack>
            <VStack justifyContent={"flex-end"}>
              <Badge
                rounded="lg"
                _text={{
                  fontSize: 15,
                }}
                colorScheme="amber"
                alignSelf="flex-start"
                variant="solid"
                startIcon={
                  <Icon
                    as={Zocial}
                    name="cart"
                    color="white"
                    _dark={{
                      color: "warmGray.50",
                    }}
                  />
                }
              >
                {shoppingList.amountProducts.toString()}
              </Badge>
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
};

export default ShoppingListComponent;
