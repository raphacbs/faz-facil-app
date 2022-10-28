
import { PriceHistoryModel } from "../../services/models";
import { SET_LOADING_PRICE, SET_PRICE_HISTORY } from "../actions/types";

const initialState: PriceHistoryModel = {
    priceHistoryList: [],
    lastPrice: {
        date: "",
        id: "",
        price: "",
        productId: "",
        supermarketId: ""
    },
    loadingPrice: false
}

const priceHistoryReducer = (state: PriceHistoryModel = initialState, action: any) => {
    console.log("priceHistoryReducer", action.type);
    switch (action.type) {
        case SET_LOADING_PRICE:
            return {
                ...state,
                loadingPrice: action.payload
            }
        case SET_PRICE_HISTORY:

            return {
                ...state,
                loadingPrice: false,
                priceHistoryList: action.priceHistoryList,
                lastPrice: action.priceHistoryList.length > 0 ? action.priceHistoryList[action.priceHistoryList.length - 1] : initialState.lastPrice
            }
        default:
            return state;
    }
}

export default priceHistoryReducer;