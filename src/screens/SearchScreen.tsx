import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";
import Form, { Field } from "../components/Form";
import { useDispatch } from "react-redux";
import BarcodeButton from "../components/BarcodeButton";
import { useNavigation } from "@react-navigation/native";
import Container from "../components/Container";
import { setSearchTerm } from "../store/actions/productActions";

const SearchScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const fields: Field[] = [
    {
      name: "search",
      label: "",
      rule: Yup.string().required(
        "Digite um código ou descrição do produto para pesquisar"
      ),
      placeholder: "descrição ou código do produto",
    },
  ];

  const [searchValue, setSearchValue] = useState("");
  const [doSearch, setDoSearch] = useState(false);

  // const {data, isLoading, isError, error} = useQuery(
  //   ['products', searchValue],
  //   () => searchProducts(searchValue),
  //   {
  //     enabled: searchValue != '',
  //   },
  // );

  const handleSubmit = (values: Record<string, string>) => {
    setSearchValue(values.search);
    dispatch(setSearchTerm(values.search));
    //@ts-ignore
    navigation.navigate("ProductListScreen", { searchTerm: values.search });
  };

  // useEffect(() => {
  //   data?.items && dispatch({type: 'SET_SEARCH_RESULTS', payload: data.items});
  // }, [data]);

  function handleBarcodePress(): void {
    //@ts-ignore
    navigation.navigate("BarCodeScannerScreen");
  }

  return (
    <Container
      isLogged={true}
      style={styles.container}
      isLoading={false}
      error={undefined}
    >
      <Text style={styles.label}>
        Digite o nome do produto ou código de barras
      </Text>
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        submitButtonTitle="Pesquisar"
        isLoading={false}
      />
      <Text style={styles.label}>Ou faça a leitura do código de barras</Text>
      <BarcodeButton onPress={handleBarcodePress} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
  label: {
    fontSize: 24,
    alignSelf: "center",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
  },
});

export default SearchScreen;
