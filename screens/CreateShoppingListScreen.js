import React, { useState, useRef, useEffect } from "react";
import { BASE_URL_DEV, BASE_URL_PRD } from "@env";
import {
  Input,
  Icon,
  VStack,
  Box,
  Center,
  Heading,
  Button,
  FormControl,
  WarningOutlineIcon,
  ScrollView,
} from "native-base";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import LoadingComponent from "../components/LoadingComponent";

export default function CreateShoppingListScreen({ route, navigation }) {
  const inputSupermarket = useRef();

  useEffect(() => {
    if (route.params.id == null) {
      navigation.setOptions({ title: "Cria lista" });
    } else {
      navigation.setOptions({ title: "Edita lista" });
    }
  }, []);

  const [shoppingList, setShoppingList] = useState({ ...route.params });
  const [loading, setLoading] = useState(false);

  const [inputDescriptionIsInvalid, setInputDescriptionIsInvalid] =
    useState(false);

  const [inputSupermarketIsInvalid, setInputSupermarketIsInvalid] =
    useState(false);

  const onChangeDescription = (value) => {
    setShoppingList({ ...shoppingList, ["description"]: value });
    setInputDescriptionIsInvalid(shoppingList.description.trim() == "");
  };

  const onChangeSupermarket = (value) => {
    setShoppingList({ ...shoppingList, ["supermarket"]: value });
    setInputSupermarketIsInvalid(shoppingList.supermarket.trim() == "");
  };

  const save = async () => {
    if (shoppingList.description.trim() == "") {
      setInputDescriptionIsInvalid(true);
      return;
    }
    if (shoppingList.supermarket.trim() == "") {
      setInputSupermarketIsInvalid(true);
      return;
    }
    setLoading(true);
    try {
      const url = `${BASE_URL_DEV}/api/v1/shopping-carts`;
      const shoppingListToSave = {
        id: shoppingList.id,
        description: shoppingList.description,
        archived: false,
        supermarket: shoppingList.supermarket,
      };
      const response = await fetch(url, {
        method: shoppingList.id == null ? "POST" : "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shoppingListToSave),
      });
      const json = await response.json();
      setLoading(false);
      navigation.goBack();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <VStack
      bgColor={"theme.principal"}
      flex={1}
      alignItems="center"
      justifyContent={"center"}
    >
      <LoadingComponent visible={loading}></LoadingComponent>
      <Box
        width="90%"
        rounded="lg"
        overflow="scroll"
        borderColor="coolGray.200"
        borderWidth="1"
        bgColor={"white"}
        shadow={6}
      >
        <ScrollView
          maxW="full"
          w="100%"
          h="80%"
          _contentContainerStyle={{
            px: "3px",
            mb: "4",
            minW: "50",
          }}
        >
          <VStack p="3" space={10} width="100%" height={"70%"}>
            <Center>
              <Heading color={"black"}>Lista de compras</Heading>
            </Center>
            <VStack>
              <FormControl isRequired isInvalid={inputDescriptionIsInvalid}>
                <Input
                  autoFocus={true}
                  selectionColor={"gray"}
                  variant="underlined"
                  size={"2xl"}
                  borderColor="black"
                  bgColor="white"
                  color={"black"}
                  isFocused={true}
                  isRequired={true}
                  onChangeText={onChangeDescription}
                  value={shoppingList.description}
                  marginRight={1}
                  InputLeftElement={
                    <Icon
                      as={<Entypo name="text" />}
                      size={5}
                      ml="2"
                      color="black"
                    />
                  }
                  placeholder="Descrição"
                  onSubmitEditing={() => inputSupermarket.current.focus()}
                />
                <FormControl.HelperText>
                  Informe o nome da lista.
                </FormControl.HelperText>
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  Ops! Descrição inválida.
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={inputSupermarketIsInvalid}>
                <Input
                  selectionColor={"gray"}
                  variant="underlined"
                  size={"2xl"}
                  borderColor="black"
                  bgColor="white"
                  color={"black"}
                  isFocused={false}
                  isRequired={true}
                  onChangeText={onChangeSupermarket}
                  value={shoppingList.supermarket}
                  InputLeftElement={
                    <Icon
                      as={<FontAwesome5 name="shopping-cart" />}
                      size={6}
                      ml="2"
                      marginRight={1}
                      color="black"
                    />
                  }
                  ref={inputSupermarket}
                  placeholder="Supermercado"
                />
                <FormControl.HelperText>
                  Informe o nome do supermercado.
                </FormControl.HelperText>
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  Ops! nome do supermercado inválido.
                </FormControl.ErrorMessage>
              </FormControl>
              <VStack marginTop={20} justifyItems={"flex-end"}>
                <Button
                  rounded={20}
                  onPress={save}
                  size="sm"
                  testID="saveShoppingListBtn"
                  _text={{
                    color: "white",
                    fontSize: 25,
                  }}
                >
                  Salvar
                </Button>
              </VStack>
            </VStack>
          </VStack>
        </ScrollView>
      </Box>
    </VStack>
  );
}
