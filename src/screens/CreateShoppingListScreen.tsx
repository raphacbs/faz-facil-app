import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import Button from "../components/Button";
import { myTheme } from "../../src/theme/theme";
import { useDispatch } from "react-redux";
import { setShoppingListToSave } from "../store/actions/shoppingListAction";
import { ShoppingListPost } from "../types/ShoppingList";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

interface CreateShoppingListProps {}

const CreateShoppingListScreen: React.FC<CreateShoppingListProps> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [shoppingListName, setShoppingListName] = useState("");

  const handleInputChange = (text: string) => {
    setShoppingListName(text);
  };

  const handleButtonPress = () => {
    console.log("Nome da lista de compras:", shoppingListName);
    const shoppingListToSave: ShoppingListPost = {
      description: shoppingListName.trim(),
      status: "IN_PLANNING",
      supermarketId: "",
    };
    dispatch(setShoppingListToSave(shoppingListToSave));
    //@ts-ignore
    navigation.navigate({
      name: "SupermarketListScreen",
      params: { nextScreen: "ShoppingListResumeScreen" },
    });
  };

  const isButtonDisabled = shoppingListName.trim().length === 0;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={[styles.input, { color: myTheme.colors.light }]}
          value={shoppingListName}
          onChangeText={handleInputChange}
          placeholder="Minha lista"
          autoFocus
          placeholderTextColor={myTheme.colors.secondary}
          underlineColorAndroid="transparent"
        />
        {shoppingListName.trim().length > 0 && (
          <Button
            title="Avançar"
            onPress={handleButtonPress}
            style={styles.button}
            isLoading={false}
            schema="success"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: myTheme.colors.primary,
    paddingTop: 20,
  },
  title: {
    alignSelf: "flex-start",
    marginTop: 20,
    marginBottom: 10,
    marginStart: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: myTheme.colors.light,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    paddingHorizontal: 10,
    color: myTheme.colors.light,
    fontSize: 30,
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderBottomColor: myTheme.colors.light,
    marginBottom: 20,
    textAlign: "center",
    flexGrow: 1,
  },
  button: {
    width: 200,
    marginBottom: 15,
  },
});

export default CreateShoppingListScreen;
