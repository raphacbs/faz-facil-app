import { ModelsInitialState } from '../../services/models';
import { ShoppingListType } from '../../types';
import { GET_SHOPPING_LISTS, GET_SHOPPING_LISTS_BY_PAGE, OFF_LOADING, ON_END_REACHED_SHOPPING_LIST, POST_SHOPPING_CART_ITEM, POST_SHOPPING_LIST, PUT_SHOPPING_CART_ITEM, PUT_SHOPPING_LIST, SET_SHOPPING_LIST } from '../actions/types';
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
    loadingEndReached: false,
    showAlert: false,
    pageInfo: {
        pageNo: 0,
        pageSize: 10,
        totalElements: 0,
        totalPages: 0,
        last: false
    }
}

const shoppingListReducer = (state: ModelsInitialState = initialState, action: any) => {
    switch (action.type) {
        case GET_SHOPPING_LISTS:
            return { ...state, shoppingLists: action.payload.shoppingLists, pageInfo: action.payload.pageInfo };
        case PUT_SHOPPING_LIST:
            return { ...state, shoppingList: action.shoppingList, };
        case PUT_SHOPPING_CART_ITEM:
        case POST_SHOPPING_CART_ITEM:
            const nextShoppingLists = [...state.shoppingLists];
            return {
                ...state,
                shoppingLists: nextShoppingLists.map(
                    (shoppingList, i) => shoppingList.id == action.data.cartItems[0].shoppingCartId ? {
                        ...shoppingList,
                        amountCheckedProducts: action.data.totalProductsChecked,
                        amountProducts: action.data.totalProducts,
                        amount: action.data.amountItems
                    } : shoppingList
                )
            }

        case POST_SHOPPING_LIST:
            return { ...state, shoppingList: action.shoppingList };
        case SET_SHOPPING_LIST:
            return { ...state, shoppingList: action.shoppingList };
        case GET_SHOPPING_LISTS_BY_PAGE:
            return { ...state, loadingEndReached: false, shoppingLists: state.shoppingLists.concat(action.payload.shoppingLists), pageInfo: action.payload.pageInfo };
        case ON_END_REACHED_SHOPPING_LIST:
            return { ...state, loadingEndReached: true };

        default:
            return state;
    }
}

export default shoppingListReducer;