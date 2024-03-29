import axios from "axios";
import api, { config } from "../../services/api";
import { SET_ERROR, SET_LOADING_PRICE, SET_PRICE_HISTORY } from "./types";

const endPoint = '/api/v1/price-histories';

export const getByProductId: any = (productId: string) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: SET_LOADING_PRICE, payload: true });
            const response = await api.get(`${endPoint}?productId=${productId}&pageNo=0&pageSize=10&sortDir=asc&sortBy=date`);
            dispatch({ type: SET_PRICE_HISTORY, priceHistoryList: response.data.content })

        } catch (error: any) {
            let message = error ? error.message + ' - ' + error.code : 'Erro desconhecido';
            dispatch({ type: SET_ERROR, error: message });
        }
    }
}