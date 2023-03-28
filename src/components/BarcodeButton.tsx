import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { myTheme } from "../theme/theme";

type BarcodeButtonProps = {
  onPress: () => void;
};

const BarcodeButton = ({ onPress }: BarcodeButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name="barcode-scan" size={50} color="#fff" />
      {/* <Text style={styles.buttonText}>Ler Código de Barras</Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: myTheme.colors.primary,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "center",
  },
  buttonText: {
    color: myTheme.colors.light,
    alignSelf: "center",
  },
});

export default BarcodeButton;
