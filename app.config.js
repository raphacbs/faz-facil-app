import "dotenv/config";
export default () => ({
  expo: {
    name: "Faz Feira",
    slug: "faz-feira",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    scheme: "com.raphacbs.fazfeiraapp", // "fb635889885070244"],
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#007bff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSCameraUsageDescription: "Allow $(PRODUCT_NAME) to access camera.",
        NSMicrophoneUsageDescription:
          "Allow $(PRODUCT_NAME) to access your microphone",
      },
      bundleIdentifier: "com.raphacbs.fazfeiraapp",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.raphacbs.fazfeiraapp",
      permissions: [
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO",
      ],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "24784022-2fe9-4f30-9f2e-0251b6b16edb",
      },
      googleSignIn: {
        androidClientId:
          "44441057218-kdf86o25q9hnq142cg7sa8u0ueomngak.apps.googleusercontent.com",
        expoClientId:
          "44441057218-am9cvl3t8tv880pblatp8dln5nqto3eo.apps.googleusercontent.com",
      },
      API_BASE_URL: process.env.API_BASE_URL,
      API_AUTH_BASE_URL: process.env.API_BASE_URL,
      FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
      ANDROID_CLIENT_ID: process.env.ANDROID_CLIENT_ID,
      IOS_CLIENT_ID: process.env.IOS_CLIENT_ID,
      EXPO_CLIENT_ID: process.env.EXPO_CLIENT_ID,
      WEB_CLIENT_ID: process.env.WEB_CLIENT_ID,
    },
    plugins: [
      [
        "expo-barcode-scanner",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access camera.",
        },
      ],
      [
        "expo-camera",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera.",
        },
      ],
    ],
    owner: "raphacbs",
  },
});
