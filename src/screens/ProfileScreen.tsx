import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { logout } from "../store/actions/userAction";
import { UserInfo } from "../types/UserInfo";
import { useDispatch, useSelector } from "react-redux";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Container from "../components/Container";
import { myTheme } from "../theme/theme";

const { height } = Dimensions.get("window");
const imageContainerHeight = height * 0.3;

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation: NavigationProp<ReactNavigation.RootParamList> =
    useNavigation();
  const logoutHandle = async () => {
    dispatch(logout());
  };

  const {
    isLogged,
    userInfoLogged,
  }: { isLogged: boolean; userInfoLogged: UserInfo } = useSelector(
    //@ts-ignore
    (state) => state.userInfo
  );

  return (
    <Container
      isLogged={isLogged}
      style={styles.container}
      isLoading={false}
      error={undefined}
    >
      <View style={styles.topBlock} />

      {userInfoLogged && (
        <View style={styles.userImageContainer}>
          <Image
            source={{ uri: userInfoLogged.picture }}
            style={styles.userImage}
          />
          <Text style={styles.userName}>{userInfoLogged.name}</Text>
          <Text style={styles.userEmail}>{userInfoLogged.email}</Text>
        </View>
      )}

      <TouchableOpacity onPress={logoutHandle} style={styles.logoutIcon}>
        <Feather name="log-out" size={24} color={myTheme.colors.light} />
      </TouchableOpacity>

      <StatusBar style="light" backgroundColor={myTheme.colors.primary} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBlock: {
    height: imageContainerHeight,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: myTheme.colors.primary,
  },
  userImageContainer: {
    position: "absolute",
    top: imageContainerHeight * 0.15,
    alignSelf: "center",
    zIndex: 1,
  },
  userImage: {
    alignSelf: "center",
    width: imageContainerHeight * 0.5,
    height: imageContainerHeight * 0.5,
    borderRadius: (imageContainerHeight * 0.5) / 2,
    borderWidth: 2,
    borderColor: "#fff",
  },
  userName: {
    color: myTheme.colors.light,
    alignSelf: "center",
    fontSize: 30,
  },
  userEmail: {
    color: myTheme.colors.light,
    alignSelf: "center",
    fontSize: 15,
  },
  logoutIcon: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  backIcon: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
});

export default ProfileScreen;
