import React, { useEffect, useState } from "react";
import { BASE_URL_DEV, BASE_URL_PRD, BASE_URL_LOCAL } from "@env";
import { Center, NativeBaseProvider, Toast } from "native-base";
import ProductComponent from "../components/ProductComponent";

export default function ProductScreen({ route, navigation }) {
  const [ean, setEan] = useState(route.params.ean);
  const [isFound, setIsFound] = useState(false);
  const [idShoppingCart, setIdShoppingCart] = useState(
    route.params.idShoppingCart
  );

  const [product, setProduct] = useState({
    ean: "",
    description: "",
    unitValue: "0",
  });
  const [amountOfProduct, setAmountOfProduct] = useState(1);

  useEffect(() => {
    handleProduct();
  }, [route.params.ean]);

  const handleProduct = async () => {
    try {
      console.log("ean= " + ean);
      console.log("route.params.ean= ", route.params.ean);
      const url = `${BASE_URL_DEV}/api/v1/products?ean=${ean}`;
      const response = await fetch(url);
      if (response.status == 200) {
        setIsFound(true);
        const json = await response.json();
        setProduct(json);
        console.log(product);
      } else {
        setProduct({ ...product, ["ean"]: ean });

        Toast.show({
          title: "Produto não cadastrado na base! Insira os dados!",
          backgroundColor: "yellow.500",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const insertProduct = async (product) => {
    try {
      if (!isFound) {
        product.id = await registeProduct(product);
      }
      const url = `${BASE_URL_DEV}/api/v1/shopping-carts/${idShoppingCart}/products`;
      const body = {
        productId: product.id,
        unitValue: product.unitValue,
        amountOfProduct: product.amountOfProduct,
        image: product.image,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.status == 200) {
        const json = await response.json();
        console.log(json);
        navigation.goBack();
      } else {
        console.log("Produto não inserido!");
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const registeProduct = async (product) => {
    try {
      console.log("entrou", JSON.stringify(product));
      const url = `${BASE_URL_DEV}/api/v1/products`;
      const body = {
        description: product.description.toUpperCase(),
        manufacturer: product.manufacturer.toUpperCase(),
        image:
          "https://drive.google.com/uc?id=1w361FjVApKKJn6g8H5NVZ3IVbL-fSpo4",
        ean: product.ean,
      };
      console.log("body", JSON.stringify(body));
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.status == 200) {
        const productSaved = await response.json();
        console.log("salvou", JSON.stringify(productSaved));
        return productSaved.id;
      } else {
        console.log(JSON.stringify(response));
        console.log("Produto não registrado!");
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
    setSubtotal((number * product.unitValue).toFixed(2).replace(".", ","));
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3" py="10">
        <ProductComponent
          isEditing={isFound}
          product={product}
          onInsert={insertProduct}
        ></ProductComponent>
      </Center>
    </NativeBaseProvider>
  );
}
