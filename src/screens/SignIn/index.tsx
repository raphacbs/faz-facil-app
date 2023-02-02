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

const SignInScreen = (props: any) => {
  const { error } = props;
  const { t } = useTranslation();
  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();
  const inputPassword: any = useRef();
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const fieldValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required(`${t("form_messages.message_required")}`)
      .email(`${t("form_messages.email_message_validation")}`),
    password: yup.string().required(`${t("form_messages.message_required")}`),
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
    await signIn({ email: data.email, password: data.password });
    setLoading(false);
  };
  //@ts-ignore
  const goSignUpScreen = () => navigation.navigate("SignUp");

  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  return (
    <VStack
      paddingTop={12}
      paddingLeft={5}
      paddingRight={5}
      w={"100%"}
      h={"100%"}
      space={2}
      backgroundColor="theme.logo"
      justifyContent={"center"}
    >
      <Center bgColor={"theme.logo"}>
        <Image
          source={require("../../../assets/logo-signin-screen.png")}
          alt="logo image"
          size="2xl"
        />
      </Center>
      <Heading
        size="lg"
        marginLeft={"8%"}
        fontWeight="600"
        _dark={{
          color: "white",
        }}
      >
        {t("sing_in_screen.welcome")}
      </Heading>
      <Heading
        marginLeft={"8%"}
        mt="1"
        _dark={{
          color: "warmGray.200",
        }}
        fontWeight="medium"
        size="xs"
      >
        {t("sing_in_screen.sub_title")}
      </Heading>
      <Center>
        <FormControl
          isInvalid={errors?.email != undefined}
          w="100%"
          maxW="300px"
        >
          <FormControl.Label _text={{ color: "black" }}>
            {t("form_messages.label_email")}
          </FormControl.Label>
          <Input
            placeholder={`${t("form_messages.placeholder_email")}`}
            keyboardType="email-address"
            selectTextOnFocus={true}
            bgColor="white"
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
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.email?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={false} w="100%" maxW="300px">
          <FormControl.Label _text={{ color: "black" }}>
            {t("form_messages.label_password")}
          </FormControl.Label>
          <Input
            placeholder={`${t("form_messages.placeholder_password")}`}
            secureTextEntry={true}
            bgColor="white"
            onChangeText={(text) => {
              clearErrors("password");
              setValue("password", text);
              trigger("password");
              dispatch(clearError());
            }}
            ref={inputPassword}
            isDisabled={loading}
            onSubmitEditing={handleSubmit(onSubmit)}
          />
        </FormControl>
        <Button
          w={"50%"}
          onPress={handleSubmit(onSubmit)}
          bgColor={"green.500"}
          marginTop={5}
          isLoading={loading}
        >
          {t("sing_in_screen.label_sign_in")}
        </Button>
        <VStack space={2} mt="3" justifyContent="center">
          <Text
            fontSize="sm"
            color="black"
            _dark={{
              color: "warmGray.200",
            }}
          >
            {t("form_messages.label_new_user")}
          </Text>
          <Button
            size="sm"
            variant="solid"
            colorScheme="secondary"
            onPress={goSignUpScreen}
          >
            {t("sing_up_screen.label_sign_up")}
          </Button>
        </VStack>
        {error ? <Text color={"red.500"}>{t(error)}</Text> : null}
      </Center>
    </VStack>
  );
};

const mapStateToProps = (store: any) => ({
  error: store.commonReducer.error,
});

export default connect(mapStateToProps)(SignInScreen);
