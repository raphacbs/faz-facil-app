import { Action } from "@reduxjs/toolkit";
import { ShoppingCartModel } from "../../services/models";
import { GET_SHOPPING_CART, ERROR } from "../actions/types";

const initialState: ShoppingCartModel = {
    shoppingCart: {
        cartItems: [],
        totalCartItems: 0,
        totalProducts: 0,
        amountItems: "R$ 0,00",
        subtotalChecked: "R$ 0,00",
    },
    cartItem: {
        id: "",
        shoppingCartId: "",
        product: {
            id: "",
            description: "",
            brand: "",
            image: "",
            ean: "",
            createAt: "",
            updateAt: "",
        },
        unitValue: "R$ 0,00",
        amountOfProduct: 0,
        subtotal: "R$ 0,00",
        createdAt: "24/08/2022 13:48:42",
        isChecked: false
    }
}

const shoppingCartReducer = (state: ShoppingCartModel = initialState, action: any) => {

    switch (action.type) {
        case GET_SHOPPING_CART:
            return {
                ...state,
                shoppingCart: action.shoppingCart, loading: false
            }
        default:
            return state;
    }
}

export default shoppingCartReducer;