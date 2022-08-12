import React, { useState } from "react";
import { ListItem } from "@rneui/themed";
import { VStack, HStack, Badge, Icon, Text, Box, Avatar } from "native-base";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import NumericInput from "react-native-numeric-input";
import MenuDotComponent from "./MenuDotComponent";

const CartItem = (props) => {
  const { cartItem, increment, decrement } = props;
  const [amountOfProduct, setAmountOfProduct] = useState(
    cartItem.amountOfProduct
  );
  const [subtotal, setSubtotal] = useState(cartItem.subtotal);

  const update = (value) => {
    const item = {
      id: cartItem.id,
      unitValue: cartItem.unitValue,
      amountOfProduct: value,
    };
    console.log(item);
    increment(item);
  };

  return (
    <ListItem.Content>
      <Box
        flex="1"
        safeAreaRight
        width="100%"
        borderWidth="1"
        borderColor="coolGray.300"
        shadow="3"
        bg="coolGray.100"
        p="3"
        rounded="8"
      >
        <VStack space="2.5" mt="2" px="0.5">
          <HStack space={1} width="100%" justifyContent="space-between">
            <VStack>
              <Avatar
                alignSelf="flex-start"
                size="md"
                source={{
                  uri: cartItem.product.image,
                }}
              >
                AJ
              </Avatar>
            </VStack>
            <VStack>
              <HStack>
                <Text
                  color="coolGray.800"
                  mt="3"
                  fontWeight="medium"
                  fontSize="md"
                  width={250}
                  height="100%"
                  marginTop={-1}
                >
                  {cartItem.product.description}
                </Text>
              </HStack>
              <Text color="black">{cartItem.product.ean}</Text>
            </VStack>
            {/* <Icon
              as={SimpleLineIcons}
              name="options-vertical"
              color="black"
              _dark={{
                color: "black",
              }}
            /> */}
            {/* <MenuDotComponent></MenuDotComponent> */}
          </HStack>
          <HStack space={4}>
            <VStack>
              <Badge
                rounded="lg"
                _text={{
                  fontSize: 20,
                }}
                colorScheme="info"
                alignSelf="center"
                variant="solid"
                startIcon={
                  <Icon
                    as={Ionicons}
                    name="pricetag"
                    color="coolGray.800"
                    _dark={{
                      color: "warmGray.50",
                    }}
                  />
                }
              >
                {cartItem.unitValue}
              </Badge>
            </VStack>
          </HStack>
          <HStack justifyContent="space-between">
            <VStack>
              <Badge
                rounded="lg"
                _text={{
                  fontSize: 25,
                }}
                alignSelf="center"
                variant="solid"
                startIcon={
                  <Icon
                    as={Ionicons}
                    name="calculator"
                    size={25}
                    color="gray.800"
                    _dark={{
                      color: "warmGray.50",
                    }}
                  />
                }
              >
                {cartItem.subtotal}
              </Badge>
            </VStack>
            <NumericInput
              value={amountOfProduct}
              onChange={(value) => {
                update(value);
              }}
              rounded
            />
          </HStack>
        </VStack>
      </Box>
    </ListItem.Content>
  );
};

export default CartItem;
