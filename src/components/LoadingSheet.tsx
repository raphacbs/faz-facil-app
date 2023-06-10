import React, { useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { Button } from "react-native-paper";
import { myTheme } from "../theme/theme";

interface LoadingSheetProps {}

const LoadingSheet: React.FC<SheetProps> = ({
  sheetId,
  payload,
}: SheetProps<{ isLoading: boolean }>) => {
  useEffect(() => {
    if (payload?.isLoading) {
      SheetManager.hide("loading-sheet");
    }
  }, [payload?.isLoading]);

  return (
    <ActionSheet
      containerStyle={{
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
      }}
      id={sheetId}
    >
      <View style={styles.containerLoading}>
        <ActivityIndicator size={80} color={myTheme.colors.primary} />
        <Text>Processando</Text>
      </View>
    </ActionSheet>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 50,
    height: 200,
  },
  containerLoading: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
    marginLeft: 15,
    marginRight: 15,
    height: 200,
  },
});
export default LoadingSheet;
