import React, { useRef, useState } from "react";
import { View, Button, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Yup from "yup";
import { myTheme } from "../theme/theme";
// import {useTheme} from '../../hooks';
export type Field = {
  name: string;
  label: string;
  rule: Yup.Schema<string>;
  placeholder?: string;
  secureTextEntry?: boolean;
};

type FormProps = {
  fields: Field[];
  onSubmit: (values: Record<string, string>) => void;
  submitButtonTitle: string;
  isLoading: boolean;
};

const Form = ({
  fields,
  onSubmit,
  submitButtonTitle,
  isLoading,
}: FormProps) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  //@ts-ignore
  const inputRefs = useRef<Array<Input | null>>([]);

  const handleChange = (name: string, value: string) => {
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

      onSubmit(values);
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
    <View>
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
          onSubmitEditing={() => handleFocusNextInput(index)}
          ref={(ref) => (inputRefs.current[index] = ref)}
        />
      ))}
      {/* <Button
        disabled={isLoading}
        title={submitButtonTitle}
        onPress={handleSubmit}
        color={useTheme.colors.primary}
      /> */}
      <TouchableOpacity
        disabled={isLoading}
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.textButton}>{submitButtonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  button: {
    backgroundColor: myTheme.colors.primary,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  textButton: {
    color: myTheme.colors.light,
    justifyContent: "center",
    alignSelf: "center",
  },
});
