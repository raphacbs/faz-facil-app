import { Heading, Stack, VStack, Center, Text, Button } from "native-base";
import { useTranslation } from "../../hooks";

import React, { ReactElement } from "react";
import LottieView from "lottie-react-native";

type Props = {
  loading: boolean;
  error: any;
  children: ReactElement;
  tryAgain: () => void;
};

const Container = (props: Props) => {
  const { loading, error, children, tryAgain } = props;
  const { t } = useTranslation();

  return (
    <Stack w={"100%"} h={"100%"}>
      {loading ? (
        <Center h={"80%"}>
          <VStack>
            <Center>
              <LottieView
                source={require("../../../assets/loading_animation.json")}
                style={{
                  width: 150,
                  height: 150,
                  marginTop: "5%",
                }}
                autoPlay
              />
            </Center>
          </VStack>
        </Center>
      ) : error == null ? (
        children
      ) : (
        <Center>
          <LottieView
            source={require("../../../assets/error_animation.json")}
            style={{
              width: 150,
              height: 150,
              marginTop: "5%",
            }}
            autoPlay
          />
          <Heading size={"sm"}>Ops! Ocorreu um erro.</Heading>
          <Text color={"red"} marginBottom={2} fontSize={11}>
            {error.message}
          </Text>
          <Button onPress={tryAgain}>
            {t("form_messages.label_try_again")}
          </Button>
        </Center>
      )}
    </Stack>
  );
};

export default Container;
