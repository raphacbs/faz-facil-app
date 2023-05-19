import Constants from "expo-constants";

function getApiBaseUrl() {
  const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is missing.");
  }

  return API_BASE_URL;
}

function getApiAuthBaseUrl() {
  const API_AUTH_BASE_URL = Constants.expoConfig?.extra?.API_AUTH_BASE_URL;

  if (!API_AUTH_BASE_URL) {
    throw new Error("API_AUTH_BASE_URL is missing.");
  }

  return API_AUTH_BASE_URL;
}

function getGoogleCredentials() {
  const GOOGLE_CREDENTIALS = {
    ANDROID_CLIENT_ID: Constants.expoConfig?.extra?.ANDROID_CLIENT_ID,
    IOS_CLIENT_ID: Constants.expoConfig?.extra?.IOS_CLIENT_ID,
    EXPO_CLIENT_ID: Constants.expoConfig?.extra?.EXPO_CLIENT_ID,
    WEB_CLIENT_ID: Constants.expoConfig?.extra?.WEB_CLIENT_ID,
  };

  return GOOGLE_CREDENTIALS;
}

function getFacebookAppId() {
  const FACEBOOK_APP_ID = Constants.expoConfig?.extra?.FACEBOOK_APP_ID;

  if (!FACEBOOK_APP_ID) {
    throw new Error("FACEBOOK_APP_ID is missing.");
  }

  return FACEBOOK_APP_ID;
}

export const Env = {
  API_BASE_URL: getApiBaseUrl(),
  API_AUTH_BASE_URL: getApiAuthBaseUrl(),
  FACEBOOK_APP_ID: getFacebookAppId(),
  GOOGLE_CREDENTIALS: getGoogleCredentials(),
};
