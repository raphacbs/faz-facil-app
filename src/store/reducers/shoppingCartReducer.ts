import { ShoppingCartModel } from "../../services/models";
import { GET_SHOPPING_CART, ERROR, GET_PRODUCTS_BY_DESCRIPTION, CLEAR_PRODUCT_LIST, PUT_SHOPPING_CART_ITEM, SHOW_LOADING_SHOPPING_CART_ITEM, DELETE_SHOPPING_CART_ITEM, GET_SHOPPING_CART_BY_PAGE, ON_END_REACHED_SHOPPING_CART } from "../actions/types";

const initialState: ShoppingCartModel = {
    shoppingCart: {
        cartItems: [],
        totalCartItems: 0,
        totalProducts: 0,
        amountItems: "R$ 0,00",
        subtotalChecked: "R$ 0,00",
        totalProductsChecked: 0
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
        price: "R$ 0,00",
        amountOfProduct: 0,
        subtotal: "R$ 0,00",
        createdAt: "24/08/2022 13:48:42",
        isChecked: false
    },
    loadingEndReached: false,
    products: [],
    loading: false,
    pageInfo: {
        pageNo: 0,
        pageSize: 10,
        totalElements: 0,
        totalPages: 0,
        last: false
    }
}

const shoppingCartReducer = (state: ShoppingCartModel = initialState, action: any) => {

    switch (action.type) {
        case GET_SHOPPING_CART:
            return {
                ...state,
                shoppingCart: action.shoppingCart, loading: false, pageInfo: action.pageInfo
            }
        case GET_PRODUCTS_BY_DESCRIPTION:

            return {
                ...state,
                products: action.productResponse.products, loading: false
            }
        case GET_SHOPPING_CART_BY_PAGE:
            const _shoppingCart = { ...state.shoppingCart }
            _shoppingCart.cartItems = _shoppingCart.cartItems.concat(action.payload.shoppingCart.cartItems)
            return { ...state, loadingEndReached: false, shoppingCart: _shoppingCart, pageInfo: action.payload.pageInfo }

        case PUT_SHOPPING_CART_ITEM:
            const clone = { ...state.shoppingCart }
            clone.amountItems = action.data.amountItems;
            clone.totalProducts = action.data.totalProducts;
            clone.totalProductsChecked = action.data.totalProductsChecked;
            clone.subtotalChecked = action.data.subtotalChecked;
            clone.totalCartItems = action.data.totalCartItems;
            clone.cartItems = clone.cartItems.map(
                (cartItem, i) => cartItem.id == action.data.cartItems[0].id ? {
                    ...cartItem,
                    isChecked: action.data.cartItems[0].isChecked,
                    price: action.data.cartItems[0].price,
                    amountOfProduct: action.data.cartItems[0].amountOfProduct,
                    subtotal: action.data.cartItems[0].subtotal
                } : cartItem
            )
            return {
                ...state,
                shoppingCart: clone, loading: false
            }
        case DELETE_SHOPPING_CART_ITEM:

            return {
                ...state, loading: false, shoppingCart: initialState.shoppingCart
            }
        case CLEAR_PRODUCT_LIST:
            return {
                ...state,
                products: [], loading: false
            }
        case SHOW_LOADING_SHOPPING_CART_ITEM:
            return {
                ...state,
                loading: true
            }
        case ON_END_REACHED_SHOPPING_CART:
            return { ...state, loadingEndReached: true };
        default:
            return state;
    }
}

export default shoppingCartReducer;