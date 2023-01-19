import { ShoppingCartModel } from "../../services/models";
import { GET_SHOPPING_CART, ERROR, GET_PRODUCTS_BY_DESCRIPTION, CLEAR_PRODUCT_LIST, PUT_SHOPPING_CART_ITEM, SHOW_LOADING_SHOPPING_CART_ITEM, DELETE_SHOPPING_CART_ITEM, GET_SHOPPING_CART_BY_PAGE, ON_END_REACHED_SHOPPING_CART, GET_PRODUCTS_BY_EAN, POST_SHOPPING_CART_ITEM, SET_CART_ITEM_BODY, SET_PRODUCT_POST_BODY, CHANGE_SHOPPING_CART_ITEM } from "../actions/types";

const initialState: ShoppingCartModel = {
    shoppingCart: {
        cartItems: [],
        totalCartItems: 0,
        totalProducts: 0,
        amountItems: "R$ 0,00",
        subtotalChecked: "R$ 0,00",
        totalProductsChecked: 0,
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
    product: {
        id: "",
        description: "",
        brand: "",
        image: "",
        ean: "",
        createAt: "",
        updateAt: "",
    },

    loading: false,
    pageInfo: {
        pageNo: 0,
        pageSize: 10,
        totalElements: 0,
        totalPages: 0,
        last: false
    },
    cartItemBody: {
        productId: "",
        price: "",
        amountOfProduct: 0,
        isChecked: false,
    },
    productDidFounded: false,
    productBodyPost: {
        description: "",
        brand: "",
        image: "https://drive.google.com/uc?id=1w361FjVApKKJn6g8H5NVZ3IVbL-fSpo4",
        ean: "",
        price: "0,00",
        amountOfProduct: 1,
    }
}

const shoppingCartReducer = (state: ShoppingCartModel = initialState, action: any) => {
    console.log("shoppingCartReducer", action.type)

    switch (action.type) {
        case GET_SHOPPING_CART:
            return {
                ...state,
                shoppingCart: action.shoppingCart, loading: false, pageInfo: action.pageInfo
            }
        case SET_CART_ITEM_BODY:
            return {
                ...state,
                cartItemBody: action.cartItemBody
            }
        case GET_PRODUCTS_BY_DESCRIPTION:
            return {
                ...state,
                products: action.productResponse, loading: false, productDidFounded: action.productResponse.length > 0
            }
        case GET_PRODUCTS_BY_EAN:
            return {
                ...state,
                product: action.product == null ? initialState.product : action.product, productDidFounded: action.productDidFounded
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
                shoppingCart: clone
            }
        case CHANGE_SHOPPING_CART_ITEM:
            const toChange = { ...state.shoppingCart }
            toChange.cartItems = toChange.cartItems.map(
                (cartItem, i) => cartItem.id == action.cartItem.id ? {
                    ...cartItem,
                    isChecked: action.cartItem.isChecked,
                    price: action.cartItem.price,
                    amountOfProduct: action.cartItem.amountOfProduct,
                    subtotal: action.cartItem.subtotal
                } : cartItem
            )
            return {
                ...state,
                shoppingCart: toChange
            }

        case POST_SHOPPING_CART_ITEM:
            let _shoppingCartCopy = state.shoppingCart;
            const cartItemsClone = [..._shoppingCartCopy.cartItems];
            cartItemsClone.splice(0, 0, action.data.cartItems[0]);
            return {
                ...state, shoppingCart: {
                    cartItems: cartItemsClone,
                    amountItems: action.data.amountItems,
                    totalProducts: action.data.totalProducts,
                    totalProductsChecked: action.data.totalProductsChecked,
                    subtotalChecked: action.data.subtotalChecked,
                    totalCartItems: action.data.totalCartItems,
                }
                , loading: false
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
        case SET_PRODUCT_POST_BODY:
            return {
                ...state,
                productBodyPost: action.productBodyPost
            }

        case ON_END_REACHED_SHOPPING_CART:
            return { ...state, loadingEndReached: true };
        default:
            return state;
    }
}

export default shoppingCartReducer;