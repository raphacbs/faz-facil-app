import { GET_SHOPPING_LISTS, DEFAULT_LOADING, ERROR, SHOW_ALERT, PUT_SHOPPING_LIST, OFF_LOADING, SET_SHOPPING_LIST, GET_SHOPPING_CART, POST_SHOPPING_LIST, SET_ERROR, CLEAR_ERROR } from "./types";
import { api } from '../../services/api';
import { Alert } from "../../services/models";
import { ShoppingList } from "../../types";

const endPoint = '/api/v1/shopping-carts';

export const getAll: any = (isArchived: boolean) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: CLEAR_ERROR });
            dispatch({ type: DEFAULT_LOADING })
            const response = await api.get(`${endPoint}?isArchived=${isArchived}`);
            dispatch({ type: GET_SHOPPING_LISTS, shoppingLists: response.data })
            dispatch({ type: OFF_LOADING })
        } catch (error: any) {
            let message = error ? error.message + ' - ' + error.code : 'Erro desconhecido';
            dispatch({ type: SET_ERROR, error: message });
        }
    }
}

export const putShoppingList: any = (shoppingList: ShoppingList) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: CLEAR_ERROR });
            dispatch({ type: DEFAULT_LOADING })
            let body = {
                id: shoppingList.id,
                description: shoppingList.description,
                amountProducts: shoppingList.amountProducts,
                amountCheckedProducts: shoppingList.amountCheckedProducts,
                archived: shoppingList.archived,
                supermarket: shoppingList.supermarket
            }
            const response = await api.put(endPoint, body);
            dispatch({ type: PUT_SHOPPING_LIST, shoppingList: response.data })
        } catch (error: any) {
            let message = error ? error.message + ' - ' + error.code : 'Erro desconhecido';
            dispatch({ type: SET_ERROR, error: message });
        }
    }
}

export const postShoppingList: any = (shoppingList: ShoppingList) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: CLEAR_ERROR });
            dispatch({ type: DEFAULT_LOADING })
            let body = {
                description: shoppingList.description,
                supermarket: shoppingList.supermarket,
                archived: shoppingList.archived
            }
            const response = await api.post(endPoint, body);
            dispatch({ type: POST_SHOPPING_LIST, shoppingList: response.data })
        }
        catch (error: any) {
            let message = error ? error.message + ' - ' + error.code : 'Erro desconhecido';
            dispatch({ type: SET_ERROR, error: message });
        }
    }
}

export const setShoppingList: any = (shoppingList: ShoppingList) => {
    return async (dispatch: any) => {
        dispatch({ type: SET_SHOPPING_LIST, shoppingList });
    }
}

export const getShoppingCart: any = (shoppingListId: string) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: CLEAR_ERROR });
            dispatch({ type: DEFAULT_LOADING })
            const url = `${endPoint}/${shoppingListId}/cart-item`
            const response = await api.get(url);
            dispatch({ type: GET_SHOPPING_CART, shoppingCart: response.data });
            dispatch({ type: OFF_LOADING });
        } catch (error: any) {
            let message = error ? error.message + ' - ' + error.code : 'Erro desconhecido';
            dispatch({ type: SET_ERROR, error: message });
        }
    }
}


