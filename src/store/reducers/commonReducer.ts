import { ERROR, DEFAULT_LOADING, OFF_LOADING, SET_LOADING, SET_ERROR, CLEAR_ERROR } from "../actions/types";

const initialState = {
    error: '',
    loading: false,
    isError: false,
}
const commonReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ERROR:
            return { ...state, error: action.error, loading: false, showAlert: true };
        case DEFAULT_LOADING:
            return { ...state, loading: true };
        case OFF_LOADING:
            return { ...state, loading: false };
        case SET_LOADING:
            return { ...state, loading: action.loading };
        case SET_ERROR:
            return { ...state, loading: false, error: action.error, isError: true };
        case CLEAR_ERROR:
            return { ...state, loading: false, error: '', isError: false };
        default:
            return state;
    }
}

export default commonReducer;