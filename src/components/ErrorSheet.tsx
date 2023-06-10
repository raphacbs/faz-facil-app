import React from "react";
import { Text, View, StyleSheet } from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { Button } from "react-native-paper";
import { myTheme } from "../theme/theme";

interface ErrorSheetProps {}

const ErrorSheet: React.FC<SheetProps> = ({
  sheetId,
  payload,
}: SheetProps<{ onTry: () => void }>) => {
  return (
    <ActionSheet
      containerStyle={{
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
      }}
      id={sheetId}
    >
      <View style={styles.container}>
        <Text
          style={{
            marginTop: 20,
            color: "black",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Ops! Algo saiu de forma inesperada.
        </Text>
        <Button
          mode="contained"
          buttonColor={myTheme.colors.secondary}
          onPress={() => {
            payload?.onTry && payload.onTry();
          }}
        >
          Tentar novamente
        </Button>
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
});
export default ErrorSheet;
