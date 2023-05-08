import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import { authWithGoogle, setUserInfoLogged } from "../store/actions/userAction";

interface GoogleButtonProps {
  onPress: () => void;
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

const GoogleButton = ({ onPress, title }: GoogleButtonProps) => {
  const [accessToken, setAccessToken] = useState<string>();
  //@ts-ignore
  const userInfo = useSelector((state) => state.userInfo.userInfoLogged);
  const redirectUri = AuthSession.makeRedirectUri(REDIRECT_PARAMS);
  const dispatch = useDispatch();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "643456601165-0cebtqk0d2044f09a6r1oan7e17hjr32.apps.googleusercontent.com",
    iosClientId:
      "643456601165-ogg0pfttuts6ifcpduuj76d5j5luq7d4.apps.googleusercontent.com",
    expoClientId:
      "643456601165-0a090qf2g91ibf39pgj1iaujtokf4psa.apps.googleusercontent.com",
    webClientId:
      "643456601165-j1ldmi18n67i4m22i2aid3qc44fo1fl9.apps.googleusercontent.com",
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
        console.log("userInfo", userInfo);
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
