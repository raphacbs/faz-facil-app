import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import { authWithGoogle } from "../store/actions/userAction";
import { Env } from "../Env";

interface GoogleButtonProps {
  // onPress: () => void;
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

const GoogleButton = ({ title }: GoogleButtonProps) => {
  const [accessToken, setAccessToken] = useState<string>();
  //@ts-ignore
  const userInfoLogged = useSelector((state) => state.userInfo.userInfoLogged);
  const redirectUri = AuthSession.makeRedirectUri(REDIRECT_PARAMS);
  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: Env.GOOGLE_CREDENTIALS.ANDROID_CLIENT_ID,
    iosClientId: Env.GOOGLE_CREDENTIALS.IOS_CLIENT_ID,
    expoClientId: Env.GOOGLE_CREDENTIALS.EXPO_CLIENT_ID,
    webClientId: Env.GOOGLE_CREDENTIALS.WEB_CLIENT_ID,
    redirectUri,
  });

  const handleUserInfo = async () => {
    if (accessToken == undefined || accessToken == null) {
      //@ts-ignore
      await promptAsync(REDIRECT_PARAMS);
    }
  };

  useEffect(() => {
    console.log("response", response);
    async function getUser() {
      if (response?.type == "success" && response.authentication) {
        setAccessToken(response.authentication.accessToken);
        dispatch(authWithGoogle(response.authentication.accessToken));
      }
    }
    getUser();
  }, [response]);

  return (
    <TouchableOpacity style={styles.button} onPress={handleUserInfo}>
      <Ionicons name="logo-google" size={24} color="white" />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DB4437",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
    color: "white",
  },
});

export default GoogleButton;
