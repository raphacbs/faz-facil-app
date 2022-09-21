import React from "react";
import LottieView from "lottie-react-native";
import { Center, HStack, VStack } from "native-base";
import { animation } from "./style";

const Loading = (props: any) => {
  return (
    <Center {...props} h="100%">
      <LottieView
        source={require("../../../assets/default_loading.json")}
        style={animation}
        autoPlay
        autoSize
      />
    </Center>
  );
};

export default Loading;
