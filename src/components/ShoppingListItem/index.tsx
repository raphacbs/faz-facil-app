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
import { ShoppingList } from "../../types";
import { connect } from "react-redux";
import {
  getAll,
  putShoppingList,
} from "../../store/actions/shoppingListAction";
import { TouchableOpacity } from "react-native";
import { List } from "react-native-paper";
interface Props {
  shoppingList: ShoppingList;
  index: number;
  onEdit?: (shoppingList: ShoppingList) => void;
  onPress?: (shoppingList: ShoppingList) => void;
  onUpdate?: (shoppingList: ShoppingList) => void;
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
    <List.Item
      title={shoppingList.description}
      titleStyle={{ fontSize: 18, fontWeight: "bold" }}
      titleEllipsizeMode={"middle"}
      descriptionStyle={{}}
      description={
        <VStack>
          <HStack bgColor={"amber.100"} w={"100%"}>
            <Icon
              marginTop={1}
              as={MaterialIcons}
              name="place"
              color="amber.600"
            />
            <Text>{shoppingList.supermarket}</Text>
          </HStack>
          <HStack bgColor={"amber.100"} w={"100%"}>
            <Icon
              marginTop={1}
              as={MaterialIcons}
              name="place"
              color="amber.600"
            />
            <Text>{shoppingList.supermarket}</Text>
          </HStack>
        </VStack>
      }
      onPress={() => {
        onPress && onPress(shoppingList);
      }}
      descriptionNumberOfLines={3}
      touchSoundDisabled={false}
    />

    // <Text>{shoppingList.description}</Text>
  );
};

// const mapStateToProps = (store) => ({
//   isLoading: store.shoppingListReducer.loading,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({ setOpenActionSheet }, dispatch);

const mapDispatchToProps = (dispatch: any) => {
  return {
    onUpdate: (shoppingList: ShoppingList) => {
      dispatch(putShoppingList(shoppingList));
      dispatch(getAll(false));
    },
  };
};

export default connect(null, mapDispatchToProps)(ShoppingListItem);
