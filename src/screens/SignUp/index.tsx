import React from "react";
import {
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Text,
  Input,
  VStack,
  Link,
  WarningOutlineIcon,
  Image,
} from "native-base";
import { connect } from "react-redux";
import {
  useTranslation,
  useEffect,
  useDispatch,
  useToast,
  useForm,
  useRef,
  useNavigation,
  useState,
  useAuth,
} from "../../hooks";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { clearError } from "../../store/actions/commonAction";

const SignUpScreen = (props: any) => {
  const { error } = props;
  const navigation = useNavigation();
  const { t } = useTranslation();
  const toast = useToast();
  const dispatch = useDispatch();
  const inputFirstName: any = useRef();
  const inputLastName: any = useRef();
  const inputEmail: any = useRef();
  const inputPassword: any = useRef();
  const inputPasswordConfirm: any = useRef();
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const fieldValidationSchema = yup.object().shape({
    firstName: yup
      .string()
      .trim()
      .matches(/^[a-zA-ZÀ-ÿ]+$/, t("form_messages.message_no_compost_name"))
      .required(t("form_messages.message_required"))
      .min(3, t("form_messages.message_size_min", { min: "3" })),
    lastName: yup
      .string()
      .trim()
      .matches(/^[a-zA-ZÀ-ÿ]+$/, t("form_messages.message_no_compost_name"))
      .required(t("form_messages.message_required"))
      .min(3, t("form_messages.message_size_min", { min: "3" })),
    email: yup
      .string()
      .trim()
      .required(t("form_messages.message_required"))
      .transform(function (value, originalvalue) {
        return this.isType(value) && value !== null
          ? value.toLowerCase()
          : value;
      })
      .email(t("form_messages.email_message_validation")),
    password: yup
      .string()
      .trim()
      .required(t("form_messages.message_required"))
      .min(6, t("form_messages.message_size_min", { min: "6" })),
    passwordConfirm: yup
      .string()
      .trim()
      .required(t("form_messages.message_required"))
      .min(6, t("form_messages.message_size_min", { min: "6" }))
      .oneOf([yup.ref("password")], t("form_messages.message_password_match")),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
    trigger,
  } = useForm({ resolver: yupResolver(fieldValidationSchema) });

  const onSubmit = async (data: any) => {
    setLoading(true);
    await signUp({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    });
    setLoading(false);
  };

  useEffect(() => {
    register("firstName");
    register("lastName");
    register("email");
    register("password");
    register("passwordConfirm");
  }, [register]);

  return (
    <VStack
      paddingLeft={5}
      paddingRight={5}
      paddingTop={10}
      w={"100%"}
      h={"100%"}
      space={2}
      backgroundColor="theme.logo"
    >
      <Center>
        <FormControl
          isInvalid={errors?.firstName != undefined}
          w="100%"
          maxW="300px"
        >
          <FormControl.Label _text={{ color: "black" }}>
            {t("form_messages.label_first_name")}
          </FormControl.Label>
          <Input
            selectTextOnFocus={true}
            bgColor="white"
            _focus={{
              selectionColor: "green",
            }}
            placeholder={t("form_messages.placeholder_first_name")}
            onChangeText={(text) => {
              clearErrors("firstName");
              setValue("firstName", text);
              trigger("firstName");
              dispatch(clearError());
            }}
            onSubmitEditing={() => {
              inputLastName.current.focus();
            }}
            isDisabled={loading}
            ref={inputFirstName}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.firstName?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={errors?.lastName != undefined}
          w="100%"
          maxW="300px"
        >
          <FormControl.Label _text={{ color: "black" }}>
            {t("form_messages.label_last_name")}
          </FormControl.Label>
          <Input
            selectTextOnFocus={true}
            bgColor="white"
            _focus={{
              selectionColor: "green",
            }}
            placeholder={t("form_messages.placeholder_last_name")}
            onChangeText={(text) => {
              clearErrors("lastName");
              setValue("lastName", text);
              trigger("lastName");
              dispatch(clearError());
            }}
            onSubmitEditing={() => {
              inputEmail.current.focus();
            }}
            isDisabled={loading}
            ref={inputLastName}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.lastName?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={errors?.email != undefined}
          w="100%"
          maxW="300px"
        >
          <FormControl.Label _text={{ color: "black" }}>
            {t("form_messages.label_email")}
          </FormControl.Label>
          <Input
            placeholder={t("form_messages.placeholder_email")}
            keyboardType="email-address"
            selectTextOnFocus={true}
            bgColor="white"
            _focus={{
              selectionColor: "green",
            }}
            onChangeText={(text) => {
              clearErrors("email");
              setValue("email", text);
              trigger("email");
              dispatch(clearError());
            }}
            onSubmitEditing={() => {
              inputPassword.current.focus();
            }}
            isDisabled={loading}
            ref={inputEmail}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.email?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={errors?.password != undefined}
          w="100%"
          maxW="300px"
        >
          <FormControl.Label _text={{ color: "black" }}>
            {t("form_messages.label_password")}
          </FormControl.Label>
          <Input
            placeholder={t("form_messages.placeholder_password")}
            secureTextEntry={true}
            bgColor="white"
            _focus={{
              selectionColor: "green",
            }}
            onChangeText={(text) => {
              clearErrors("password");
              setValue("password", text);
              trigger("password");
              dispatch(clearError());
            }}
            ref={inputPassword}
            isDisabled={loading}
            onSubmitEditing={() => {
              inputPasswordConfirm.current.focus();
            }}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.password?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={errors?.passwordConfirm != undefined}
          w="100%"
          maxW="300px"
        >
          <FormControl.Label _text={{ color: "black" }}>
            {t("form_messages.label_password_confirm")}
          </FormControl.Label>
          <Input
            placeholder={t("form_messages.placeholder_password")}
            secureTextEntry={true}
            bgColor="white"
            _focus={{
              selectionColor: "green",
            }}
            onChangeText={(text) => {
              clearErrors("passwordConfirm");
              setValue("passwordConfirm", text);
              trigger("passwordConfirm");
              dispatch(clearError());
            }}
            ref={inputPasswordConfirm}
            isDisabled={loading}
            onSubmitEditing={handleSubmit(onSubmit)}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.passwordConfirm?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <Button
          w={"50%"}
          onPress={handleSubmit(onSubmit)}
          bgColor={"green.500"}
          marginTop={5}
          isLoading={loading}
        >
          {t("sing_up_screen.label_sign_up")}
        </Button>
        {error ? <Text color={"red.500"}>{t(error)}</Text> : null}
      </Center>
    </VStack>
  );
};

const mapStateToProps = (store: any) => ({
  isSignedIn: store.commonReducer.isSignedIn,
  error: store.commonReducer.error,
});

export default connect(mapStateToProps)(SignUpScreen);
