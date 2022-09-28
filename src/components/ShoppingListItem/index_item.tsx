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
  Stack,
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
import { TouchableOpacity } from "react-native";
import { List } from "react-native-paper";
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
    <Stack w={"100%"}>
      <List.Item
        title={shoppingList.description}
        titleStyle={{ fontSize: 18, fontWeight: "bold" }}
        titleEllipsizeMode={"middle"}
        descriptionStyle={{ width: "100%" }}
        right={() => (
          <IconButton
            size={"md"}
            variant="ghost"
            alignSelf={"flex-start"}
            onPress={() => {
              setOpenActionSheet(true);
            }}
            _icon={{
              as: MaterialCommunityIcons,
              name: "dots-vertical",
              color: "gray.600",
            }}
          />
        )}
        left={() => (
          <Box
            roundedLeft={8}
            bgColor={shoppingList.archived ? "gray.400" : "green.800"}
            w={1}
          ></Box>
        )}
        description={
          <VStack width={"100%"}>
            <HStack>
              <Icon
                marginRight={2}
                marginLeft={1}
                as={MaterialIcons}
                name="place"
                color="amber.600"
                size={"sm"}
              />
              <Text>{shoppingList.supermarket}</Text>
            </HStack>
            <HStack>
              <Icon
                marginTop={1}
                marginRight={2}
                marginLeft={1}
                as={FontAwesome}
                name="calendar"
                color="blue.500"
                size={"sm"}
              />
              <Text>{shoppingList.createAt}</Text>
            </HStack>
            <HStack>
              <Icon
                marginTop={1}
                marginRight={2}
                as={Zocial}
                name="cart"
                color="indigo.800"
                size={"sm"}
              />
              <Text>{`${shoppingList.amountCheckedProducts}/${shoppingList.amountProducts}`}</Text>
            </HStack>
            <HStack>
              <Icon
                marginTop={1}
                marginRight={1}
                marginLeft={1}
                as={FontAwesome}
                name="money"
                color="green.700"
                size={"sm"}
              />
              <Text bold>{shoppingList.amount}</Text>
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
                      <Heading size={"sm"}> {shoppingList.description}</Heading>
                      ?
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
                          onUpdate &&
                            onUpdate({ ...shoppingList, archived: true });
                        }}
                      >
                        Sim
                      </Button>
                    </Button.Group>
                  </AlertDialog.Footer>
                </AlertDialog.Content>
              </AlertDialog>
              <Actionsheet
                isOpen={openActionSheet}
                onClose={onCloseActionSheet}
              >
                <Actionsheet.Content marginBottom={-10}>
                  <Actionsheet.Item
                    onPress={() => {
                      onEdit && onEdit(shoppingList);
                    }}
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
        }
        onPress={() => {
          onPress && onPress(shoppingList);
        }}
        descriptionNumberOfLines={3}
        touchSoundDisabled={false}
      />
    </Stack>
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
