import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Input,
  Icon,
  Stack,
  Center,
  NativeBaseProvider,
  Image,
  ScrollView,
  View,
  Text,
  Heading,
  Button,
} from "native-base";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Masks, useMaskedInputProps } from "react-native-mask-input";
import { SimpleStepper } from "react-native-simple-stepper";
import NumericInput from "react-native-numeric-input";

const ProductComponent = (props) => {
  const [product, setProduct] = useState({ ...props.product });
  const [isEditing, setIsEditing] = useState(props.isEditing);
  const [amountOfProduct, setAmountOfProduct] = useState(1);
  const [subtotal, setSubtotal] = useState("");
  useEffect(() => {
    setProduct(props.product);
  }, [props.product, props.isEditing]);

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

  const insert = () => {
    let item = {
      id: product.id,
      unitValue: product.unitValue.replace("R$", "").trim(),
      amountOfProduct: amountOfProduct,
      image: "",
      description: product.description,
      manufacturer: product.manufacturer,
      ean: product.ean,
    };

    props.onInsert(item);
  };

  return (
    <ScrollView
      maxW="full"
      w="100%"
      h="100"
      _contentContainerStyle={{
        px: "3px",
        mb: "4",
        minW: "50",
      }}
    >
      <Stack space={4} w="100%" h="90%" alignItems="center">
        <Image
          size={150}
          resizeMode={"contain"}
          borderRadius={100}
          source={{
            uri: product.image,
          }}
          alt="Alternate Text"
        />
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
          isReadOnly={isEditing}
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
          isReadOnly={isEditing}
          value={product.manufacturer}
          onChangeText={(text) =>
            setProduct({ ...product, ["manufacturer"]: text })
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 2 }}>
            <Input
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
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <NumericInput
              value={amountOfProduct}
              onChange={handleSubtotal}
              rounded
            />
            {/* <SimpleStepper
              valueChanged={handleSubtotal}
              initialValue={amountOfProduct}
              minimumValue={1}
              maximumValue={100}
              showText={true}
              containerStyle={{
                backgroundColor: "transparent",
                flexDirection: "row",
                borderWidth: 1,
                borderRadius: 8,
                overflow: "hidden",
                alignItems: "center",
                borderColor: "gray",
              }}
              separatorStyle={{
                width: StyleSheet.hairlineWidth,
                backgroundColor: "gray",
                height: "100%",
              }}
              textStyle={{
                padding: 8,
                fontSize: 20,
                fontWeight: "bold",
                color: "blue",
              }}
              incrementImageStyle={{ height: 20, width: 20 }}
              decrementImageStyle={{ height: 20, width: 20 }}
            ></SimpleStepper> */}
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 7, justifyContent: "center" }}>
            <Heading>Valor total:</Heading>
          </View>
          <View style={{ flex: 6 }}>
            <Input
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
              placeholder="Subtotal"
            />
          </View>
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
      </Stack>
    </ScrollView>
  );
};

export default ProductComponent;
