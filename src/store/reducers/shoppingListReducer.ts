import { ModelsInitialState } from '../../services/models';
import { DEFAULT_LOADING, ERROR, GET_SHOPPING_LISTS } from '../actions/types';
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
    showAlert: false,
}

const shoppingListReducer = (state: ModelsInitialState = initialState, action: any) => {
    const { shoppingLists } = action;
    switch (action.type) {
        case GET_SHOPPING_LISTS:
            return { ...state, shoppingLists, loading: false };
        case ERROR:
            return { ...state, error: action.error, loading: false, showAlert: true };
        case DEFAULT_LOADING:
            return { ...state, loading: true };
        default:
            return state;
    }
}

export default shoppingListReducer;