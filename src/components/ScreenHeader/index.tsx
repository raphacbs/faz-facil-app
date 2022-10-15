import { Props } from "./types";
import { Appbar } from "react-native-paper";
import React from "react";
import { Heading, HStack, IconButton, Stack } from "native-base";
import { SafeAreaView } from "react-native";
import SummaryShoppingCart from "../SummaryShoppingCart";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ScreenHeader({
  title,
  actionOne,
  actionTwo,
  subtitle,
  children,
}: Props) {
  const navigation = useNavigation();
  return (
    <Stack
      paddingTop={12}
      paddingLeft={5}
      paddingRight={5}
      w={"100%"}
      h={"20%"}
      space={2}
      backgroundColor="#0099e6"
    >
      <HStack
        w={"100%"}
        //  marginRight={2}
        space={2}
        alignItems="center"
        justifyContent={"space-around"}
      >
        <IconButton
          size={"md"}
          variant="ghost"
          onPress={() => {
            navigation.goBack();
          }}
          _icon={{
            as: AntDesign,
            name: "left",
            color: "white",
          }}
        />
        <Heading isTruncated color={"white"} paddingRight={1}>
          {title}
        </Heading>
        <IconButton
          size={"md"}
          variant="ghost"
          _icon={{
            as: AntDesign,
            name: "search1",
            color: "white",
          }}
        />
      </HStack>
      <SummaryShoppingCart />
    </Stack>
  );
}
