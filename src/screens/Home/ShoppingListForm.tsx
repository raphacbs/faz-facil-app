import {
  Badge,
  Button,
  Center,
  FormControl,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
  WarningOutlineIcon,
} from "native-base";

import {
  useApp,
  useEffect,
  useForm,
  useNavigation,
  useRef,
  useTranslation,
} from "../../hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Container from "../../components/Container";

import { FontAwesome5 } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "react-query";
import { postOrPutShoppingList } from "../../providers/useShoppingList";
import { IShoppingListPutAndPost } from "../../@types/app";

const ShoppingListForm = ({ route }: any) => {
  const queryClient = useQueryClient();

  const { mutate: createShoppingList, isLoading } = useMutation({
    mutationFn: (changeShoppingList: IShoppingListPutAndPost) =>
      postOrPutShoppingList(changeShoppingList),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["shoppingLists"] });
      await queryClient.invalidateQueries({ queryKey: ["searchShoppingList"] });
      navigation.goBack();
    },
  });

  const { t } = useTranslation();
  const inputDescription: any = useRef();
  const { currentSupermarket, setSupermarket } = useApp();
  const navigation = useNavigation();
  const { shoppingList } = route.params
    ? route.params
    : { shoppingList: undefined };

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
    getValues,
  } = useForm({ resolver: yupResolver(fieldValidationSchema) });

  const save = async () => {};

  const onSubmit = async (data: any) => {
    const toSave: IShoppingListPutAndPost = {
      id: shoppingList ? shoppingList.id : undefined,
      description: data.description,
      //@ts-ignore
      supermarketId: supermarket?.id,
      status: shoppingList ? shoppingList.status : "IN_PLANNING",
    };
    createShoppingList(toSave);
  };

  useEffect(() => {
    register("description");
    register("supermarket");
  }, [register]);

  useEffect(() => {
    if (currentSupermarket) {
      setValue("supermarket", currentSupermarket.id);
    }
  }, [currentSupermarket]);

  useEffect(() => {
    if (shoppingList) {
      setValue("description", shoppingList.description);
      setValue("supermarket", shoppingList.supermarketId);
      //@ts-ignore
      setSupermarket({
        name: shoppingList.supermarketName,
        id: shoppingList.supermarketId,
      });
    } else {
      setValue("description", "");
      setValue("supermarket", "");
      setSupermarket(null);
    }
  }, []);

  return (
    <Container loading={isLoading} error={null} tryAgain={save}>
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
              }}
              onSubmitEditing={() => {
                //@ts-ignore
                navigation.navigate("SearchSupermarket");
              }}
              isDisabled={isLoading}
              // value={getValues("description")}
              defaultValue={shoppingList ? shoppingList.description : ""}
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
              {currentSupermarket ? (
                <Badge w={"85%"} variant={"solid"} colorScheme={"success"}>
                  <VStack justifyContent={"flex-start"}>
                    <Text color={"white"}>{currentSupermarket.name}</Text>
                    <Text color={"white"}>{currentSupermarket.suburb}</Text>
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
                  //@ts-ignore
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
            isLoading={isLoading}
          >
            {t("form_messages.label_create")}
          </Button>
        </Center>
      </VStack>
    </Container>
  );
};

export default ShoppingListForm;
