import React, { useState, useRef } from "react";
import { BASE_URL_DEV, BASE_URL_PRD } from "@env";
import { Dialog } from "@rneui/themed";
import {
  Input,
  Icon,
  VStack,
  Box,
  Stack,
  Center,
  NativeBaseProvider,
  Image,
  ScrollView,
  Text,
  View,
  Heading,
  Button,
  AlertDialog,
  Spacer,
  AspectRatio,
  HStack,
} from "native-base";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import LoadingComponent from "../components/LoadingComponent";

export default function CreateShoppingListScreen({ route, navigation }) {
  const inputSupermarket = useRef();

  if (route.params.id == null) {
    navigation.setOptions({ title: "Cria lista" });
  } else {
    navigation.setOptions({ title: "Edita lista" });
  }
  const [shoppingList, setShoppingList] = useState(route.params);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [show, setShow] = React.useState(false);

  const [textRequiredDescription, setTextRequiredDescription] = useState("");
  const [textRequiredSupermarket, setTextRequiredSupermarket] = useState("");

  const onChangeDescription = (value) => {
    setTextRequiredDescription("");
    console.log(shoppingList);
    setShoppingList({ ...shoppingList, ["description"]: value });
  };

  const onChangeSupermarket = (value) => {
    setTextRequiredSupermarket("");
    setShoppingList({ ...shoppingList, ["supermarket"]: value });
  };

  const save = async () => {
    if (shoppingList.description.trim() == "") {
      setTextRequiredDescription(
        "Ops! Vc esqueceu de informa o nome da lista."
      );
      return;
    }
    if (shoppingList.supermarket.trim() == "") {
      setTextRequiredSupermarket("Ops! Vc esqueceu de informa o supermercado.");
      return;
    }
    console.log(JSON.stringify(shoppingList));
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
      console.log(json);
      setDialogVisible(true);
    } catch (error) {
      console.error(error);
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
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        bgColor={"white"}
        shadow="6"
      >
        <VStack p="5" space={5} width="100%" height={"60%"}>
          <Heading color={"black"}>Crie sua lista de compras</Heading>
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
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="description" />}
                size={5}
                ml="2"
                color="black"
              />
            }
            placeholder="Descrição"
            onSubmitEditing={() => inputSupermarket.current.focus()}
          />
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
                as={<MaterialCommunityIcons name="factory" />}
                size={6}
                ml="2"
                color="black"
              />
            }
            ref={inputSupermarket}
            placeholder="Fabricante"
          />
          <Spacer />
          <Spacer />
          <Button rounded={4} onPress={save}>
            Criar
          </Button>
        </VStack>
      </Box>
    </VStack>
    // <Center flex={1} bgColor={"theme.principal"} space={10} w="100%">
    //   <Box rounded={10} bgColor={"gray.100"}>
    //     <Input
    //       w={{
    //         base: "75%",
    //         md: "25%",
    //       }}
    //       borderColor="white"
    //       bgColor="white"
    //       InputLeftElement={
    //         <Icon
    //           as={<MaterialIcons name="description" />}
    //           size={5}
    //           ml="2"
    //           color="black"
    //         />
    //       }
    //       placeholder="Descrição"
    //     />
    //     <Input
    //       w={{
    //         base: "75%",
    //         md: "25%",
    //       }}
    //       borderColor="white"
    //       bgColor="white"
    //       InputLeftElement={
    //         <Icon
    //           as={<MaterialCommunityIcons name="factory" />}
    //           size={5}
    //           ml="2"
    //           color="black"
    //         />
    //       }
    //       placeholder="Fabricante"
    //     />
    //   </Box>
    // </Center>

    // <View style={{ flex: 1 }}>

    //   <Input
    //     style={{ marginTop: 20, fontSize: 25 }}
    //     placeholder="Nome da lista"
    //     autoFocus={true}
    //     onChangeText={onChangeDescription}
    //     value={shoppingList.description}
    //     returnKeyType="next"
    //     errorMessage={textRequiredDescription}
    //     onSubmitEditing={() => inputSupermarket.current.focus()}
    //   />
    //   <Input
    //     style={{ marginTop: 20, fontSize: 25 }}
    //     placeholder="Nome do supermercado"
    //     onChangeText={onChangeSupermarket}
    //     errorMessage={textRequiredSupermarket}
    //     value={shoppingList.supermarket}
    //     ref={inputSupermarket}
    //   />

    //   <Button
    //     title="Salvar"
    //     loading={loading}
    //     loadingProps={{ size: "small", color: "white" }}
    //     buttonStyle={{
    //       backgroundColor: "green",
    //       borderRadius: 5,
    //     }}
    //     titleStyle={{ fontWeight: "bold", fontSize: 23 }}
    //     containerStyle={{
    //       marginHorizontal: 50,
    //       marginVertical: 10,
    //     }}
    //     onPress={save}
    //   />
    //   <Dialog isVisible={dialogVisible}>
    //     <Dialog.Title title="Sucesso" />
    //     <Text>A lista foi cadastrada com sucesso!</Text>
    //     <Dialog.Actions>
    //       <Dialog.Button
    //         title="Ta certo!"
    //         onPress={() => navigation.navigate("ListShopping")}
    //       />
    //     </Dialog.Actions>
    //   </Dialog>
    // </View>
  );
}
