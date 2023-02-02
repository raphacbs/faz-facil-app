import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { NavigationContainer } from "@react-navigation/native";
import ScreenSnack from "./src/navigations/ScreenSnack";
import { theme } from "./src/styles/themes";
import i18n from "./src/i18n";

import AppProvider from "./src/providers/AppProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./src/providers/AuthProvider";

export default function App() {
  i18n;
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NativeBaseProvider theme={theme}>
          <AppProvider>
            <AuthProvider>
              <NavigationContainer>
                <QueryClientProvider client={queryClient}>
                  <StatusBar style="auto" />
                  <ScreenSnack />
                </QueryClientProvider>
              </NavigationContainer>
            </AuthProvider>
          </AppProvider>
        </NativeBaseProvider>
      </SafeAreaProvider>
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
