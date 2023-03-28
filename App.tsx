import store from "./src/store";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import ThemeProvider from "./src/theme/ThemeProvider";
import { myTheme } from "./src/theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import MainTabScreen from "./src/navigation/MainTabScreen";

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5000,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={myTheme}>
          <NavigationContainer>
            <StatusBar style="auto" />
            <MainTabScreen />
          </NavigationContainer>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
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
