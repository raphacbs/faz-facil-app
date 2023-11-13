import { FC, PropsWithChildren } from "react";
import { AuthContextProvider, AuthContextType } from "../context";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useDispatch,
} from "../hooks";

import { deleteToken, getToken, setToken } from "../services/TokenService";
import { CLEAR_ERROR, SET_ERROR } from "../store/actions/types";
import jwtDecode from "jwt-decode";

import { SignUpFormValues, UserSigned } from "../types";
import { secureStore } from "../utils/secureStore";
import apiAuth from "../services/apiAuth";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  const [userSigned, setUserSigned] = useState<UserSigned | null>();
  const { setItem, getItem, removeItem } = secureStore;
  const dispatch = useDispatch();
  const endPointLogin = "/api/v1/user/login";
  const endPointRegister = "/api/v1/user/register";
  useEffect(() => {
    const bootstrap = async () => {
      const token = await getToken();
      const userJson: any = await getItem("userSigned");
      const user = JSON.parse(userJson);
      setUserSigned(user);
      setIsSignedIn(!!token);
    };

    bootstrap();
  }, []);

  const signIn: AuthContextType["signIn"] = useCallback(async (data) => {
    try {
      dispatch({ type: CLEAR_ERROR });
      const response = await apiAuth.post(endPointLogin, data);
      const token = response.data.token;
      const payload: UserSigned = jwtDecode(token);
      console.log("payload", payload);
      payload.initials = getInitials(
        payload.firstName + " " + payload.lastName
      );
      setItem("userSigned", JSON.stringify(payload));
      setUserSigned(payload);
      await setToken(token);
      setIsSignedIn(true);
    } catch (error: any) {
      console.log("error", error);
      setIsSignedIn(false);
      let message = "errors.unknown";
      if (error.message.includes("401")) {
        message = "errors.user_or_password_error";
      }
      dispatch({ type: SET_ERROR, error: message });
    }
  }, []);

  const signOut = useCallback(async () => {
    await deleteToken();
    dispatch({ type: CLEAR_ERROR });
    await removeItem("userSigned");
    setIsSignedIn(false);
  }, []);

  const signUp = useCallback(async (data: SignUpFormValues) => {
    try {
      dispatch({ type: CLEAR_ERROR });
      const response = await apiAuth.post(endPointRegister, data);
      const user: UserSigned = response.data;
      await signIn({
        email: data.email,
        password: data.password,
      });
    } catch (error: any) {
      setIsSignedIn(false);
      let message = "errors.unknown";
      if (error.message.includes("409")) {
        message = "errors.email_already";
      }
      dispatch({ type: SET_ERROR, error: message });
    }
  }, []);

  const getInitials = (fullName: string) => {
    let rgx = new RegExp(/\b(\p{L})/gu);

    let initials: string[] = [];

    let match: RegExpMatchArray | null;
    while ((match = rgx.exec(fullName)) !== null) {
      initials.push(match[1].toUpperCase());
    }

    return initials.join("");
  };

  const value = useMemo(() => {
    return {
      isSignedIn,
      userSigned,
      signIn,
      signOut,
      signUp,
    };
  }, [isSignedIn, userSigned, signIn, signOut, signUp]);

  return <AuthContextProvider value={value}>{children}</AuthContextProvider>;
};
