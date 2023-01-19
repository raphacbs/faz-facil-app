import {
  ERROR,
  DEFAULT_LOADING,
  OFF_LOADING,
  SET_LOADING,
  SET_ERROR,
  CLEAR_ERROR,
  SHOW_LOADING_SHOPPING_CART_ITEM,
  IS_SIGNED_IN,
  ON_LOADING,
} from "../actions/types";

const initialState = {
  error: "",
  loading: false,
  isError: false,
  isSignedIn: false,
};
const commonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ERROR:
      return { ...state, error: action.error, loading: false, showAlert: true };
    case DEFAULT_LOADING:
      return { ...state, loading: true };
    case ON_LOADING:
      return { ...state, loading: true };
    case OFF_LOADING:
      return { ...state, loading: false };
    case SET_LOADING:
      return { ...state, loading: action.loading };
    case SET_ERROR:
      return { ...state, loading: false, error: action.error, isError: true };
    case CLEAR_ERROR:
      return { ...state, loading: false, error: "", isError: false };
    case IS_SIGNED_IN:
      return { ...state, isSignedIn: action.isSignedIn };
    default:
      return state;
  }
};

export default commonReducer;
