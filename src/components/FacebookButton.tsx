import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import {
  authWithFacebook,
  authWithGoogle,
  setUserInfoLogged,
} from "../store/actions/userAction";
import { Env } from "../Env";

interface FacebookButtonProps {
  title: string;
}

WebBrowser.maybeCompleteAuthSession();
const EXPO_REDIRECT_PARAMS = {
  useProxy: true,
  projectNameForProxy: "@raphacbs/faz-feira",
};
const NATIVE_REDIRECT_PARAMS = { native: "com.raphacbs.fazfeiraapp://" };
const REDIRECT_PARAMS =
  Constants.appOwnership === "expo"
    ? EXPO_REDIRECT_PARAMS
    : NATIVE_REDIRECT_PARAMS;

const FacebookButton = ({ title }: FacebookButtonProps) => {
  const [accessToken, setAccessToken] = useState<string>();
  //@ts-ignore
  const userInfo = useSelector((state) => state.userInfo.userInfoLogged);
  const redirectUri = AuthSession.makeRedirectUri(REDIRECT_PARAMS);
  const dispatch = useDispatch();

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: Env.FACEBOOK_APP_ID, //"635889885070244",
  });

  if (request) {
    console.log(
      "You need to add this url to your authorized redirect urls on your Facebook app: " +
        request.redirectUri
    );
  }

  const handleUserInfo = async () => {
    if (accessToken == undefined || accessToken == null) {
      //@ts-ignore
      await promptAsync();
    }
  };

  useEffect(() => {
    console.log("response", response);
    async function getUser() {
      if (response?.type == "success" && response.authentication) {
        // setAccessToken(response.authentication.accessToken);
        dispatch(authWithFacebook(response.authentication.accessToken));
        console.log("userInfo", userInfo);
        console.log(response.authentication.accessToken);
      }
    }
    getUser();
  }, [response]);

  return (
    <TouchableOpacity style={styles.button} onPress={handleUserInfo}>
      <Ionicons name="logo-facebook" size={24} color="white" />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1877f2",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default FacebookButton;
