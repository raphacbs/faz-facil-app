import React, { useRef, useState } from "react";
import { View, Button, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Yup from "yup";
import { myTheme } from "../theme/theme";
import { useSelector } from "react-redux";
import PriceItem from "./PriceItem";
import { Item, ItemNewProductPost, ItemPost } from "../types/Item";
// import {useTheme} from '../../hooks';
export type Field = {
  name: string;
  label: string;
  rule: Yup.Schema<string>;
  placeholder?: string;
  secureTextEntry?: boolean;
  defaultValue?: string;
  isUpperCase?: boolean;
  autoFocus?: boolean;
};

type FormProps = {
  onSubmit: (item: ItemNewProductPost) => void;
  submitButtonTitle: string;
  isLoading: boolean;
};

const FormRegisterProduct = ({
  onSubmit,
  submitButtonTitle,
  isLoading,
}: FormProps) => {
  //@ts-ignore
  const code = useSelector((state) => state.product.codeSearched);
  //@ts-ignore
  const shoppingList = useSelector(
    //@ts-ignore
    (state) => state.shoppingList.selectedShoppingList
  );
  //@ts-ignore
  const units = useSelector((state) => state.unit.units);

  const [isEnableSubmit, setIsEnableSubmit] = useState<boolean>(false);

  const [localItem, setLocalItem] = useState<Item>({
    added: true,
    perUnit: 0.0,
    shoppingList: shoppingList,
    createdAt: "",
    id: "",
    note: "",
    price: 0.0,
    product: {
      code: "",
      description: "",
      brand: "",
      createdAt: "",
      updateAt: "",
    },
    quantity: 1,
    unit: units[0],
    updatedAt: "",
  });

  const fields: Field[] = [
    {
      name: "productCode",
      label: "Código",
      rule: Yup.string().required("Informe o código do produto"),
      placeholder: "",
      defaultValue: code,
    },
    {
      name: "productDescription",
      label: "Descrição",
      rule: Yup.string().required("Informe a descrição do produto"),
      placeholder: "BISCOITO AMANTEIGADO PACOTE 100G",
      isUpperCase: true,
      autoFocus: true,
    },
    {
      name: "productBrand",
      label: "Marca/Fabricante",
      rule: Yup.string().required("Informe a marca do produto"),
      placeholder: "VITARELLA",
      isUpperCase: true,
    },
  ];

  const [values, setValues] = useState<Record<string, string>>(
    fields.reduce((obj, field) => {
      obj[field.name] = field.defaultValue || "";
      return obj;
    }, {} as Record<string, string>)
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  //@ts-ignore
  const inputRefs = useRef<Array<Input | null>>([]);

  const handleChange = async (name: string, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await Yup.object()
        .shape(
          fields.reduce((obj: { [key: string]: any }, field) => {
            obj[field.name] = field.rule;
            return obj;
          }, {})
        )
        .validate(values, { abortEarly: false });

      if (isEnableSubmit) {
        const item: ItemNewProductPost = {
          note: "",
          quantity: localItem.quantity,
          price: localItem.price,
          perUnit: localItem.perUnit,
          added: true,
          product: {
            code: values.productCode,
            description: values.productDescription,
            brand: values.productBrand,
          },
          shoppingList: {
            id: localItem.shoppingList.id,
          },
          unit: {
            id: localItem.unit.id,
          },
        };
        onSubmit(item);
      }
      setErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        err.inner.forEach((error: Yup.ValidationError) => {
          validationErrors[error.path as string] = error.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  const handleFocusNextInput = (index: number) => {
    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    } else {
      handleSubmit();
    }
  };

  return (
    <View style={styles.container}>
      {fields.map((field, index) => (
        <Input
          key={field.name}
          label={field.label}
          value={values[field.name]}
          onChangeText={(value) => handleChange(field.name, value)}
          errorMessage={errors[field.name]}
          placeholder={field.placeholder ? field.placeholder : ""}
          secureTextEntry={field.secureTextEntry}
          disabled={isLoading}
          autoFocus={field.autoFocus}
          onSubmitEditing={() => handleFocusNextInput(index)}
          autoCapitalize={field.isUpperCase ? "characters" : "none"}
          ref={(ref) => (inputRefs.current[index] = ref)}
        />
      ))}
      <PriceItem
        style={{ marginTop: 10, marginBottom: 10 }}
        item={localItem}
        onChange={(item) => {
          setLocalItem(item);
          setIsEnableSubmit(item.perUnit > 0);
        }}
      />
      <TouchableOpacity
        disabled={isLoading || !isEnableSubmit}
        style={[
          styles.button,
          (isLoading || !isEnableSubmit) && {
            backgroundColor: myTheme.colors.secondary,
          },
        ]}
        onPress={handleSubmit}
      >
        <Text style={styles.textButton}>{submitButtonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormRegisterProduct;

const styles = StyleSheet.create({
  button: {
    backgroundColor: myTheme.colors.primary,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  textButton: {
    color: myTheme.colors.light,
    justifyContent: "center",
    alignSelf: "center",
  },
  container: {
    justifyContent: "space-between",
    alignContent: "space-between",
  },
});
