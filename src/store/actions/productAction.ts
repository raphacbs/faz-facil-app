import api from "../../services/api";
import { CLEAR_ERROR, CLEAR_PRODUCT_LIST, DEFAULT_LOADING, GET_PRODUCTS_BY_DESCRIPTION, GET_SHOPPING_LISTS, OFF_LOADING, SET_ERROR } from "./types";

const endPoint = '/api/v1/products';
export const getProductByDescription: any = (description: string) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: CLEAR_ERROR });
            dispatch({ type: DEFAULT_LOADING })
            const response = await api.get(`${endPoint}?description=${description}`);
            dispatch({ type: GET_PRODUCTS_BY_DESCRIPTION, productResponse: response.data })
            dispatch({ type: OFF_LOADING })
        } catch (error: any) {
            let message = error ? error.message + ' - ' + error.code : 'Erro desconhecido';
            dispatch({ type: SET_ERROR, error: message });
        }
    }
}

export const clearProductList: any = () => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: CLEAR_ERROR });
            dispatch({ type: DEFAULT_LOADING })
            dispatch({ type: CLEAR_PRODUCT_LIST })
            dispatch({ type: OFF_LOADING })
        } catch (error: any) {
            let message = error ? error.message + ' - ' + error.code : 'Erro desconhecido';
            dispatch({ type: SET_ERROR, error: message });
        }
    }
}