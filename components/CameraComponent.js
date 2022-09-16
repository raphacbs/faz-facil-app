import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { VStack, Avatar, Text, Center, Icon, HStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";

const CameraComponent = (props) => {
  const [pickedImagePath, setPickedImagePath] = useState(props.pickedImagePath);

  // useEffect(() => {
  //   setPickedImagePath(props.pickedImagePath);
  // }, [props.pickedImagePath]);

  useEffect(() => {
    if (pickedImagePath == undefined) {
      (async () => {
        const image = Asset.fromModule(require("../assets/icon.png"));
        await image.downloadAsync();

        const manipResult = await manipulateAsync(
          image.localUri,
          [{ resize: { width: 230, height: 230 } }],
          { compress: 0.2, format: SaveFormat.PNG }
        );
        console.log("image", manipResult);
        setPickedImagePath(manipResult.uri);
        props.onSelectImage(manipResult.uri);
      })();
    }
  }, []);

  const showImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!image.cancelled) {
      const manipResult = await manipulateAsync(
        image.uri,
        [{ resize: { width: 230, height: 230 } }],
        { compress: 0.2, format: SaveFormat.PNG }
      );
      setPickedImagePath(manipResult.uri);
      props.onSelectImage(manipResult.uri);
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });

    if (!image.cancelled) {
      if (image.hasOwnProperty("uri")) {
        const manipResult = await manipulateAsync(
          image.uri,
          [{ resize: { width: 230, height: 230 } }],
          { compress: 0.2, format: SaveFormat.PNG }
        );
        console.log(manipResult.uri);
        setPickedImagePath(manipResult.uri);
        props.onCaptureImage(manipResult.uri);
      }
    }
  };

  return (
    <VStack justifyContent={"center"}>
      <HStack>
        <Avatar
          bg="green.500"
          source={{
            uri: pickedImagePath,
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
