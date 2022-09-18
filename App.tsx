import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { NavigationContainer } from "@react-navigation/native";
import ScreenSnack from "./src/navigations/ScreenSnack";
import { theme } from "./src/styles/themes";

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <StatusBar style="light" />
          <ScreenSnack />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
