import { ERROR, DEFAULT_LOADING, OFF_LOADING, SET_LOADING } from "../actions/types";

const initialState = {
    error: '',
    loading: false,
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
        default:
            return state;
    }
}

export default commonReducer;