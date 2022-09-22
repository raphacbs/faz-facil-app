import api from "../../services/api";
import { CartItem as CartItemType } from "../../types";
import { getShoppingCart } from "./shoppingListAction";
import { CLEAR_ERROR, CLEAR_PRODUCT_LIST, DEFAULT_LOADING, DELETE_SHOPPING_CART_ITEM, GET_PRODUCTS_BY_DESCRIPTION, GET_SHOPPING_LISTS, OFF_LOADING, PUT_SHOPPING_CART_ITEM, SET_ERROR, SHOW_LOADING_SHOPPING_CART_ITEM } from "./types";

const endPoint = '/api/v1/shopping-carts';

export const putCartItem: any = (cartItem: CartItemType) => {
    return async (dispatch: any) => {
        try {
            let body = {
                amountOfProduct: cartItem.amountOfProduct,
                id: cartItem.id,
                unitValue: cartItem.unitValue,
                isChecked: cartItem.isChecked
            }
            dispatch({ type: CLEAR_ERROR });
            dispatch({ type: SHOW_LOADING_SHOPPING_CART_ITEM })
            const url = `${endPoint}/${cartItem.shoppingCartId}/cart-item`
            const response = await api.put(url, body);
            dispatch({ type: PUT_SHOPPING_CART_ITEM, shoppingCart: response.data })
            dispatch({ type: OFF_LOADING })
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