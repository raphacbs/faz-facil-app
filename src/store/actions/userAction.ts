import { UserInfo } from "../../types/UserInfo";
import { authFacebook, authGoogle } from "../../services/apiAuth";
import * as SecureStore from "expo-secure-store";
import useConstants from "../../hooks/useConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { USER_LOGGER, SET_USER_INFO_LOGGED, SET_IS_LOGGED } = useConstants();

export const authWithGoogle: any = (token: string) => {
  return async (dispatch: any) => {
    try {
      const userInfo = await authGoogle(token);
      //  await SecureStore.setItemAsync(USER_LOGGER, userInfo);
      const jsonValue = JSON.stringify(userInfo);
      await AsyncStorage.setItem(USER_LOGGER, jsonValue);
      dispatch({
        type: SET_USER_INFO_LOGGED,
        payload: userInfo,
      });
    } catch (error) {}
  };
};

export const getUserLogged = async () => {
  // const string = await SecureStore.getItemAsync(USER_LOGGER);
  // return JSON.parse(string ? string : "{}");
  try {
    const jsonValue = await AsyncStorage.getItem(USER_LOGGER);
    const userInfo: UserInfo = jsonValue != null ? JSON.parse(jsonValue) : null;
    return userInfo;
  } catch (e) {
    // error reading value
    console.error(e);
  }
};

export const logout: any = () => {
  return async (dispatch: any) => {
    try {
      await AsyncStorage.removeItem(USER_LOGGER);
      dispatch({
        type: SET_IS_LOGGED,
        payload: false,
      });
    } catch (e) {
      console.error(e);
    }
  };
};

export const signIn: any = () => {
  return async (dispatch: any) => {
    try {
      const jsonValue = await AsyncStorage.getItem(USER_LOGGER);
      const userInfo: UserInfo =
        jsonValue != null ? JSON.parse(jsonValue) : null;
      await dispatch({
        type: SET_IS_LOGGED,
        payload: userInfo != null,
      });
      await dispatch({
        type: SET_USER_INFO_LOGGED,
        payload: userInfo,
      });
    } catch (e) {
      console.error(e);
    }
  };
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
