import React from "react";
import {
  VStack,
  HStack,
  Stack,
  Icon,
  Fab,
  Box,
  Center,
  Heading,
  FormControl,
  Input,
  WarningOutlineIcon,
  ScrollView,
  Button,
} from "native-base";
import { connect } from "react-redux";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import {
  getAll,
  postShoppingList,
  putShoppingList,
  setShoppingList,
} from "../../store/actions/shoppingListAction";
import Container from "../../components/Container";
import { setLoading } from "../../store/actions/commonAction";

const ShoppingListScreen = (props: any) => {
  const { shoppingList, navigation, loading } = props;
  const inputSupermarket: any = React.useRef();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (shoppingList.id == "") {
      navigation.setOptions({ title: "Cria lista" });
    } else {
      navigation.setOptions({ title: "Edita lista" });
    }
    dispatch(setLoading(false));
  }, []);

  React.useEffect(() => {
    navigation.setOptions({ headerShown: !loading });
  }, [loading]);

  const onSubmit = () => {
    if (shoppingList.id == "") {
      dispatch(postShoppingList(shoppingList));
    } else {
      dispatch(putShoppingList(shoppingList));
    }
    setTimeout(async () => {
      await dispatch(getAll(false));
      navigation.goBack();
    }, 100);
  };

  return (
    <VStack
      //bgColor={"theme.principal"}
      flex={1}
      alignItems="center"
      justifyContent={"center"}
    >
      <Container refreshControl={false} onRefresh={onSubmit} with="90%">
        <Box
          width="100%"
          rounded="lg"
          overflow="scroll"
          borderColor="coolGray.200"
          borderWidth="1"
          bgColor={"white"}
          shadow={6}
          alignSelf="center"
          marginTop={10}
        >
          <ScrollView
            maxW="full"
            w="100%"
            h="80%"
            _contentContainerStyle={{
              px: "3px",
              mb: "4",
              minW: "50",
            }}
          >
            <VStack p="3" space={10} width="100%" height={"50%"}>
              <Center>
                <Heading color={"black"}>Lista de compras</Heading>
              </Center>
              <VStack>
                <FormControl isRequired>
                  <Input
                    autoFocus={true}
                    selectionColor={"gray"}
                    variant="underlined"
                    size={"2xl"}
                    borderColor="black"
                    bgColor="white"
                    color={"black"}
                    isFocused={true}
                    isRequired={true}
                    onChangeText={(value) => {
                      dispatch(
                        setShoppingList({ ...shoppingList, description: value })
                      );
                    }}
                    value={shoppingList.description}
                    marginRight={1}
                    InputLeftElement={
                      <Icon
                        as={<Entypo name="text" />}
                        size={5}
                        ml="2"
                        color="black"
                      />
                    }
                    placeholder="Descrição"
                    onSubmitEditing={() => inputSupermarket.current.focus()}
                  />
                  <FormControl.HelperText>
                    Informe o nome da lista.
                  </FormControl.HelperText>
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    Ops! Descrição inválida.
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired>
                  <Input
                    selectionColor={"gray"}
                    variant="underlined"
                    size={"2xl"}
                    borderColor="black"
                    bgColor="white"
                    color={"black"}
                    isFocused={false}
                    isRequired={true}
                    onChangeText={(value) => {
                      dispatch(
                        setShoppingList({ ...shoppingList, supermarket: value })
                      );
                    }}
                    value={shoppingList.supermarket.description}
                    InputLeftElement={
                      <Icon
                        as={<FontAwesome5 name="shopping-cart" />}
                        size={6}
                        ml="2"
                        marginRight={1}
                        color="black"
                      />
                    }
                    ref={inputSupermarket}
                    placeholder="Supermercado"
                  />
                  <FormControl.HelperText>
                    Informe o nome do supermercado.
                  </FormControl.HelperText>
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    Ops! nome do supermercado inválido.
                  </FormControl.ErrorMessage>
                </FormControl>
              </VStack>
            </VStack>
          </ScrollView>
          <VStack space={10} p={5}>
            <Button
              rounded={20}
              onPress={onSubmit}
              size="sm"
              testID="saveShoppingListBtn"
              _text={{
                color: "white",
                fontSize: 25,
              }}
            >
              Salvar
            </Button>
          </VStack>
        </Box>
      </Container>
    </VStack>
  );
};

const mapStateToProps = (store: any) => ({
  shoppingList: store.shoppingListReducer.shoppingList,
  loading: store.commonReducer.loading,
});
export default connect(mapStateToProps)(ShoppingListScreen);
