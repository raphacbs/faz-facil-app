import {
  Heading,
  HStack,
  Pressable,
  VStack,
  Text,
  Button,
  Image,
  Box,
  Center,
} from "native-base";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IProduct } from "../../@types/product";
import {
  compareDateDesc,
  formatCurrency,
  formatDate,
} from "../../utils/generic";

type Props = {
  product: IProduct;
  onPressAdd: (product: IProduct) => void;
};

const Product: React.FC<Props> = ({ product, onPressAdd }) => {
  const { t } = useTranslation();
  const [history, setHistory] = useState<Array<any>>(
    product.priceHistories.sort(compareDateDesc)
  );

  const isOdd = (number: number) => {
    return number % 2 == 1;
  };

  return (
    <VStack
      rounded={8}
      shadow={5}
      p={2}
      bgColor={"gray.200"}
      width="95%"
      margin={2}
      borderWidth="1"
      borderColor="gray.200"
    >
      <HStack space={2}>
        <Heading flex={1} size="xs">
          {product.description}
        </Heading>
        <Image
          mt={-1}
          rounded={5}
          source={{
            uri: "https://drive.google.com/uc?id=18TBAS2bPjI-HwC-_QiH7gUgkK5vKzdtd",
          }}
          alt="Alternate Text"
          size="sm"
          alignSelf={"flex-end"}
        />
      </HStack>
      <Text fontSize="sm">{product.brand}</Text>
      <Text fontSize="2xs">{product.code}</Text>
      <Text fontSize="2xs">{product.unit}</Text>

      {history.length > 0 && (
        <Box rounded={10} bgColor="blue.300" justifyContent={"center"}>
          <Heading alignSelf={"center"} size={"xs"} mb={2}>
            {t("form_messages.label_price_history")}
          </Heading>
          {history.map((history: any, index: number) => {
            return (
              <HStack
                backgroundColor={isOdd(index) ? "blue.100" : "blue.200"}
                space={3}
                marginLeft={1}
                marginRight={1}
                marginBottom={1}
                justifyContent={"space-between"}
              >
                <Box flex={1}>
                  <Heading isTruncated flex={1} size="xs">
                    {history.supermarket.name}
                  </Heading>
                </Box>
                <Box flex={1}>
                  <Heading flex={1} size="xs">
                    {formatCurrency(history.price)}
                  </Heading>
                </Box>
                <Box>
                  <Heading flex={1} size="xs">
                    {formatDate(history.updatedAt, "DD/MM/yyy HH:mm")}
                  </Heading>
                </Box>
              </HStack>
            );
          })}
        </Box>
      )}

      <Button
        mt={2}
        rounded={10}
        colorScheme={"success"}
        onPress={() => onPressAdd(product)}
      >
        {t("form_messages.label_add_product")}
      </Button>
    </VStack>
  );
};

export default Product;
