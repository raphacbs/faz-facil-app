import React, { ReactNode } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { myTheme } from "../../src/theme/theme";

interface ContainerProps {
  isLoading: boolean;
  error: any;
  children: ReactNode;
  style?: ViewStyle;
  loadingMessage?: string;
  tryAgain?: () => void;
}
const Container: React.FC<ContainerProps> = ({
  isLoading,
  children,
  error,
  style,
  loadingMessage,
  tryAgain,
}) => {
  if (isLoading) {
    // Exibe um spinner no centro da tela enquanto está carregando
    return (
      <View style={styles.container}>
        <ActivityIndicator size={80} color={myTheme.colors.primary} />
        {loadingMessage && <Text>{loadingMessage}</Text>}
      </View>
    );
  }

  if (error) {
    // Exibe a mensagem de erro e o botão para retentar
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Ops!!! Algo de errado aconteceu :(</Text>
        {/* <Text style={styles.errorText}>{error}</Text> */}
        {tryAgain && (
          <TouchableOpacity style={styles.tryAgainButton} onPress={tryAgain}>
            <Text style={styles.tryAgainButtonText}>Tentar novamente</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.containerChildren, style]}>
      {React.Children.map(children, (child) => {
        return child;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerChildren: {
    flex: 1,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  tryAgainButton: {
    backgroundColor: "#000000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  tryAgainButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Container;
