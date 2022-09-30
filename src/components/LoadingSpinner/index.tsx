import React from "react";
import LottieView from "lottie-react-native";
import { Center, HStack, VStack } from "native-base";
import { animation } from "./style";
import { connect } from "react-redux";

interface Props {
  loading: boolean;
  children: any;
}

const Loading = (props: Props) => {
  const { loading, children } = props;
  return (
    <Center>
      {loading ? (
        <LottieView
          source={require("../../../assets/loading-spinner.json")}
          style={animation}
          autoPlay
          autoSize
        />
      ) : (
        children
      )}
    </Center>
  );
};

export default connect()(Loading);
