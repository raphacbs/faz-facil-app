import React from "react";
import { Text } from "react-native";
import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { Button } from "react-native-paper";
import { myTheme } from "../theme/theme";

interface ConfirmSheetProps {}

const ConfirmSheet: React.FC<SheetProps> = (
  props: SheetProps<{ message: string }>
) => {
  return (
    <ActionSheet id={props.sheetId}>
      <Text
        style={{
          marginBottom: 10,
          color: "black",
        }}
      >
        {props.payload?.message}
      </Text>
      <Button
        mode="contained"
        buttonColor={myTheme.colors.secondary}
        style={{ marginLeft: 30 }}
        onPress={() => {
          SheetManager.hide(props.sheetId, {
            payload: false,
          });
        }}
      >
        Não
      </Button>
      <Button
        mode="contained"
        buttonColor={myTheme.colors.primary}
        style={{ marginLeft: 30 }}
        onPress={() => {
          SheetManager.hide(props.sheetId, {
            payload: false,
          });
        }}
      >
        Sim
      </Button>
    </ActionSheet>
  );
};

export default ConfirmSheet;
