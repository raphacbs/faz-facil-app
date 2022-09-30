import api from "../../services/api";
import { CartItemBodyType, CartItemType as CartItemType, PageInfoType } from "../../types";
import { getShoppingCart } from "./shoppingListAction";
import {
    CLEAR_ERROR,
    CLEAR_PRODUCT_LIST,
    DEFAULT_LOADING,
    DELETE_SHOPPING_CART_ITEM,
    GET_PRODUCTS_BY_DESCRIPTION,
    GET_SHOPPING_CART_BY_PAGE,
    GET_SHOPPING_LISTS,
    GET_SHOPPING_LISTS_BY_PAGE,
    OFF_LOADING,
    ON_END_REACHED_SHOPPING_CART,
    ON_END_REACHED_SHOPPING_LIST,
    POST_SHOPPING_CART_ITEM,
    PUT_SHOPPING_CART_ITEM,
    SET_CART_ITEM_BODY,
    SET_ERROR,
    SHOW_LOADING_SHOPPING_CART_ITEM
} from "./types";

const endPoint = '/api/v1/shopping-carts';

export const getMoreCartItems: any = (shoppingListId: string, pageInfo: PageInfoType) => {

    return async (dispatch: any) => {
        try {
            dispatch({ type: CLEAR_ERROR });
            dispatch({ type: ON_END_REACHED_SHOPPING_CART });
            const url = `${endPoint}/${shoppingListId}/cart-item?pageNo=${pageInfo.pageNo}&pageSize=${pageInfo.pageSize}&sortDir=desc`
            const response = await api.get(url);
            let shoppingCart = response.data.content;
            let _pageInfo = {
                pageNo: response.data.pageNo,
                pageSize: response.data.pageSize,
                totalElements: response.data.totalElements,
                totalPages: response.data.totalPages,
                last: response.data.last
            }
            dispatch({ type: GET_SHOPPING_CART_BY_PAGE, payload: { shoppingCart, pageInfo: _pageInfo } })
        } catch (error: any) {
            let message = error ? error.message + ' - ' + error.code : 'Erro desconhecido';
            dispatch({ type: SET_ERROR, error: message });
        }
    }
}
export const putCartItem: any = (cartItem: CartItemType) => {
    return async (dispatch: any) => {
        try {
            let body = {
                amountOfProduct: cartItem.amountOfProduct,
                id: cartItem.id,
                price: cartItem.price,
                isChecked: cartItem.isChecked
            }
            dispatch({ type: CLEAR_ERROR });
            dispatch({ type: SHOW_LOADING_SHOPPING_CART_ITEM })
            const url = `${endPoint}/${cartItem.shoppingCartId}/cart-item`
            const response = await api.put(url, body);
            dispatch({ type: PUT_SHOPPING_CART_ITEM, data: response.data })
            dispatch({ type: OFF_LOADING })
        } catch (error: any) {
            let message = error ? error.message + ' - ' + error.code : 'Erro desconhecido';
            dispatch({ type: SET_ERROR, error: message });
        }
    }
}
export const postCartItem: any = (cartItemBodyType: CartItemBodyType, shoppingCartId: string) => {
    return async (dispatch: any) => {
        try {
            // let body = {
            //     amountOfProduct: cartItemBodyType.amountOfProduct,
            //     price: cartItemBodyType.price,
            //     isChecked: cartItemBodyType.isChecked,
            //     productId: cartItemBodyType.productId
            // }


            dispatch({ type: CLEAR_ERROR });
            dispatch({ type: SHOW_LOADING_SHOPPING_CART_ITEM })
            const url = `${endPoint}/${shoppingCartId}/cart-item`
            const response = await api.post(url, cartItemBodyType);
            dispatch({ type: POST_SHOPPING_CART_ITEM, data: response.data })
            dispatch({ type: OFF_LOADING })
        } catch (error: any) {
            let message = error ? error.message + ' - ' + error.code : 'Erro desconhecido';
            dispatch({ type: SET_ERROR, error: message });
        }
    }
}
export const setCartItemBody: any = (cartItemBody: CartItemBodyType) => {
    return async (dispatch: any) => {
        try {
            // let body = {
            //     amountOfProduct: cartItemBodyType.amountOfProduct,
            //     price: cartItemBodyType.price,
            //     isChecked: cartItemBodyType.isChecked,
            //     productId: cartItemBodyType.productId
            // }
            dispatch({ type: CLEAR_ERROR });
            dispatch({ type: SET_CART_ITEM_BODY, cartItemBody: cartItemBody });

        } catch (error: any) {
            let message = error ? error.message + ' - ' + error.code : 'Erro desconhecido';
            dispatch({ type: SET_ERROR, error: message });
        }
    }
}
export const deleteCartItem: any = (cartItem: CartItemType) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: CLEAR_ERROR });
            dispatch({ type: DEFAULT_LOADING })
            const url = `/api/v1/cart-items/${cartItem.id}`
            const response = await api.delete(url);
            dispatch({ type: DELETE_SHOPPING_CART_ITEM })
            dispatch(getShoppingCart(cartItem.shoppingCartId))
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
export const resetShoppingCart: any = () => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: CLEAR_ERROR });
            dispatch({ type: DELETE_SHOPPING_CART_ITEM })
        } catch (error: any) {
            let message = error ? error.message + ' - ' + error.code : 'Erro desconhecido';
            dispatch({ type: SET_ERROR, error: message });
        }
    }
}


