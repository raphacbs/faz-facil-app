import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { VStack, Avatar, Text, Center, Icon, HStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";

const CameraComponent = (props) => {
  const [pickedImagePath, setPickedImagePath] = useState(props.pickedImagePath);

  useEffect(() => {
    setPickedImagePath(props.pickedImagePath);
  }, [props.pickedImagePath]);

  const showImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      props.onSelectImage(result.uri);
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      props.onCaptureImage(result.uri);
    }
  };

  return (
    <VStack justifyContent={"center"}>
      <HStack>
        <Avatar
          bg="green.500"
          source={{
            uri:
              pickedImagePath !== undefined
                ? pickedImagePath
                : "https://drive.google.com/uc?id=1w361FjVApKKJn6g8H5NVZ3IVbL-fSpo4",
          }}
          size="2xl"
        ></Avatar>

        {/* <TouchableOpacity onPress={openCamera}>
          <Text fontWeight={"bold"}>Alterar imagem</Text>
        </TouchableOpacity> */}
      </HStack>
      <HStack>
        <HStack space={10}>
          <Icon
            as={<Ionicons name="ios-camera" />}
            size={6}
            ml="3"
            color="muted.400"
            onPress={openCamera}
            alignSelf="flex-end"
            disabled={props.disabled}
          />
          <HStack>
            <Icon
              as={<Entypo name="image" />}
              size={6}
              ml="3"
              color="muted.400"
              onPress={showImagePicker}
              alignSelf="flex-end"
              disabled={props.disabled}
            />
          </HStack>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default CameraComponent;
