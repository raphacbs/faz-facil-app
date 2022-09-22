import React, { useEffect, useState, useRef } from "react";
import {
  Toast,
  FlatList,
  Input,
  Icon,
  VStack,
  Stack,
  Fab,
  Box,
} from "native-base";
import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import ProductItem from "../../../components/ProductItem";
import Container from "../../../components/Container";
import { ProductItemType } from "../../../types";
import { useDispatch } from "react-redux";
import {
  clearProductList,
  getProductByDescription,
} from "../../../store/actions/productAction";
interface Props {
  products: Array<ProductItemType>;
}

const ProductSearchScreen = (props: Props) => {
  const { products } = props;
  const dispatch = useDispatch();
  const [searchedText, setSearchedText] = useState("");
  const renderItemComponent = (data: any) => {
    return <ProductItem product={data.item} />;
  };

  const handleProducts = () => {
    if (searchedText.length >= 3) {
      dispatch(getProductByDescription(searchedText));
    } else {
      dispatch(clearProductList());
    }
  };

  React.useEffect(() => {
    handleProducts();
  }, [searchedText]);

  return (
    <VStack flex={1} p={2}>
      <Input
        placeholder="Pesquise por nome e marca"
        marginTop={2}
        placeholderTextColor={"gray.500"}
        width="100%"
        py="3"
        px="1"
        color={"black"}
        fontSize="14"
        value={searchedText}
        onChangeText={(text) => setSearchedText(text)}
        //backgroundColor="primary.300"
        borderColor="primary.300"
        rounded={30}
        InputLeftElement={
          <Icon
            as={<MaterialIcons name="search" />}
            size={5}
            ml="2"
            color="gray.500"
          />
        }
        InputRightElement={
          searchedText != "" ? (
            <Icon
              as={<MaterialIcons name="close" />}
              size={6}
              ml="2"
              marginRight={5}
              color="gray.500"
              onPress={() => {
                setSearchedText("");
              }}
            />
          ) : (
            <Stack />
          )
        }
      />
      <Container refreshControl={false}>
        <Stack marginTop={2} marginBottom={10} flex={1} h="90%" w="100%">
          <FlatList
            flex={1}
            data={products}
            keyExtractor={(item: ProductItemType) => item.id.toString()}
            renderItem={(item) => renderItemComponent(item)}
            refreshing={false}
          />
        </Stack>
      </Container>
    </VStack>
  );
};

const mapStateToProps = (store: any) => {
  return {
    loading: store.commonReducer.loading,
    products: store.shoppingCartReducer.products,
  };
};

export default connect(mapStateToProps)(ProductSearchScreen);
