import React, { useEffect, useState } from "react";
import { BASE_URL_DEV, BASE_URL_PRD, BASE_URL_LOCAL } from "@env";
import { Center, NativeBaseProvider, VStack, Toast, Icon } from "native-base";
import ProductComponent from "../components/ProductComponent";
import LoadingComponent from "../components/LoadingComponent";
import { FontAwesome } from "@expo/vector-icons";

export default function ProductScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [ean, setEan] = useState(route.params.ean);
  const [isFound, setIsFound] = useState(false);
  const [isEdit, setEdit] = useState(false);
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
        setEdit(false);
        console.log(product);
      } else {
        setProduct({ ...product, ["ean"]: ean });
        setEdit(true);
        Toast.show({
          title: "Produto não cadastrado na base. Insira os dados!",
          backgroundColor: "blue.500",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const insertProduct = async (product, isEditing) => {
    try {
      setLoading(true);
      if (!isFound) {
        product.id = await registeProduct(product);
        if (product.id == 0) {
          return;
        }
      }

      if (isEditing) {
        let isUpdated = await updateProduct(product);
        if (!isUpdated) {
          return;
        }
      }

      const url = `${BASE_URL_DEV}/api/v1/shopping-carts/${idShoppingCart}/cart-item`;
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
      console.error("ocorreu um erro");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (product) => {
    try {
      const body = {
        description: product.description.toUpperCase(),
        manufacturer: product.manufacturer.toUpperCase(),
        image: product.image,
        ean: product.ean,
        id: product.id,
        createAt: null,
        updateAt: null,
      };

      const formData = new FormData();
      if (product.image == undefined || product.image.includes("http")) {
        Toast.show({
          title: "Selecione, capture uma imagem ou desabilite o modo edição",
          backgroundColor: "blue.500",
        });
        return 0;
      }
      let uriParts = product.image.split(".");
      let fileType = uriParts[uriParts.length - 1];

      formData.append("photo", {
        uri: product.image,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });

      formData.append("product", JSON.stringify(body));

      let options = {
        method: "PUT",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };

      console.log("formData", formData);
      const url = `http://192.168.1.13:8081/api/v1/products`;
      console.log("url", url);
      const response = await fetch(url, options);
      console.log("url", response);
      if (response.status == 201) {
        const productSaved = await response.json();
        console.log("salvou", JSON.stringify(productSaved));
        return productSaved.id;
      } else {
        console.log(JSON.stringify(response));
        console.log("Produto não registrado!");
        return 0;
      }
    } catch (error) {
      console.log("erro", JSON.stringify(error));
      console.error(error);
    } finally {
    }
  };

  const registeProduct = async (product) => {
    try {
      const body = {
        description: product.description.toUpperCase(),
        manufacturer: product.manufacturer.toUpperCase(),
        image: product.image,
        ean: product.ean,
      };

      const formData = new FormData();
      if (
        product.image == undefined ||
        (!product.image.includes(".jpeg") &&
          !product.image.includes(".jpg") &&
          !product.image.includes(".png"))
      ) {
        Toast.show({
          title: "Selecione ou capture uma imagem! ",
          backgroundColor: "blue.500",
        });
        return 0;
      }
      let uriParts = product.image.split(".");
      let fileType = uriParts[uriParts.length - 1];

      formData.append("photo", {
        uri: product.image,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });

      formData.append("data", JSON.stringify(product));

      let options = {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };

      console.log("formData", formData);
      const url = `http://192.168.1.13:8081/api/v1/products`;
      console.log("url", url);
      const response = await fetch(url, options);
      console.log("url", response);
      if (response.status == 201) {
        const productSaved = await response.json();
        console.log("salvou", JSON.stringify(productSaved));
        return productSaved.id;
      } else {
        console.log(JSON.stringify(response));
        console.log("Produto não registrado!");
        return 0;
      }
    } catch (error) {
      console.log("erro", JSON.stringify(error));
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
    <LoadingComponent visible={isLoading}>
      <ProductComponent
        isEditing={isEdit}
        product={product}
        onInsert={insertProduct}
      ></ProductComponent>
    </LoadingComponent>
  );
}
