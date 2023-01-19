import { GET_SHOPPING_LISTS, DEFAULT_LOADING, ERROR, SHOW_ALERT, PUT_SHOPPING_LIST, OFF_LOADING, SET_SHOPPING_LIST, GET_SHOPPING_CART, POST_SHOPPING_LIST, SET_ERROR, CLEAR_ERROR, GET_SHOPPING_LISTS_BY_PAGE, ON_END_REACHED_SHOPPING_LIST } from "./types";
import { api } from '../../services/api';
import { Alert } from "../../services/models";
import { PageInfoType, ShoppingListType } from "../../types";

const endPoint = '/api/v1/shopping-carts';

export const getAll: any = () => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: CLEAR_ERROR });
            dispatch({ type: DEFAULT_LOADING })
            const response = await api.get(`${endPoint}?pageNo=0&pageSize=10`);
            let shoppingLists = response.data.content;

            let pageInfo = {
                pageNo: response.data.pageNo,
                pageSize: response.data.pageSize,
                totalElements: response.data.totalElements,
                totalPages: response.data.totalPages,
                last: response.data.last
            }
            dispatch({ type: GET_SHOPPING_LISTS, payload: { shoppingLists, pageInfo } })
            dispatch({ type: OFF_LOADING })
        } catch (error: any) {
            console.error(error)
            let message = error ? error.message + ' - ' + error.code : 'Erro desconhecido';
            dispatch({ type: SET_ERROR, error: message });
        }
    }
}

export const getMore: any = (pageInfo: PageInfoType) => {

    return async (dispatch: any) => {
        try {
            dispatch({ type: CLEAR_ERROR });
            dispatch({ type: ON_END_REACHED_SHOPPING_LIST });
            const response = await api.get(`${endPoint}?pageNo=${pageInfo.pageNo}&pageSize=${pageInfo.pageSize}`);
            let shoppingLists = response.data.content;
            let _pageInfo = {
                pageNo: response.data.pageNo,
                pageSize: response.data.pageSize,
                totalElements: response.data.totalElements,
                totalPages: response.data.totalPages,
                last: response.data.last
            }
            dispatch({ type: GET_SHOPPING_LISTS_BY_PAGE, payload: { shoppingLists, pageInfo: _pageInfo } })
        } catch (error: any) {
            let message = error ? error.message + ' - ' + error.code : 'Erro desconhecido';
            dispatch({ type: SET_ERROR, error: message });
        }
    }
}

export const putShoppingList: any = (shoppingList: ShoppingListType) => {
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

export const postShoppingList: any = (shoppingList: ShoppingListType) => {
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

export const setShoppingList: any = (shoppingList: ShoppingListType) => {
    return async (dispatch: any) => {
        dispatch({ type: SET_SHOPPING_LIST, shoppingList });
    }
}

export const getShoppingCart: any = (shoppingListId: string) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: CLEAR_ERROR });
            dispatch({ type: DEFAULT_LOADING })
            const url = `${endPoint}/${shoppingListId}/cart-item?pageNo=0&pageSize=10&sortDir=desc`
            console.log(url)
            const response = await api.get(url);
            let shoppingCart = response.data.content;
            let _pageInfo = {
                pageNo: response.data.pageNo,
                pageSize: response.data.pageSize,
                totalElements: response.data.totalElements,
                totalPages: response.data.totalPages,
                last: response.data.last
            }
            dispatch({ type: GET_SHOPPING_CART, shoppingCart, pageInfo: _pageInfo });
            dispatch({ type: OFF_LOADING });
        } catch (error: any) {
            let message = error ? error.message + ' - ' + error.code : 'Erro desconhecido';
            dispatch({ type: SET_ERROR, error: message });
        }
    }
}


