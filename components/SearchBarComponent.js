import React from "react";
import {
  VStack,
  HStack,
  Badge,
  Box,
  Text,
  Icon,
  IconButton,
  Input,
} from "native-base";
import { FontAwesome, MaterialIcons, Zocial } from "@expo/vector-icons";

const SearchBar = (props) => {
  return (
    <VStack my="4" space={5} w="100%" maxW="300px" divider={<Box px="2"></Box>}>
      <VStack w="100%" space={5} alignSelf="center">
        <Input
          placeholder="Search"
          variant="filled"
          width="100%"
          borderRadius="10"
          py="1"
          px="2"
          borderWidth="0"
          InputLeftElement={
            <Icon
              ml="2"
              size="4"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
        />
      </VStack>

      <VStack w="100%" space={5} alignSelf="center">
        <Input
          placeholder="Pesquise"
          width="100%"
          borderRadius="4"
          py="3"
          px="1"
          fontSize="14"
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
          InputRightElement={
            <Icon
              m="2"
              mr="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="mic" />}
            />
          }
        />
      </VStack>
    </VStack>
  );
};

export default SearchBar;
