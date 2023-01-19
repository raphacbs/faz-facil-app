import { CLEAR_ERROR, IS_SIGNED_IN, SET_ERROR, SET_LOADING } from "./types";

export const setLoading: any = (isLoading: boolean) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_LOADING,
      loading: isLoading,
    });
  };
};

export const isSignIn: any = (isSignInParam: boolean) => {
  return (dispatch: any) => {
    dispatch({
      type: IS_SIGNED_IN,
      isSignedIn: isSignInParam,
    });
  };
};

export const setError: any = (error: any) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_ERROR,
      message: error.message ? error.message : "Erro desconhecido",
    });
  };
};
export const clearError: any = () => {
  return (dispatch: any) => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };
};
