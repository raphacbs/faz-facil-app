import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ErrorAlertProps {
  errorMessage: string | unknown;
  onClose: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ errorMessage, onClose }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorMessage}>{`Erro ${errorMessage}`}</Text>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Fechar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ff4136",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  errorMessage: {
    color: "#fff",
    fontSize: 16,
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    color: "#ff4136",
    fontWeight: "bold",
  },
});

export default ErrorAlert;
