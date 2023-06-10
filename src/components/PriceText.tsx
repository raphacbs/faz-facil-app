import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Unit } from "../types/Unit";
import CustomButton from "./Button";
import { PriceHistoryPost } from "../types/PriceHistories";
import { ItemPost } from "../types/Item";
import { useSelector } from "react-redux";

interface PriceProps {
  submitPriceHistory?: (priceHistoryPost: PriceHistoryPost) => void;
  submitItem?: (itemPost: ItemPost) => void;
  productCode: string;
  supermarketId: string;
  shoppingListId: string;
  addItem?: boolean;
  isLoading: boolean;
}

type FontSizeConfig = {
  limit: number;
  size: number;
};

const Price: React.FC<PriceProps> = ({
  submitPriceHistory,
  submitItem,
  productCode,
  supermarketId,
  shoppingListId,
  addItem = false,
  isLoading,
}: PriceProps) => {
  //@ts-ignore
  const units = useSelector((state) => state.unit.units);

  const { width } = useWindowDimensions(); // obter largura da tela do dispositivo
  const fontRatio = width / 375; // proporção da largura da tela (375 é a largura do iPhone 11)
  const [selectedLanguage, setSelectedLanguage] = useState(
    units.find((x: Unit) => x.id != null)?.id &&
      units.find((x: Unit) => x.initials == "UND")?.id
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [value, setValue] = useState<number>(0);
  const selectedUnit = units.find((unit: Unit) => unit.id === selectedLanguage);
  const [isDecimalUnit, setDecimalUnit] = useState<boolean>(
    selectedUnit ? selectedUnit.integerType : false
  );
  const [isDisableButtonSave, setDisableButtonSave] = useState<boolean>(true);
  const [formattedQuantity, setFormattedQuantity] = useState<string>("1");
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const inputPrice = useRef<TextInput>(null);

  const FONT_SIZE_CONFIGS: FontSizeConfig[] = [
    { limit: 1000, size: 80 },
    { limit: 10000, size: 50 },
    { limit: Infinity, size: 30 },
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
      setValue(1000000000);
    } else {
      setValue(newPrice);
    }
  };

  const fontSize = getFontSize(value);

  useEffect(() => {
    const unit = units.find((u: Unit) => u.id === selectedLanguage) as Unit;
    if (unit.integerType) {
      setDecimalUnit(false);
      setQuantity(1);
      setFormattedQuantity("1");
    } else {
      setDecimalUnit(true);
      setQuantity(0.1);
      setFormattedQuantity(
        (0.1).toLocaleString("pt-BR", {
          minimumFractionDigits: 3,
        })
      );
    }
  }, [selectedLanguage]);

  useEffect(() => {
    if (addItem && quantity > 0 && value > 0) {
      let result = (quantity * value).toFixed(2);
      setTotalPrice(parseFloat(result));
      setDisableButtonSave(false);
    } else {
      setDisableButtonSave(true);
    }
    if (addItem == false && value > 0) {
      setDisableButtonSave(false);
    }
  }, [quantity, value]);

  const handleQuantityChange = (text: string) => {
    if (selectedLanguage) {
      const unit = units.find((u: Unit) => u.id === selectedLanguage) as Unit;
      if (unit) {
        if (unit.integerType) {
          // unidade do tipo inteiro
          const intValue = parseInt(text, 10);
          if (!isNaN(intValue)) {
            setQuantity(intValue);
            setFormattedQuantity(intValue.toString());
          } else {
            setQuantity(0);
            setFormattedQuantity("");
          }
        } else {
          // Remove tudo que não é dígito
          const onlyDigits = text.replace(/[^\d]/g, "");
          // Converte para número e divide por 100
          const newQty = Number(onlyDigits) / 1000;
          if (newQty > 999) {
            // Se o valor for maior que 1000000000, define o valor máximo permitido
            setQuantity(999);
          } else {
            setQuantity(newQty);
          }

          // // unidade do tipo decimal
          // const decimalValue = parseFloat(text.replace(",", "."));
          if (!isNaN(newQty)) {
            // setFormattedQuantity(newQty.toLocaleString("pt-BR"));
            setFormattedQuantity(newQty.toFixed(3).replace(".", ","));
          } else {
            setQuantity(0);
            setFormattedQuantity("");
          }
        }
      }
    }
    // // Define o valor do TextInput
    // inputPrice.current?.setNativeProps({ text });
    // // Define a posição do cursor no final do texto
    // inputPrice.current?.setNativeProps({
    //   selection: { start: text.length, end: text.length },
    // });
  };

  const handleSubtract = () => {
    if (typeof quantity === "number") {
      if (selectedLanguage) {
        const unit = units.find((unit: Unit) => unit.id === selectedLanguage);
        if (unit) {
          if (unit.integerType) {
            let newQuantity = Math.max(quantity - 1, 1);
            setQuantity(newQuantity);
            setFormattedQuantity(newQuantity.toString());
          } else {
            let newQuantity = parseFloat(
              Math.max(quantity - 0.1, 0.1).toFixed(3)
            );
            setQuantity(newQuantity);
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
          if (unit.integerType) {
            setQuantity(quantity + 1);
            setFormattedQuantity((quantity + 1).toString());
          } else {
            let quantityTemp = parseFloat((quantity + 0.1).toFixed(3));
            setQuantity(quantityTemp);
            setFormattedQuantity(
              quantityTemp.toLocaleString("pt-BR", {
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
    <View style={styles.priceContainer}>
      {addItem && (
        <>
          <Picker
            style={styles.picker}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }
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
              placeholder="1"
              placeholderTextColor="#BDBDBD"
              onChangeText={handleQuantityChange}
              selectTextOnFocus
              value={formattedQuantity}
            />
            <TouchableOpacity style={styles.quantityButton} onPress={handleAdd}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <TextInput
        style={[styles.text, { fontSize }]}
        keyboardType="numeric"
        placeholder="R$ 0,00"
        placeholderTextColor="#BDBDBD"
        onChangeText={handlePriceChange}
        value={formattedValue}
        autoFocus
        onFocus={handleFocus}
        ref={inputPrice}
      />
      {addItem && quantity > 0 && value > 0 && (
        <Text style={styles.totalPriceText}>
          Valor total:{" "}
          {`R$ ${totalPrice
            .toFixed(2)
            .replace(".", ",")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
        </Text>
      )}
      <CustomButton
        isLoading={isDisableButtonSave || isLoading}
        title={"Adicionar"}
        schema={"principal"}
        size="x"
        onPress={() => {
          if (addItem) {
            const itemPost: ItemPost = {
              note: "",
              quantity: quantity,
              price: totalPrice,
              perUnit: value,
              added: true,
              product: {
                code: productCode,
              },
              shoppingList: {
                id: shoppingListId,
              },
              unit: {
                id: selectedUnit.id,
              },
            };
            submitItem && submitItem(itemPost);
          } else {
            const priceHistoryPost: PriceHistoryPost = {
              price: value,
              product: {
                code: productCode,
              },
              supermarket: {
                id: supermarketId,
              },
            };
            submitPriceHistory && submitPriceHistory(priceHistoryPost);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
  picker: {
    flex: 1,
    height: 50,
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

export default Price;
