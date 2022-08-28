import React, { useEffect, useState } from "react";
import {
  Input,
  Icon,
  Box,
  VStack,
  ScrollView,
  View,
  Button,
  HStack,
  Toast,
  Center,
} from "native-base";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Masks, useMaskedInputProps } from "react-native-mask-input";
import NumericInput from "react-native-numeric-input";
import CameraComponent from "./CameraComponent";

const ProductComponent = (props) => {
  const [product, setProduct] = useState({ ...props.product });
  const [isEditing, setIsEditing] = useState(props.isEditing);
  const [amountOfProduct, setAmountOfProduct] = useState(1);
  const [colorEditBtn, setColorEditBtn] = useState(
    isEditing ? "blue.500" : "muted.400"
  );
  const [subtotal, setSubtotal] = useState("");

  useEffect(() => {
    setProduct({ ...props.product });
  }, [props.product]);

  useEffect(() => {
    setIsEditing(props.isEditing);
    setColorEditBtn(props.isEditing ? "blue.500" : "muted.400");
  }, [props.isEditing]);

  const subTotalMaskedInputProps = useMaskedInputProps({
    value: subtotal,
    onChangeText: (text) => setProduct({ ...product, ["subtotal"]: text }),
    mask: Masks.BRL_CURRENCY,
  });

  const handleSubtotal = (count) => {
    setAmountOfProduct(count);
    let unitValue = 0;
    if (product.unitValue != undefined) {
      unitValue = parseFloat(
        product.unitValue.replace(",", ".").replace("R$", "").trim()
      );
    }
    setSubtotal((unitValue * count).toFixed(2).toString().replace(".", ""));
  };

  const onEndEditing = (value) => {
    handleSubtotal(amountOfProduct);
  };

  const unitValueMaskedInputProps = useMaskedInputProps({
    value: product.unitValue,
    onChangeText: (text) => {
      setProduct({ ...product, ["unitValue"]: text });
    },
    mask: Masks.BRL_CURRENCY,
  });

  const insertImage = (path) => {
    setProduct({ ...product, ["image"]: path });
  };

  const insert = () => {
    let item = {
      id: product.id,
      unitValue: product.unitValue.replace("R$", "").trim(),
      amountOfProduct: amountOfProduct,
      image: product.image,
      description: product.description,
      brand: product.brand,
      ean: product.ean,
    };

    props.onInsert(item, isEditing);
  };

  return (
    <VStack
      bgColor={"theme.principal"}
      flex={1}
      alignItems="center"
      justifyContent={"center"}
      width="100%"
    >
      <Box
        width="90%"
        rounded="lg"
        overflow="scroll"
        borderColor="coolGray.200"
        borderWidth="1"
        bgColor={"white"}
        shadow={6}
        h="95%"
      >
        <ScrollView
          maxW="full"
          w="100%"
          h="100%"
          _contentContainerStyle={{
            px: "3px",
            mb: "4",
            minW: "50",
          }}
        >
          <Icon
            as={<FontAwesome name="edit" />}
            size={8}
            ml="3"
            color={colorEditBtn}
            alignSelf="flex-end"
            marginTop={2}
            marginRight={2}
            onPress={() => {
              setIsEditing(!isEditing);
              setColorEditBtn(!isEditing ? "blue.500" : "muted.400");
              Toast.show({
                title: !isEditing
                  ? "Modo edição habilitado"
                  : "Modo edição bloqueado",
                backgroundColor: "blue.500",
              });
            }}
          />
          <VStack space={4} w="100%" h="90%" alignItems="center">
            <CameraComponent
              onCaptureImage={insertImage}
              onSelectImage={insertImage}
              pickedImagePath={product.image}
              disabled={!isEditing}
            ></CameraComponent>
            <Input
              size="full"
              w={{
                base: "100%",
                md: "25%",
              }}
              isReadOnly
              value={product.ean}
              InputLeftElement={
                <Icon
                  as={<FontAwesome name="barcode" />}
                  size={6}
                  ml="3"
                  color="muted.400"
                />
              }
              placeholder="barCode"
            />
            <Input
              size="full"
              w={{
                base: "100%",
                md: "25%",
              }}
              isReadOnly={!isEditing}
              value={product.description}
              onChangeText={(text) =>
                setProduct({ ...product, ["description"]: text })
              }
              InputLeftElement={
                <Icon
                  as={<Entypo name="text" />}
                  size={6}
                  ml="3"
                  color="muted.400"
                />
              }
              placeholder="Descrição"
            />
            <Input
              size="full"
              w={{
                base: "100%",
                md: "25%",
              }}
              isReadOnly={!isEditing}
              value={product.brand}
              onChangeText={(text) =>
                setProduct({ ...product, ["brand"]: text })
              }
              InputLeftElement={
                <Icon
                  as={<MaterialCommunityIcons name="factory" />}
                  size={6}
                  ml="3"
                  color="muted.400"
                />
              }
              placeholder="Fabricante"
            />

            <HStack space={1}>
              <Input
                flex={1}
                {...unitValueMaskedInputProps}
                size="full"
                w={{
                  base: "100%",
                  md: "25%",
                }}
                isReadOnly={false}
                InputLeftElement={
                  <Icon
                    as={<FontAwesome name="money" />}
                    size={6}
                    ml="3"
                    color="muted.400"
                  />
                }
                defaultValue="01"
                onEndEditing={onEndEditing}
                placeholder="Valor Unitário"
                keyboardType="numeric"
              />
              <NumericInput
                value={amountOfProduct}
                onChange={handleSubtotal}
                rounded
              />
            </HStack>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flex: 2 }}></View>
              <View style={{ flex: 1, alignItems: "flex-end" }}></View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Center flex={1}>
                <Input
                  borderColor={"white"}
                  {...subTotalMaskedInputProps}
                  size="2xl"
                  w={{
                    base: "100%",
                    md: "25%",
                  }}
                  isReadOnly={true}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="money" />}
                      size={6}
                      ml="3"
                      color="muted.400"
                    />
                  }
                  placeholder="0,00"
                />
              </Center>
            </View>
            <View style={{ alignItems: "stretch" }}>
              <Button
                width={200}
                height={60}
                size="lg"
                onPress={insert}
                _text={{
                  color: "white",
                  fontSize: 25,
                }}
              >
                Inserir
              </Button>
            </View>
          </VStack>
        </ScrollView>
      </Box>
    </VStack>
  );
};

export default ProductComponent;
