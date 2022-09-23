import React, { useEffect, useState } from "react";
import {
  Input,
  Icon,
  Box,
  VStack,
  ScrollView,
  View,
  Button,
  HStack,
  Divider,
  Text,
  Center,
  Image,
  Stack,
} from "native-base";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const ProductItem = (props) => {
  const product = props.product;

  return (
    <VStack>
      <HStack space={1} paddingBottom={5}>
        <VStack flex={1}>
          <Center>
            <Image
              source={{
                uri: product.image,
              }}
              fallbackSource={{
                uri: "https://drive.google.com/uc?id=1w361FjVApKKJn6g8H5NVZ3IVbL-fSpo4",
              }}
              alt="Product Image"
              size="xl"
            />
          </Center>
        </VStack>
        <VStack flex={2}>
          <Text fontWeight={"bold"} fontSize="sm" w={"100%"}>
            {product.description}
          </Text>
          <Text fontSize="xs" w={"100%"}>
            {product.brand}
          </Text>
          <Text fontSize="xs" w={"100%"}>
            {product.ean}
          </Text>
          <Text fontSize="xs" w={"100%"}>
            último preço: R$ 5,60
          </Text>
          <Text fontSize="xs" w={"100%"}>
            Média de preço nos últimos 3 meses: R$ 5,50
          </Text>
        </VStack>
        <VStack flex={1} space={1}>
          <Button
            rounded={20}
            colorScheme="blue"
            onPress={() => {
              props.onAdd(product);
            }}
          >
            Add
          </Button>
        </VStack>
      </HStack>
      <Divider marginTop={3} my="2" />
    </VStack>
  );
};

export default ProductItem;
