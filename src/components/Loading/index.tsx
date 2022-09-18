import React from "react";
import LottieView from "lottie-react-native";
import { Center, HStack, VStack } from "native-base";
import { animation } from "./style";

export default Loading = () => {
  return (
    <Center h="100%">
      <LottieView
        source={require("../../../assets/loading_animation.json")}
        style={animation}
        autoPlay
      />
    </Center>
  );
};
