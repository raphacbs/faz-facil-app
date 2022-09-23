import { Stack } from "native-base";
import React from "react";
import Spinner from "react-native-loading-spinner-overlay";

const LoadingComponent = (props) => {
  return (
    <Stack {...props} flex={1}>
      <Spinner
        visible={props.visible}
        textContent={"Carregando..."}
        textStyle={{ color: "#FFF" }}
      />
      {props.children}
    </Stack>
  );
};

export default LoadingComponent;
