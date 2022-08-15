import React from "react";
import Spinner from "react-native-loading-spinner-overlay";

const LoadingComponent = (props) => {
  return (
    <Spinner
      visible={props.visible}
      textContent={"Carregando..."}
      textStyle={{ color: "#FFF" }}
    />
  );
};

export default LoadingComponent;
