import React, { ReactNode, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  SafeAreaView,
} from "react-native";
import { myTheme } from "../../src/theme/theme";
import { useSelector } from "react-redux";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import AuthScreen from "../screens/AuthScreen";
import GoogleButton from "./GoogleButton";

interface ContainerProps {
  isLoading: boolean;
  error: any;
  children: ReactNode;
  isLogged?: boolean;
  showButtonAuth?: boolean;
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
  isLogged = true,
  showButtonAuth = true,
  tryAgain,
}) => {
  useEffect(() => {}, [isLogged]);
  if (!showButtonAuth) {
    return <></>;
  }

  if (!isLogged) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>
          Para utilizar esta funcionalidade, é necessário realizar o login.
        </Text>
        <GoogleButton title={"Login com o Google"} />
      </View>
    );
  }

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
    <SafeAreaView style={[styles.containerChildren, style]}>
      {React.Children.map(children, (child) => {
        return child;
      })}
    </SafeAreaView>
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
  infoText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default Container;
