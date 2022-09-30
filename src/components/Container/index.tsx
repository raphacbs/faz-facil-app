import React from "react";
import LottieView from "lottie-react-native";
import {
  Button,
  Center,
  Heading,
  HStack,
  Text,
  VStack,
  Stack,
} from "native-base";
import { animation, errorAnimation } from "./style";
import { connect } from "react-redux";
import { RefreshControl } from "react-native";

interface Props {
  children: any;
  loading: boolean;
  with?: string | number;
  isError: boolean;
  error: any;
  refreshControl: boolean;
  onRefresh?: () => void;
}

const Container = (props: Props) => {
  const { loading, children, isError, error, refreshControl, onRefresh } =
    props;
  const w = props.with ? props.with : "100%";
  const [isRefreshing, setRefreshing] = React.useState<boolean>(false);

  const handleRefresh: () => void = () => {
    if (onRefresh) {
      setRefreshing(true);
      onRefresh();
      setRefreshing(false);
    }
  };

  return (
    <Center w={w}>
      {refreshControl ? (
        <RefreshControl
          style={{
            justifyContent: "center",
            //alignSelf: "center",
            alignItems: "center",
            width: w,
          }}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        >
          <Center {...props} w={w} h="100%">
            {isError ? (
              <Center>
                <LottieView
                  source={require("../../../assets/error_animation.json")}
                  style={animation}
                  autoPlay
                />
                <Heading size={"sm"}>Ops! Ocorreu um erro.</Heading>
                <Text marginBottom={2} fontSize={11}>
                  {error}
                </Text>
                <Button onPress={handleRefresh}>Tente Novamente</Button>
              </Center>
            ) : loading ? (
              <Center>
                <LottieView
                  source={require("../../../assets/loading_animation.json")}
                  style={animation}
                  autoPlay
                />
              </Center>
            ) : (
              children
            )}
          </Center>
        </RefreshControl>
      ) : (
        <Stack {...props} w={w} h="100%">
          {isError ? (
            <Center>
              <LottieView
                source={require("../../../assets/error_animation.json")}
                style={errorAnimation}
                autoPlay
              />
              <Heading size={"sm"}>Ops! Ocorreu um erro.</Heading>
              <Text marginBottom={2} fontSize={11}>
                {error}
              </Text>
              <Button onPress={handleRefresh}>Tente Novamente</Button>
            </Center>
          ) : loading ? (
            <Center>
              <LottieView
                source={require("../../../assets/loading_cart.json")}
                style={animation}
                autoPlay
              />
            </Center>
          ) : (
            children
          )}
        </Stack>
      )}
    </Center>
  );
};

const mapStateToProps = (store: any) => {
  return {
    loading: store.commonReducer.loading,
    error: store.commonReducer.error,
    isError: store.commonReducer.isError,
  };
};

export default connect(mapStateToProps)(Container);
