import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Unit } from "../types/Unit";
import CustomButton from "./Button";
import { PriceHistoryPost } from "../types/PriceHistories";
import { Item, ItemPost } from "../types/Item";
import { useSelector } from "react-redux";

interface PriceProps {
  item: Item;
  style?: ViewStyle;
  onChange: (item: Item) => void;
}

type FontSizeConfig = {
  limit: number;
  size: number;
};

const PriceItem: React.FC<PriceProps> = ({
  item,
  style,
  onChange,
}: PriceProps) => {
  //@ts-ignore
  const units = useSelector((state) => state.unit.units);
  const { width } = useWindowDimensions(); // obter largura da tela do dispositivo
  const fontRatio = width / 375; // proporção da largura da tela (375 é a largura do iPhone 11)
  const [selectedLanguage, setSelectedLanguage] = useState(
    units.find((x: Unit) => x.id != null)?.id
  );
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const [value, setValue] = useState<number>(item.perUnit);
  const selectedUnit = units.find((unit: Unit) => unit.id === selectedLanguage);
  const [isDecimalUnit, setDecimalUnit] = useState<boolean>(
    selectedUnit?.type === "decimal"
  );
  const [isDisableButtonSave, setDisableButtonSave] = useState<boolean>(true);
  const [formattedQuantity, setFormattedQuantity] = useState<string>(
    item.quantity + ""
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const inputPrice = useRef<TextInput>(null);

  const FONT_SIZE_CONFIGS: FontSizeConfig[] = [
    { limit: 1000, size: 50 },
    { limit: 10000, size: 20 },
    { limit: Infinity, size: 10 },
  ];

  const formattedValue =
    value >= 1000
      ? `R$ ${value
          .toFixed(2)
          .replace(".", ",")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
      : `R$ ${value.toFixed(2).replace(".", ",")}`;

  const getFontSize = (value: number): number => {
    const config =
      FONT_SIZE_CONFIGS.find((c) => value < c.limit) ||
      FONT_SIZE_CONFIGS[FONT_SIZE_CONFIGS.length - 1];
    return config.size * fontRatio; // tamanho da fonte proporcional à largura da tela
  };

  const handlePriceChange = (value: string) => {
    // Remove tudo que não é dígito
    const onlyDigits = value.replace(/[^\d]/g, "");

    // Converte para número e divide por 100 para obter o valor em reais
    const newPrice = Number(onlyDigits) / 100;
    if (newPrice > 1000000000) {
      // Se o valor for maior que 1000000000, define o valor máximo permitido
      // setValue(1000000000);
      handleOnChangePrice(1000000000);
    } else {
      // setValue(newPrice);
      handleOnChangePrice(newPrice);
    }
  };

  const fontSize = getFontSize(value);

  const handleOnChangePrice = (price: number) => {
    setValue(price);
    onChange({ ...item, perUnit: price });
  };

  const handleOnChangeQuantity = (quantity: number) => {
    setQuantity(quantity);
    onChange({ ...item, quantity });
  };

  useEffect(() => {
    const unit = units.find(
      (unit: Unit) => unit.id === selectedLanguage
    ) as Unit;
    if (unit.type == "integer") {
      setDecimalUnit(false);
      // setQuantity(1);
      handleOnChangeQuantity(item.quantity);
      setFormattedQuantity(item.quantity.toString());
    } else {
      setDecimalUnit(true);
      // setQuantity(0.1);
      handleOnChangeQuantity(0.1);
      setFormattedQuantity(
        (0.1).toLocaleString("pt-BR", {
          minimumFractionDigits: 3,
        })
      );
    }
  }, [selectedLanguage]);

  useEffect(() => {
    if (quantity > 0 && value > 0) {
      let result = (quantity * value).toFixed(2);
      setTotalPrice(parseFloat(result));
      setDisableButtonSave(false);
    } else {
      setDisableButtonSave(true);
    }
    if (value > 0) {
      setDisableButtonSave(false);
    }
  }, [quantity, value]);

  const handleQuantityChange = (text: string) => {
    if (selectedLanguage) {
      const unit = units.find(
        (unit: Unit) => unit.id === selectedLanguage
      ) as Unit;
      if (unit) {
        if (unit.type == "integer") {
          // unidade do tipo inteiro
          const intValue = parseInt(text, 10);
          if (!isNaN(intValue)) {
            // setQuantity(intValue)
            handleOnChangeQuantity(intValue);
            setFormattedQuantity(intValue.toString());
          } else {
            // setQuantity(0);
            handleOnChangeQuantity(0);
            setFormattedQuantity("");
          }
        } else {
          // Remove tudo que não é dígito
          const onlyDigits = text.replace(/[^\d]/g, "");
          // Converte para número e divide por 100
          const newQty = Number(onlyDigits) / 1000;
          if (newQty > 999) {
            // Se o valor for maior que 1000000000, define o valor máximo permitido
            // setQuantity(999);
            handleOnChangeQuantity(999);
          } else {
            // setQuantity(newQty);
            handleOnChangeQuantity(newQty);
          }

          // // unidade do tipo decimal
          // const decimalValue = parseFloat(text.replace(",", "."));
          if (!isNaN(newQty)) {
            // setFormattedQuantity(newQty.toLocaleString("pt-BR"));
            setFormattedQuantity(newQty.toFixed(3).replace(".", ","));
          } else {
            // setQuantity(0);
            handleOnChangeQuantity(0);
            setFormattedQuantity("");
          }
        }
      }
    }
  };

  const handleSubtract = () => {
    if (typeof quantity === "number") {
      if (selectedLanguage) {
        const unit = units.find((unit: Unit) => unit.id === selectedLanguage);
        if (unit) {
          if (unit.type === "integer") {
            let newQuantity = Math.max(quantity - 1, 1);
            // setQuantity(newQuantity);
            handleOnChangeQuantity(newQuantity);
            setFormattedQuantity(newQuantity.toString());
          } else {
            let newQuantity = Math.max(quantity - 0.1, 0.1);
            // setQuantity(newQuantity);
            handleOnChangeQuantity(newQuantity);
            setFormattedQuantity(
              newQuantity.toLocaleString("pt-BR", { minimumFractionDigits: 3 })
            );
          }
        }
      }
    }
  };

  const handleAdd = () => {
    if (typeof quantity === "number") {
      if (selectedLanguage) {
        const unit = units.find((unit: Unit) => unit.id === selectedLanguage);
        if (unit) {
          if (unit.type === "integer") {
            // setQuantity(quantity + 1);
            handleOnChangeQuantity(quantity + 1);
            setFormattedQuantity((quantity + 1).toString());
          } else {
            // setQuantity(quantity + 0.1);
            handleOnChangeQuantity(quantity + 1);
            setFormattedQuantity(
              (quantity + 0.1).toLocaleString("pt-BR", {
                minimumFractionDigits: 3,
              })
            );
          }
        }
      }
    }
  };
  function handleFocus() {
    inputPrice.current?.setNativeProps({
      selection: {
        start: Number.MAX_SAFE_INTEGER,
        end: Number.MAX_SAFE_INTEGER,
      },
    });
  }

  return (
    <View style={[styles.priceContainer, style]}>
      <Picker
        style={styles.picker}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
        {units.map((unit: Unit) => (
          <Picker.Item
            key={unit.id}
            label={`${unit.description} (${unit.initials})`}
            value={unit.id}
          />
        ))}
      </Picker>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={handleSubtract}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.quantityInput}
          keyboardType={isDecimalUnit ? "numeric" : "number-pad"}
          placeholder="0"
          placeholderTextColor="#BDBDBD"
          onChangeText={handleQuantityChange}
          selectTextOnFocus
          value={formattedQuantity}
        />
        <TouchableOpacity style={styles.quantityButton} onPress={handleAdd}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[styles.text, { fontSize }]}
        keyboardType="numeric"
        placeholder="R$ 0,00"
        placeholderTextColor="#BDBDBD"
        onChangeText={handlePriceChange}
        value={formattedValue}
        onFocus={handleFocus}
        ref={inputPrice}
      />
      {quantity > 0 && value > 0 && (
        <Text style={styles.totalPriceText}>
          Valor total:{" "}
          {`R$ ${totalPrice
            .toFixed(2)
            .replace(".", ",")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
  picker: {
    height: 10,
    alignSelf: "stretch",
    margin: 20,
    backgroundColor: "#F2F2F2",
  },
  priceContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    overflow: "hidden",
  },
  quantityButton: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0E0E0",
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  totalPriceText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  quantityInput: {
    flex: 1,
    height: 50,
    textAlign: "center",
    fontSize: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "#FFFFFF",
  },
});

export default PriceItem;
