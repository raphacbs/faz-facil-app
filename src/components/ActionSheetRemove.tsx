import React, { useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from "react-native-actions-sheet";
import { Item } from "../types/Item";
import { Button } from "react-native-paper";
import { myTheme } from "../theme/theme";

interface ActionSheetRemoveProps {}

const ActionSheetRemove: React.FC<SheetProps> = ({
  sheetId,
  payload,
}: SheetProps<{ item: Item }>) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  return (
    <ActionSheet
      id={sheetId}
      ref={actionSheetRef}
      onBeforeShow={() => {}}
      snapPoints={[50]}
      initialSnapIndex={1}
      statusBarTranslucent
      drawUnderStatusBar={true}
      gestureEnabled={true}
      defaultOverlayOpacity={0.3}
      payload={payload}
      onClose={() => {}}
      enableRouterBackNavigation={true}
    >
      <Text style={styles.text}>
        Deseja remover o item {payload?.item.product.description}?
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          icon="trash-can-outline"
          mode="contained"
          buttonColor={myTheme.colors.danger}
          onPress={() => {
            actionSheetRef.current?.hide();
          }}
        >
          Sim
        </Button>
        <Button
          icon="trash-can-outline"
          mode="contained"
          buttonColor={myTheme.colors.light}
          onPress={() => {
            actionSheetRef.current?.hide();
          }}
        >
          Não
        </Button>
      </View>
    </ActionSheet>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
  },
  text: {
    fontSize: 15,
    alignSelf: "center",
  },
});
export default ActionSheetRemove;
