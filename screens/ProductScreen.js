import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { BASE_URL_DEV, BASE_URL_PRD, BASE_URL_LOCAL } from "@env";
import { Input, Icon } from "@rneui/themed";
import { SimpleStepper } from "react-native-simple-stepper";
import { Button } from "react-native-paper";

export default function ProductScreen({ route, navigation }) {
  const [ean, setEan] = useState(route.params.ean);
  const [isLoading, setLoading] = useState(true);
  const [isEditing, setEditing] = useState(false);
  const [subtotal, setSubtotal] = useState(0.0);
  const [product, setProduct] = useState({
    ean: "",
    description: "",
    unitValue: 0.0,
  });
  const [amountOfProduct, setAmountOfProduct] = useState(1);

  useEffect(() => {
    handleProduct();
  }, [ean]);

  const handleProduct = async () => {
    try {
      console.log("ean= " + ean);
      console.log("route.params.ean= " + route.params.ean);
      const url = `${BASE_URL_DEV}/api/v1/products?ean=${ean}`;
      const response = await fetch(url);
      if (response.status == 200) {
        const json = await response.json();
        setProduct(json);
        console.log(product);
      } else {
        console.log("Produto não cadastrado!");
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleChange = (evt, t) => {
    console.log(t);
    const value = evt.target.value;
    setProduct({
      ...product,
      [evt.target.name]: value,
    });
  };

  const calculateSubtotal = (number) => {
    setAmountOfProduct(number);
    console.log(number, product.unitValue);
    setSubtotal((number * product.unitValue).toFixed(2));
  };

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "flex-start",
        flex: 1,
      }}
    >
      <Input
        value={product.ean}
        editable={false}
        name="ean"
        leftIcon={
          <Icon name="barcode" size={24} color="black" type="ant-design" />
        }
        containerStyle={{}}
        disabledInputStyle={{ background: "#ddd" }}
        inputContainerStyle={{}}
        errorStyle={{}}
        errorProps={{}}
        inputStyle={{}}
        label="Código de Barras"
        labelStyle={{}}
        labelProps={{}}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
      />
      <Input
        value={product.description}
        name="description"
        editable={isEditing}
        label="Descrição"
        leftIcon={<Icon name="text" size={24} color="black" type="entypo" />}
        onChangeText={(value) => {
          setProduct({
            ...product,
            ["description"]: value,
          });
        }}
      />
      <Input
        value={product.manufacturer}
        editable={isEditing}
        name="manufacturer"
        label="Fabricante"
        leftIcon={
          <Icon
            name="factory"
            size={24}
            color="black"
            type="material-community"
          />
        }
        onChangeText={(value) => {
          setProduct({
            ...product,
            ["manufacturer"]: value,
          });
        }}
      />
      <View
        style={{
          flexDirection: "column",

          flex: 1,
        }}
      >
        <Input
          value={product.unitValue}
          editable={true}
          name="unitValue"
          label="Valor Unitário"
          keyboardType="numeric"
          leftIcon={
            <Icon name="money" size={24} color="black" type="font-awesome" />
          }
          onChangeText={(value) => {
            setProduct({
              ...product,
              ["unitValue"]: parseFloat(value.replace(",", ".")),
            });
            calculateSubtotal(amountOfProduct);
          }}
        />
        <Input
          value={subtotal}
          editable={false}
          name="unitValue"
          label="Subtotal"
          keyboardType="numeric"
          leftIcon={
            <Icon name="money" size={24} color="black" type="font-awesome" />
          }
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginRight: 0,
          }}
        >
          <SimpleStepper
            valueChanged={(amountOfProduct) => {
              calculateSubtotal(amountOfProduct);
            }}
            initialValue={amountOfProduct}
            value={amountOfProduct}
            minimumValue={1}
            maximumValue={100}
            showText={true}
            containerStyle={{
              backgroundColor: "transparent",
              flexDirection: "row",
              borderWidth: 1,
              borderRadius: 8,
              overflow: "hidden",
              alignItems: "center",
              borderColor: "green",
            }}
            separatorStyle={{
              width: StyleSheet.hairlineWidth,
              backgroundColor: "green",
              height: "100%",
            }}
          ></SimpleStepper>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginBottom: 50,
        }}
      >
        <Button
          mode="contained"
          color="green"
          onPress={() => console.log("Pressed")}
        >
          Inserir
        </Button>
        <Button
          mode="outlined"
          color="black"
          onPress={() => console.log("Pressed")}
        >
          Cancelar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
