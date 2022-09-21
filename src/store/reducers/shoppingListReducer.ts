import { ModelsInitialState } from '../../services/models';
import { DEFAULT_LOADING, ERROR, GET_SHOPPING_LISTS, OFF_LOADING, POST_SHOPPING_LIST, PUT_SHOPPING_LIST, SET_SHOPPING_LIST } from '../actions/types';
const initialState = {
    shoppingLists: [],
    shoppingList: {
        id: '',
        description: '',
        supermarket: '',
        createAt: '',
        updateAt: '',
        amount: '',
        amountProducts: 0,
        archived: false
    },
    error: '',
    loading: true,
    showAlert: false
}

const shoppingListReducer = (state: ModelsInitialState = initialState, action: any) => {
    switch (action.type) {
        case GET_SHOPPING_LISTS:
            return { ...state, shoppingLists: action.shoppingLists, loading: false };
        case PUT_SHOPPING_LIST:
            return { ...state, shoppingList: action.shoppingList, loading: false };
        case POST_SHOPPING_LIST:
            return { ...state, shoppingList: action.shoppingList, loading: false };
        case SET_SHOPPING_LIST:
            return { ...state, shoppingList: action.shoppingList, loading: false };

        default:
            return state;
    }
}

export default shoppingListReducer;