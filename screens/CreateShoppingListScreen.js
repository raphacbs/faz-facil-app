import React, { useEffect, useState, useRef } from "react";
import { View, ActivityIndicator } from "react-native";
import { BASE_URL_DEV, BASE_URL_PRD } from "@env";
import { Input, Button, Dialog, Text } from "@rneui/themed";

export default function CreateShoppingListScreen({ route, navigation }) {
  const inputSupermarket = useRef();
  const { id, description, supermarket } = route.params;
  id == null
    ? navigation.setOptions({ title: "Cria lista" })
    : navigation.setOptions({ title: "Edita lista" });
  const [shoppingList, setShoppingList] = useState({
    id,
    description,
    supermarket,
  });
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const [textRequiredDescription, setTextRequiredDescription] = useState("");
  const [textRequiredSupermarket, setTextRequiredSupermarket] = useState("");
  const messageRequired = "Este campo é obrigatório!";

  const onChangeDescription = (value) => {
    shoppingList.description = value;
    setTextRequiredDescription("");
    setShoppingList({ ...shoppingList });
  };

  const onChangeSupermarket = (value) => {
    shoppingList.supermarket = value;
    setTextRequiredSupermarket("");
    setShoppingList({ ...shoppingList });
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
    setLoading(true);
    try {
      const url = `${BASE_URL_DEV}/api/v1/shopping-carts`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shoppingList),
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
    <View style={{ flex: 1 }}>
      <Input
        style={{ marginTop: 20, fontSize: 25 }}
        placeholder="Nome da lista"
        autoFocus={true}
        onChangeText={onChangeDescription}
        value={shoppingList.description}
        returnKeyType="next"
        errorMessage={textRequiredDescription}
        onSubmitEditing={() => inputSupermarket.current.focus()}
      />
      <Input
        style={{ marginTop: 20, fontSize: 25 }}
        placeholder="Nome do supermercado"
        onChangeText={onChangeSupermarket}
        errorMessage={textRequiredSupermarket}
        value={shoppingList.supermarket}
        ref={inputSupermarket}
      />

      <Button
        title="Salvar"
        loading={loading}
        loadingProps={{ size: "small", color: "white" }}
        buttonStyle={{
          backgroundColor: "green",
          borderRadius: 5,
        }}
        titleStyle={{ fontWeight: "bold", fontSize: 23 }}
        containerStyle={{
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={save}
      />
      <Dialog
        isVisible={dialogVisible}
        onBackdropPress={() => setDialogVisible(!dialogVisible)}
      >
        <Dialog.Title title="Sucesso" />
        <Text>A lista foi cadastrada com sucesso!</Text>
        <Dialog.Actions>
          <Dialog.Button
            title="Ta certo!"
            onPress={() => navigation.navigate("ListShopping")}
          />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}
