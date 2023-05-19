import { UserInfo } from "../../types/UserInfo";
import { authFacebook, authGoogle } from "../../services/apiAuth";
import * as SecureStore from "expo-secure-store";
import useConstants from "../../hooks/useConstants";

const { USER_LOGGER, SET_USER_INFO_LOGGED } = useConstants();

export const authWithGoogle: any = (token: string) => {
  return async (dispatch: any) => {
    try {
      const userInfo = await authGoogle(token);
      await SecureStore.setItemAsync(USER_LOGGER, userInfo);
      dispatch({
        type: SET_USER_INFO_LOGGED,
        payload: userInfo,
      });
    } catch (error) {}
  };
};
export const getUserLogged = async (): Promise<UserInfo> => {
  const string = await SecureStore.getItemAsync(USER_LOGGER);
  return JSON.parse(string ? string : "{}");
};

export const authWithFacebook: any = (token: string) => {
  return async (dispatch: any) => {
    try {
      const userInfo = await authFacebook(token);
      dispatch({
        type: "SET_USER_INFO_LOGGED",
        payload: userInfo,
      });
    } catch (error) {}
  };
};

export const setUserInfoLogged: any = (userInfo: UserInfo) => {
  return (dispatch: any) => {
    try {
      dispatch({
        type: "SET_USER_INFO_LOGGED",
        payload: userInfo,
      });
    } catch (error) {}
  };
};
