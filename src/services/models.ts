import { CartItemType, ProductItemType, ShoppingCartType, CartItemBodyType, ShoppingListType } from "../types"
export interface ModelsInitialState {
    shoppingLists: Array<ShoppingListType>,
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
    product: ProductItemType,
    loading: boolean,
    loadingEndReached: boolean,
    pageInfo: {
        pageNo: number,
        pageSize: number,
        totalElements: number,
        totalPages: number,
        last: boolean
    },
    cartItemBody: CartItemBodyType,
    productDidFounded: boolean,
    productBodyPost: {
        description: string,
        brand: string,
        image: string,
        ean: string,
        price: string,
        amountOfProduct: number,
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