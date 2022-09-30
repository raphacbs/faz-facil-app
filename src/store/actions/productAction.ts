import axios from "axios";
import api, { config } from "../../services/api";
import { CartItemBodyType, ProductItemType } from "../../types";
import { postCartItem } from "./shoppingCartAction";
import { CLEAR_ERROR, CLEAR_PRODUCT_LIST, DEFAULT_LOADING, GET_PRODUCTS_BY_DESCRIPTION, GET_PRODUCTS_BY_EAN, GET_SHOPPING_LISTS, OFF_LOADING, SET_ERROR, SET_PRODUCT_POST_BODY } from "./types";

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

export const getProductByEan: any = (ean: string) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: DEFAULT_LOADING })
            const response = await api.get(`${endPoint}?ean=${ean}`);
            const product = response.status == 200 ? response.data.products[0] : null;
            dispatch({ type: GET_PRODUCTS_BY_EAN, product, productDidFounded: product != null })
            dispatch({ type: OFF_LOADING })
        } catch (error: any) {
            let message = error ? error.message + ' - ' + error.code : 'Erro desconhecido';
            dispatch({ type: SET_ERROR, error: message });
        }
    }
}

export const postProduct: any = (productBodyPost: any, shoppingListId: string) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: DEFAULT_LOADING })
            const formData = new FormData();
            let body = {
                description: productBodyPost.description.toUpperCase(),
                brand: productBodyPost.brand.toUpperCase(),
                image: productBodyPost.image,
                ean: productBodyPost.ean
            }
            formData.append("data", JSON.stringify(body));
            const response = await axios({
                method: "post",
                url: config.baseURL + endPoint,
                data: formData,
                headers: { "Content-Type": "multipart/form-data", "X-API-KEY": config.headers["X-API-Key"] },
            })
            const product = response.data;
            const bodyCartItem: CartItemBodyType = {
                productId: product.id,
                amountOfProduct: productBodyPost.amountOfProduct,
                price: productBodyPost.price,
                isChecked: true
            }
            dispatch(postCartItem(bodyCartItem, shoppingListId));
            dispatch({ type: OFF_LOADING })
        } catch (error: any) {
            let message = error ? error.message + ' - ' + error.code : 'Erro desconhecido';
            dispatch({ type: SET_ERROR, error: message });
        }
    }
}



export const setProductBodyPost: any = (productBodyPost: any) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: SET_PRODUCT_POST_BODY, productBodyPost })
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