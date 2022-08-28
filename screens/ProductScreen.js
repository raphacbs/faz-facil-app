import React, { useEffect, useState } from "react";
import { BASE_URL, X_API_KEY } from "@env";
import { Toast } from "native-base";
import ProductComponent from "../components/ProductComponent";
import LoadingComponent from "../components/LoadingComponent";
import { CommonActions } from "@react-navigation/native";

export default function ProductScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [ean, setEan] = useState(route.params.ean);
  const [isFound, setIsFound] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [idShoppingCart, setIdShoppingCart] = useState(
    route.params.idShoppingCart
  );
  console.log(BASE_URL);

  const [product, setProduct] = useState({
    ean: "",
    description: "",
    unitValue: "0",
  });
  const [amountOfProduct, setAmountOfProduct] = useState(1);

  navigation.dispatch((state) => {
    const routes = state.routes.filter((r) => r.name !== "ReadBarCode");
    return CommonActions.reset({
      ...state,
      routes,
      index: routes.length - 1,
    });
  });
  useEffect(() => {
    handleProduct();
  }, [route.params.ean]);

  const handleProduct = async () => {
    try {
      const url = `${BASE_URL}/api/v1/products?ean=${ean}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-KEY": X_API_KEY,
        },
      });
      if (response.status == 200) {
        setIsFound(true);
        const json = await response.json();
        console.log(JSON.stringify(json));
        setProduct(json.products[0]);
        setEdit(false);
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

      const url = `${BASE_URL}/api/v1/shopping-carts/${idShoppingCart}/cart-item`;
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
          "X-API-KEY": X_API_KEY,
        },
        body: JSON.stringify(body),
      });
      if (response.status == 200) {
        const json = await response.json();
        navigation.pop(2);
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
        brand: product.brand.toUpperCase(),
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
          "X-API-KEY": X_API_KEY,
        },
      };

      const url = `${BASE_URL}/api/v1/products`;
      const response = await fetch(url, options);
      if (response.status == 201) {
        const productSaved = await response.json();
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
        brand: product.brand.toUpperCase(),
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
          "X-API-KEY": X_API_KEY,
        },
      };

      const url = `${BASE_URL}/api/v1/products`;
      const response = await fetch(url, options);
      if (response.status == 201) {
        const productSaved = await response.json();
        return productSaved.id;
      } else {
        return 0;
      }
    } catch (error) {
      console.log("erro", JSON.stringify(error));
      console.error(error);
    } finally {
    }
  };

  const handleChange = (evt, t) => {
    const value = evt.target.value;
    setProduct({
      ...product,
      [evt.target.name]: value,
    });
  };

  const calculateSubtotal = (number) => {
    setAmountOfProduct(number);
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
