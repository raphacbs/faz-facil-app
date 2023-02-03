import {
  Center,
  Heading,
  HStack,
  VStack,
  Switch,
  Text,
  TextArea,
  IconButton,
  Button,
  ScrollView,
  FormControl,
  WarningOutlineIcon,
} from "native-base";

import { AntDesign } from "@expo/vector-icons";
import { IItemPutAndPost } from "../../@types/item";
import {
  useApp,
  useEffect,
  useForm,
  useNavigation,
  useState,
  useTranslation,
} from "../../hooks";
import { getProductByCode } from "../../providers/useProduct";
import { formatCurrency } from "../../utils/generic";
import MaskInput, { Masks } from "react-native-mask-input";
import { useMutation, useQueryClient } from "react-query";
import { postOrPutItem } from "../../providers/useItemQuery";
import Container from "../../components/Container";
import ProductHistory from "../Product/ItemHistory";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const AddItemScreen = ({ route }: any) => {
  const navigation = useNavigation();
  const { currentShoppingList } = useApp();
  const { code, previousScreen } = route.params;
  const {
    data: product,
    isLoading,
    isSuccess,
  } = getProductByCode(code, code != null);

  const [item, setItem] = useState<IItemPutAndPost>({
    note: "",
    quantity: 1,
    price: 0,
    perUnit: 0,
    added: true,
    product: {
      code: code,
    },
    shoppingList: {
      id: currentShoppingList ? currentShoppingList?.id : "",
    },
  });
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const {
    mutate: addItem,
    isLoading: isLoadingAdd,
    error: errorAdd,
  } = useMutation({
    mutationFn: (changeItem: IItemPutAndPost) => postOrPutItem(changeItem),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["shoppingLists"] });
      await queryClient.invalidateQueries({ queryKey: ["searchShoppingList"] });
      await queryClient.invalidateQueries({ queryKey: ["shoppingListById"] });
      if (previousScreen == "scan") {
        //@ts-ignore
        navigation.pop(3);
      } else {
        //@ts-ignore
        navigation.pop(2);
      }
    },
  });

  const fieldValidationSchema = yup.object().shape({
    perUnit: yup
      .number()
      .required(`${t("form_messages.message_required")}`)
      .min(0.01, `${t("form_messages.min_value", { min: "0,01" })}`),
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

  useEffect(() => {
    register("perUnit");
  }, [register]);

  const onSubmit = () => {
    addItem({ ...item });
  };

  return (
    <Container loading={isLoadingAdd} error={errorAdd} tryAgain={() => {}}>
      <Center>
        {isSuccess && (
          <ScrollView>
            <VStack marginTop={2} marginLeft={2} marginRight={2} space={5}>
              <VStack space={2}>
                <Heading size={"sm"}>{product.items[0].description}</Heading>
                <Heading size={"xs"}>{product.items[0].brand}</Heading>
                <Text>{product.items[0].code}</Text>
              </VStack>
              <HStack>
                <VStack w={"98%"}>
                  <Heading size={"xs"}>{t("form_messages.label_note")}</Heading>
                  <TextArea
                    autoCompleteType={false}
                    value={item.note}
                    onChangeText={(text) => {
                      setItem({ ...item, note: text });
                    }}
                  />
                </VStack>
              </HStack>

              <HStack justifyContent={"space-between"}>
                <VStack alignItems={"flex-start"}>
                  <Heading size={"xs"}>
                    {t("form_messages.label_is_added")}
                  </Heading>
                  <Switch
                    value={item.added}
                    onValueChange={(value) => {
                      setItem({ ...item, added: value });
                    }}
                  />
                </VStack>
                <VStack alignItems={"center"}>
                  <Heading size={"xs"}>
                    {t("form_messages.label_quantity")}
                  </Heading>
                  <HStack space={2} justifyContent={"center"}>
                    <IconButton
                      size={"sm"}
                      variant="ghost"
                      _icon={{
                        as: AntDesign,
                        name: "minussquare",
                        color: "red.600",
                      }}
                      isDisabled={isLoading}
                      onPress={() => {
                        if (item.quantity > 0) {
                          const price = (
                            (item.quantity - 1) *
                            item.perUnit
                          ).toFixed(2);
                          setItem({
                            ...item,
                            quantity: item.quantity - 1,
                            price: parseFloat(price),
                          });
                        }
                      }}
                    />

                    <Heading marginTop={1} onPress={() => {}} size={"sm"}>
                      {item.quantity}
                    </Heading>

                    <IconButton
                      size={"sm"}
                      variant="ghost"
                      _icon={{
                        as: AntDesign,
                        name: "plussquare",
                        color: "green.600",
                      }}
                      isDisabled={isLoading}
                      onPress={() => {
                        const price = (
                          (item.quantity + 1) *
                          item.perUnit
                        ).toFixed(2);
                        setItem({
                          ...item,
                          quantity: item.quantity + 1,
                          price: parseFloat(price),
                        });
                      }}
                    />
                  </HStack>
                </VStack>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Heading size={"sm"}>{t("form_messages.label_total")}</Heading>
                <Heading size={"sm"}>{formatCurrency(item.price)}</Heading>
              </HStack>
              <HStack justifyContent={"center"}>
                <FormControl
                  alignItems={"center"}
                  isInvalid={errors?.perUnit != undefined}
                  w="100%"
                  maxW="300px"
                >
                  <MaskInput
                    autoFocus
                    value={formatCurrency(item.perUnit)}
                    onChangeText={(masked: any, unmasked: any) => {
                      let newValue = (parseFloat(unmasked) * 0.01).toFixed(2);
                      let price = (
                        parseFloat(newValue) * item.quantity
                      ).toFixed(2);
                      setValue("perUnit", parseFloat(newValue));
                      setItem({
                        ...item,
                        perUnit: parseFloat(newValue),
                        price: parseFloat(price),
                      });
                    }}
                    keyboardType="numeric"
                    mask={Masks.BRL_CURRENCY}
                    onSubmitEditing={() => {}}
                    style={{
                      fontSize: 50,
                    }}
                  />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    {errors.perUnit?.message}
                  </FormControl.ErrorMessage>
                </FormControl>
              </HStack>

              <HStack justifyContent={"center"}>
                <ProductHistory product={product.items[0]} />
              </HStack>

              <HStack justifyContent={"center"}>
                <Button
                  rounded={20}
                  w={"50%"}
                  isLoading={isLoadingAdd}
                  size={"lg"}
                  marginBottom={20}
                  onPress={handleSubmit(onSubmit)}
                >
                  {t("scan.button_add_item")}
                </Button>
              </HStack>
            </VStack>
          </ScrollView>
        )}
      </Center>
    </Container>
  );
};

export default AddItemScreen;
