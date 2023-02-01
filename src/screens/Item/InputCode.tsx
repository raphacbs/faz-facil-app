import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  Input,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import * as yup from "yup";
import { useEffect, useForm, useTranslation } from "../../hooks";

type Props = {
  onPress: (data: string) => void;
};

const InputCode: React.FC<Props> = ({ onPress }) => {
  const { t } = useTranslation();

  const fieldValidationSchema = yup.object().shape({
    code: yup
      .string()
      .trim()
      .required(`${t("form_messages.message_required")}`)
      .min(3, `${t("form_messages.message_size_min", { min: "3" })}`),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
    trigger,
    getValues,
  } = useForm({ resolver: yupResolver(fieldValidationSchema) });

  const onSubmit = async (data: any) => {
    onPress(data.code);
  };

  return (
    <VStack>
      <FormControl isInvalid={errors?.code != undefined} w="100%">
        <FormControl.Label _text={{ color: "black" }}>
          {t("form_messages.label_code")}
        </FormControl.Label>
        <Input
          autoFocus
          bgColor="white"
          _focus={{
            selectionColor: "green",
          }}
          keyboardType="numeric"
          placeholder={`${t("form_messages.placeholder_code")}`}
          onChangeText={(text) => {
            clearErrors("code");
            setValue("code", text);
            trigger("code");
          }}
          onSubmitEditing={() => {}}
          // value={getValues("description")}
          defaultValue={""}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errors.code?.message}
        </FormControl.ErrorMessage>
        <Button
          marginTop={5}
          rounded={20}
          colorScheme="blue"
          onPress={handleSubmit(onSubmit)}
        >
          {t("form_messages.label_search")}
        </Button>
      </FormControl>
    </VStack>
  );
};

export default InputCode;
