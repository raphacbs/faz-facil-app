import { GET_SHOPPING_LISTS, DEFAULT_LOADING, ERROR, SHOW_ALERT } from "./types";
import { api } from '../../services/api';
import { Alert } from "../../services/models";

const endPoint = '/api/v1/shopping-carts';

export const getAll = (isArchived: boolean) => {
    return async (dispatch: any) => {
        try {
            const response = await api.get(`${endPoint}?isArchived=${isArchived}`);
            dispatch({ type: DEFAULT_LOADING, shoppingLists: [] })
            dispatch({ type: GET_SHOPPING_LISTS, shoppingLists: response.data })
        } catch (error) {
            dispatch({ type: ERROR, error });
            dispatch({ type: GET_SHOPPING_LISTS, shoppingLists: [] })
        }
    }
}
