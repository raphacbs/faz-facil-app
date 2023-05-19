import React from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";
import GoogleButton from "../components/GoogleButton";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/Container";

const AuthScreen = () => {
  //@ts-ignore
  const userInfo = useSelector((state) => state.userInfo.userInfoLogged);
  return (
    <Container isLoading={false} error={null} style={styles.container}>
      <Text style={styles.infoText}>
        Para utilizar esta funcionalidade, é necessário realizar o login.
      </Text>
      <GoogleButton title={"Login com o Google"} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
  },
  infoText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default AuthScreen;
