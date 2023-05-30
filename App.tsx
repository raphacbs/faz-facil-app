import store from "./src/store";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import ThemeProvider from "./src/theme/ThemeProvider";
import { myTheme } from "./src/theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import MainTabScreen from "./src/navigation/MainTabScreen";
import { PaperProvider } from "react-native-paper";
import { SheetProvider } from "react-native-actions-sheet";
import "./src/sheets";
import { getUnits } from "./src/store/actions/unitAction";
import { useEffect, useState } from "react";
import { Unit } from "./src/types/Unit";

export default function App() {
  const [units, setUnits] = useState<Array<Unit>>([]);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5000,
      },
    },
  });

  useEffect(() => {
    refreshUnits();
  }, []);

  const refreshUnits = async () => {
    const data = await getUnits();
    setUnits(data.items);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PaperProvider>
          <ThemeProvider theme={myTheme}>
            <SheetProvider>
              <NavigationContainer>
                <StatusBar style="auto" />
                <MainTabScreen units={units} />
              </NavigationContainer>
            </SheetProvider>
          </ThemeProvider>
        </PaperProvider>
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
