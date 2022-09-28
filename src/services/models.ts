import { CartItemType, ProductItemType, ShoppingCartType } from "../types"
export interface ModelsInitialState {
    shoppingLists: Array<object>,
    shoppingList: {
        id: string;
        description: string;
        supermarket: string;
        createAt: string;
        updateAt: string;
        amount: string;
        amountProducts: number;
        archived: boolean
    }
    loadingEndReached: boolean,
    showAlert: boolean,
    pageInfo: {
        pageNo: number,
        pageSize: number,
        totalElements: number,
        totalPages: number,
        last: boolean
    }


}

export interface ShoppingCartModel {
    shoppingCart: ShoppingCartType,
    cartItem: CartItemType,
    products: Array<ProductItemType>
    loading: boolean,
    loadingEndReached: boolean,
    pageInfo: {
        pageNo: number,
        pageSize: number,
        totalElements: number,
        totalPages: number,
        last: boolean
    }
}

export interface ToastInterface {
    message: string,
    type?: "error" | "success" | "info" | "warning" | undefined;
}

export interface Alert {
    message: string,
    type: "error" | "success" | "info" | "warning" | undefined;

}