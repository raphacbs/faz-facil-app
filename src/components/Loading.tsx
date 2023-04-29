import React from "react";
import { Modal, View, ActivityIndicator, StyleSheet } from "react-native";

type LoadingProps = {
  active: boolean;
};

const Loading: React.FC<LoadingProps> = ({ active }) => {
  return (
    <Modal visible={active} transparent={true}>
      <View style={styles.container}>
        <ActivityIndicator size={100} color="#F2F2F2" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
});

export default Loading;
