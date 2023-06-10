import useConstants from "../../hooks/useConstants";
import { InitialState, ShoppingList } from "../../types/ShoppingList";

const initialState: InitialState = {
  shoppingListToSave: {
    description: "",
    supermarketId: "",
    status: "",
  },
  selectedShoppingList: {
    id: "",
    description: "",
    supermarketId: "",
    supermarketName: "",
    createdAt: "",
    updatedAt: "",
    status: "",
    itemsInfo: {
      quantityPlannedProduct: 0,
      quantityAddedProduct: 0,
      plannedTotalValue: 0,
      totalValueAdded: 0,
    },
  },
  shoppingLists: [],
  homeShoppingLists: [],
};

const {
  SET_SHOPPING_LIST_TO_SAVE,
  SET_SHOPPING_LISTS,
  SET_SELECTED_SHOPPING_LIST,
} = useConstants();

const reducer = (state = initialState, action: { type: any; payload: any }) => {
  switch (action.type) {
    case SET_SHOPPING_LIST_TO_SAVE:
      return { ...state, shoppingListToSave: action.payload };
    case SET_SHOPPING_LISTS:
      let selectedShoppingList = { ...state }.selectedShoppingList;
      if (selectedShoppingList.id != "") {
        selectedShoppingList = action.payload.find(
          (shoppingList: ShoppingList) =>
            shoppingList.id === selectedShoppingList.id
        );
        return {
          ...state,
          shoppingLists: action.payload,
          selectedShoppingList: selectedShoppingList,
        };
      }
      return { ...state, shoppingLists: action.payload };
    case SET_SELECTED_SHOPPING_LIST:
      return { ...state, selectedShoppingList: action.payload };
    default:
      return state;
  }
};

export default reducer;
