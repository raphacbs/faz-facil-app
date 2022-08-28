import React, { useEffect, useState, useRef } from "react";
import { BASE_URL, X_API_KEY } from "@env";
import { Input, AlertDialog, Button, Text, Center, Heading } from "native-base";

import { Masks, useMaskedInputProps } from "react-native-mask-input";
import NumericInput from "react-native-numeric-input";
import LoadingComponent from "./LoadingComponent";

const ModalAddProductComponent = (props) => {
  const { product } = props;
  const { shoppingCartId } = props;
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [subtotal, setSubtotal] = useState("R$ 0,00");
  const [price, setPrice] = useState("");
  const [amountOfProduct, setAmountOfProduct] = useState(1);
  const [isLoading, setLoading] = useState(false);
  console.log(BASE_URL);

  useEffect(() => {
    handleSubtotal(amountOfProduct);
  }, [price]);

  const unitValueMaskedInputProps = useMaskedInputProps({
    value: price,
    onChangeText: (text) => {
      setPrice(text);
    },
    mask: Masks.BRL_CURRENCY,
  });

  const handleSubtotal = (count) => {
    setAmountOfProduct(count);
    let unitValue = 0;

    console.log(price);
    if (price != undefined) {
      unitValue = parseFloat(price.replace(",", ".").replace("R$", "").trim());
      if (!isNaN(unitValue)) {
        setSubtotal(
          (unitValue * count).toFixed(2).toString().replace(".", ",")
        );
      } else {
        setSubtotal("R$ 0,00");
      }
    }
  };

  const onClose = () => {
    setAmountOfProduct(1);
    setPrice("");
    if (props.onClose != undefined) {
      props.onClose();
    } else {
      console.log("onClose not implemented");
    }
  };

  const onPressAdd = async () => {
    try {
      setLoading(true);
      const url = `${BASE_URL}/api/v1/shopping-carts/${shoppingCartId}/cart-item`;
      const body = {
        productId: product.id,
        unitValue: price.replace("R$ ", ""),
        amountOfProduct: amountOfProduct,
        image: product.image,
      };

      console.log(url);
      console.log(body);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": X_API_KEY,
        },
        body: JSON.stringify(body),
      });
      if (response.status == 200) {
        const json = await response.json();
        setLoading(false);
        if (props.onPressAdd != undefined) {
          props.onPressAdd();
        } else {
          console.log("onPressAdd not implemented");
        }
      } else {
        console.log("Produto não inserido!");
      }
    } catch (error) {
      console.error("ocorreu um erro");
      console.error(error);
    } finally {
    }
  };

  return (
    <LoadingComponent visible={isLoading}>
      <AlertDialog
        isOpen={props.visible}
        onClose={onClose}
        avoidKeyboard
        justifyContent="center"
        bottom="4"
        size="lg"
        safeAreaTop={true}
        {...props.style}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>
            {product.description}
            <Text>{product.brand}</Text>
            <Text>{product.ean}</Text>
          </AlertDialog.Header>
          <AlertDialog.Body>
            <Center>
              <NumericInput
                value={amountOfProduct}
                onChange={handleSubtotal}
                rounded
              />
              <Input
                autoFocus={true}
                fontSize={"2xl"}
                ref={initialRef}
                size="2xl"
                flex={1}
                {...unitValueMaskedInputProps}
                w={{
                  base: "100%",
                  md: "25%",
                }}
                variant="underlined"
                defaultValue="01"
                // onEndEditing={onEndEditing}
                placeholder="Valor Unitário"
                keyboardType="numeric"
              />
              <Heading alignSelf={"flex-end"} size="md">
                Total: {subtotal}
              </Heading>
              <Text alignSelf={"flex-start"} italic>
                <Text bold>Último preço: </Text> R$ 200,00
              </Text>
              <Text alignSelf={"flex-start"} italic>
                <Text bold>Média 3 meses: </Text> R$ 200,00
              </Text>
            </Center>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
                Cancelar
              </Button>
              <Button onPress={onPressAdd}>Salvar</Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </LoadingComponent>
  );
};

export default ModalAddProductComponent;
