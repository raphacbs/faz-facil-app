import api from "../../services/api";
import { setToken } from "../../services/TokenService";
import { SignInFormValues } from "../../types";
import {
  CLEAR_ERROR,
  DEFAULT_LOADING,
  IS_SIGNED_IN,
  OFF_LOADING,
  ON_LOADING,
  SET_ERROR,
  SIGN_IN_LOADING,
} from "./types";

const endPoint = "/api/v1/user/login";

export const signIn: any = (data: SignInFormValues) => {
  return async (dispatch: any) => {
    try {
      await dispatch({ type: ON_LOADING });
      await dispatch({ type: CLEAR_ERROR });
      const response = await api.post(endPoint, data);
      const token = response.data.token;
      await setToken(token);
      await dispatch({ type: OFF_LOADING });
      await dispatch({ type: IS_SIGNED_IN, payload: true });
    } catch (error: any) {
      await dispatch({ type: OFF_LOADING });
      let message = "errors.unknown";
      if (error.message.includes("401")) {
        message = "errors.user_or_password_error";
      }
      await dispatch({ type: SET_ERROR, error: message });
    }
  };
};
