import React from "react";
import {
  VStack,
  HStack,
  Actionsheet,
  Box,
  Text,
  Icon,
  AlertDialog,
  Heading,
  Button,
  IconButton,
  Center,
  Pressable,
  Progress,
} from "native-base";
import {
  FontAwesome,
  MaterialIcons,
  Zocial,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ShoppingListType } from "../../types";
import { connect } from "react-redux";
import {
  getAll,
  putShoppingList,
} from "../../store/actions/shoppingListAction";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  shoppingList: ShoppingListType;
  index: number;
  onEdit?: (shoppingList: ShoppingListType) => void;
  onPress?: (shoppingList: ShoppingListType) => void;
  onUpdate?: (shoppingList: ShoppingListType) => void;
}

const ShoppingListItem: React.FC<Props> = ({
  shoppingList,
  onEdit,
  onPress,
  onUpdate,
}) => {
  const [openActionSheet, setOpenActionSheet] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const cancelRef = React.useRef(null);

  const onCloseActionSheet = () => {
    setOpenActionSheet(false);
  };
  const onCloseAlert = () => {
    setShowAlert(false);
  };

  const calculateProgress = (partialValue: number, totalValue: number) => {
    let percentile: string = ((partialValue / totalValue) * 100).toFixed();
    return parseInt(percentile);
  };

  return (
    <Pressable
      onPress={() => {
        onPress && onPress(shoppingList);
      }}
    >
      <VStack
        rounded={8}
        shadow={5}
        p={2}
        bgColor={"gray.200"}
        width="95%"
        margin={2}
        borderWidth="1"
        borderColor="gray.200"
        // onPress={() => {
        //   onPress && onPress(shoppingList);
        // }}
      >
        <HStack>
          <Box
            marginLeft={-2}
            marginBottom={-2}
            marginTop={-2}
            marginRight={2}
            roundedLeft={8}
            bgColor={shoppingList.archived ? "gray.400" : "green.800"}
            w={1}
          ></Box>
          <VStack width="100%">
            <HStack space={2} justifyContent="space-between">
              <Center>
                <Heading color={"black"} size={"sm"}>
                  {shoppingList.description}
                </Heading>
              </Center>
              <IconButton
                size={"md"}
                variant="ghost"
                alignSelf={"flex-end"}
                onPress={() => {
                  setOpenActionSheet(true);
                }}
                _icon={{
                  as: MaterialCommunityIcons,
                  name: "dots-vertical",
                  color: "gray.600",
                }}
              />
            </HStack>
            <HStack space={2} justifyContent="space-between">
              <HStack>
                <Icon
                  marginTop={1}
                  as={MaterialIcons}
                  name="place"
                  color="amber.600"
                />
                <Text>{shoppingList.supermarket}</Text>
              </HStack>
              <Heading marginRight={2} color={"blue.800"} size={"sm"}>
                {shoppingList.amount}
              </Heading>
            </HStack>
            <HStack space={2} justifyContent="space-between">
              <HStack>
                <Icon
                  margin={1}
                  as={FontAwesome}
                  name="calendar"
                  color="gray.500"
                />
                <Text>{shoppingList.createAt}</Text>
              </HStack>
              <HStack>
                <Icon
                  marginRight={2}
                  as={Zocial}
                  name="cart"
                  color="gray.500"
                  size={"md"}
                />
                <Text marginRight={2}>{shoppingList.amountProducts}</Text>
              </HStack>
            </HStack>

            <Box w="100%">
              <Progress
                bg="coolGray.100"
                _filledTrack={{
                  bg: "lime.500",
                }}
                value={calculateProgress(
                  shoppingList.amountCheckedProducts,
                  shoppingList.amountProducts
                )}
                size="sm"
              />
            </Box>
          </VStack>
        </HStack>
        <Center>
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={showAlert}
            onClose={onCloseAlert}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Finalizar lista</AlertDialog.Header>
              <AlertDialog.Body>
                <Text>
                  Deseja finalizar a lista
                  <Heading size={"sm"}> {shoppingList.description}</Heading>?
                </Text>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={onCloseAlert}
                    ref={cancelRef}
                  >
                    Não
                  </Button>
                  <Button
                    colorScheme="danger"
                    onPress={() => {
                      onUpdate && onUpdate({ ...shoppingList, archived: true });
                    }}
                  >
                    Sim
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </Center>
        <Center>
          <Actionsheet isOpen={openActionSheet} onClose={onCloseActionSheet}>
            <Actionsheet.Content>
              <Actionsheet.Item
                onPress={() => {
                  onEdit && onEdit(shoppingList);
                }}
                // isDisabled={shoppingList.archived}
              >
                Editar
              </Actionsheet.Item>
              <Actionsheet.Item
                onPress={() => {
                  onCloseActionSheet();
                  setShowAlert(true);
                }}
              >
                Finalizar
              </Actionsheet.Item>
              <Actionsheet.Item onPress={() => {}} isDisabled>
                Comparar
              </Actionsheet.Item>
              <Actionsheet.Item onPress={onCloseActionSheet}>
                Cancelar
              </Actionsheet.Item>
            </Actionsheet.Content>
          </Actionsheet>
        </Center>
      </VStack>
    </Pressable>
  );
};

// const mapStateToProps = (store) => ({
//   isLoading: store.shoppingListReducer.loading,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({ setOpenActionSheet }, dispatch);

const mapDispatchToProps = (dispatch: any) => {
  return {
    onUpdate: (shoppingList: ShoppingListType) => {
      dispatch(putShoppingList(shoppingList));
      dispatch(getAll(false));
    },
  };
};

export default connect(null, mapDispatchToProps)(ShoppingListItem);
