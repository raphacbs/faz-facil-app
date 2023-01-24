import {
  Badge,
  Box,
  Button,
  Center,
  CheckIcon,
  FormControl,
  HStack,
  IconButton,
  Input,
  Select,
  Text,
  VStack,
  WarningOutlineIcon,
} from "native-base";

import {
  useEffect,
  useForm,
  useNavigation,
  useRef,
  useShoppingList,
  useState,
  useSupermarket,
  useTranslation,
} from "../../hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Container from "../../components/Container";

import {
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  Zocial,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const ShoppingListForm = () => {
  const { t } = useTranslation();

  const inputDescription: any = useRef();
  const selectSupermarket: any = useRef();
  const {
    loading,
    add,
    error,
    get,
    params,
    shoppingList,
    update,
    _setShoppingList,
  } = useShoppingList();

  const { supermarket, updateSupermarket } = useSupermarket();
  const navigation = useNavigation();
  const [_shoppingList, setShoppingList] = useState(
    shoppingList
      ? shoppingList
      : { description: "", supermarketId: "", id: null, status: "IN_PLANNING" }
  );

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
        get({ ...params, pageNo: 1 });
        updateSupermarket(null);
        _setShoppingList(null);
        navigation.dispatch(e.data.action);
      }),
    [navigation]
  );

  const fieldValidationSchema = yup.object().shape({
    description: yup
      .string()
      .trim()
      .required(`${t("form_messages.message_required")}`)
      .min(3, `${t("form_messages.message_size_min", { min: "3" })}`),
    supermarket: yup
      .string()
      .required(`${t("form_messages.message_required")}`),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
    trigger,
  } = useForm({ resolver: yupResolver(fieldValidationSchema) });

  const save = async () => {
    if (_shoppingList.id) {
      await update({ ..._shoppingList });
    } else {
      await add({
        ..._shoppingList,
      });
    }

    if (error == null) {
      await get({ ...params, pageNo: 1 });
      navigation.navigate("Home");
    }
  };

  const onSubmit = async (data: any) => {
    setShoppingList({ ...shoppingList, description: data.description });
    save();
  };

  useEffect(() => {
    register("description");
    register("supermarket");
  }, [register]);

  useEffect(() => {
    if (shoppingList) {
      setValue("description", shoppingList.description);
      setValue("supermarket", shoppingList.supermarketId);

      updateSupermarket({
        id: shoppingList.supermarketId,
        name: shoppingList.supermarketName,
        country: "",
        region: "",
        state: "",
        stateCode: "",
        city: "",
        municipality: "",
        postcode: "",
        district: "",
        neighbourhood: "",
        suburb: "",
        street: "",
        longitude: 0,
        latitude: 0,
        address: "",
        placeId: "",
        distance: 0,
      });
    } else {
      setValue("description", "");
      setValue("supermarket", "");
      updateSupermarket(null);
    }
  }, []);

  useEffect(() => {
    if (
      supermarket != null &&
      JSON.stringify(supermarket) !== JSON.stringify({})
    ) {
      setValue("supermarket", supermarket.id);
      trigger("supermarket");
      _shoppingList.supermarketId = supermarket.id;
    } else {
      setValue("supermarket", "");
      _shoppingList.supermarketId = "";
    }
  }, [supermarket]);

  return (
    <Container loading={loading} error={error} tryAgain={save}>
      <VStack
        paddingLeft={5}
        paddingRight={5}
        paddingTop={10}
        w={"100%"}
        h={"100%"}
        space={2}
        backgroundColor="theme.logo"
        justifyContent={"space-around"}
      >
        <Center>
          <FormControl
            isInvalid={errors?.description != undefined}
            w="100%"
            maxW="300px"
          >
            <FormControl.Label _text={{ color: "black" }}>
              {t("form_messages.label_description")}
            </FormControl.Label>
            <Input
              autoFocus
              bgColor="white"
              _focus={{
                selectionColor: "green",
              }}
              placeholder={`${t("form_messages.placeholder_description")}`}
              ref={inputDescription}
              onChangeText={(text) => {
                clearErrors("description");
                setValue("description", text);
                trigger("description");
                setShoppingList({ ..._shoppingList, description: text });
              }}
              onSubmitEditing={() => {
                selectSupermarket.current.focus();
              }}
              isDisabled={loading}
              value={_shoppingList.description}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errors.description?.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={errors?.supermarket != undefined}
            w="100%"
            maxW="300px"
          >
            <FormControl.Label _text={{ color: "black" }}>
              {t("form_messages.label_supermarket")}
            </FormControl.Label>
            <HStack
              rounded={3}
              justifyContent="space-between"
              bgColor={"white"}
              h={"35%"}
            >
              {supermarket ? (
                <Badge w={"85%"} variant={"solid"} colorScheme={"success"}>
                  <VStack justifyContent={"flex-start"}>
                    <Text color={"white"}>{supermarket.name}</Text>
                    <Text color={"white"}>{supermarket.suburb}</Text>
                  </VStack>
                </Badge>
              ) : (
                <Badge w={"85%"} variant={"outline"}>
                  <VStack justifyContent={"flex-start"}></VStack>
                </Badge>
              )}
              <IconButton
                size={"md"}
                variant="ghost"
                alignSelf={"center"}
                onPress={() => {
                  navigation.navigate("SearchSupermarket");
                }}
                _icon={{
                  as: FontAwesome5,
                  name: "search-plus",
                  color: "green",
                }}
              />
            </HStack>

            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errors.supermarket?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        </Center>
        <Center>
          <Button
            w={"50%"}
            onPress={handleSubmit(onSubmit)}
            bgColor={"green.500"}
            marginTop={5}
            isLoading={loading}
          >
            {t("form_messages.label_create")}
          </Button>
        </Center>
      </VStack>
    </Container>
  );
};

export default ShoppingListForm;
