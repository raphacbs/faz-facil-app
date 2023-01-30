import { Center, Heading, HStack, VStack, Text, Image } from "native-base";
import { useQuery } from "react-query";
import { getProductByCode } from "../../providers/useProduct";

const AddItemScreen = ({ route }: any) => {
  const { code, description } = route.params;
  const { data, isLoading, isSuccess } = getProductByCode(code, code != null);
  return (
    <Center>
      <VStack marginLeft={2} marginRight={2} space={8}>
        {isSuccess && <Heading>{data.items[0].description}</Heading>}
      </VStack>
    </Center>
  );
};

export default AddItemScreen;
