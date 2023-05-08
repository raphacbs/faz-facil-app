import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import GoogleButton from "../components/GoogleButton";
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import { authWithGoogle, setUserInfoLogged } from "../store/actions/userAction";

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

const AuthScreen = () => {
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
        // const userInfo = await auth(response.authentication.accessToken);
        // dispatch(setUserInfoLogged(userInfo));
        dispatch(authWithGoogle(response.authentication.accessToken));
        console.log("userInfo", userInfo);
      }
    }
    getUser();
  }, [response]);

  function showUserInfo() {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          {userInfo.picture && (
            <Image
              source={{ uri: userInfo.picture }}
              style={styles.profilePic}
            />
          )}
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      {showUserInfo()}
      {!accessToken && (
        <GoogleButton onPress={handleUserInfo} title={"Login com o Google"} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
  },
});

export default AuthScreen;
