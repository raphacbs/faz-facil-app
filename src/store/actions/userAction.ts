import { UserInfo } from "@/types/UserInfo";
import { auth } from "../../services/authGoogle";

export const authWithGoogle: any = (token: string) => {
  return async (dispatch: any) => {
    try {
      const userInfo = await auth(token);
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
