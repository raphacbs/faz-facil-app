import {
  Box,
  Heading,
  HStack,
  VStack,
  Text,
  Pressable,
  Center,
  Icon,
} from "native-base";

import { useNavigation, useTranslation } from "../../hooks";

import { MaterialIcons } from "@expo/vector-icons";

import { ISupermarket } from "../../@types/supermarket";

type Props = {
  supermarket: ISupermarket;
  onPress: () => void;
};

const SupermarketItem: React.FC<Props> = ({ supermarket, onPress }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <VStack>
      <Pressable onPress={onPress}>
        <VStack
          rounded={8}
          shadow={5}
          p={2}
          bgColor={"gray.200"}
          width="95%"
          margin={2}
          borderWidth="1"
          borderColor="gray.200"
        >
          <HStack>
            <Box
              marginLeft={-2}
              marginBottom={-2}
              marginTop={-2}
              marginRight={2}
              roundedLeft={8}
              bgColor={"green.800"}
              w={1}
            ></Box>
            <VStack space={2} width="100%">
              <HStack space={2} justifyContent="space-between">
                <Center>
                  <Heading color={"black"} size={"sm"}>
                    {supermarket.name}
                  </Heading>
                </Center>
                <HStack>
                  <Icon
                    marginTop={1}
                    as={MaterialIcons}
                    name="place"
                    color="amber.600"
                  />
                  <Text>{(supermarket.distance / 1000).toFixed(2)}Km</Text>
                </HStack>
              </HStack>
              <HStack space={2} justifyContent="space-between">
                <HStack>
                  <Icon
                    marginTop={1}
                    as={MaterialIcons}
                    name="place"
                    color="amber.600"
                  />
                  <Text>{supermarket.city}</Text>
                </HStack>
              </HStack>
              <HStack space={2} justifyContent="space-between">
                <Text>{supermarket.address}</Text>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
      </Pressable>
      <Center></Center>
    </VStack>
  );
};

export default SupermarketItem;
