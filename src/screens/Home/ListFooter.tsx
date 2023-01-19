import { Box, Button } from "native-base";
import {
  useEffect,
  useShoppingList,
  useState,
  useTranslation,
} from "../../hooks";

type Props = {
  isVisible: boolean;
};

const ListFooter: React.FC<Props> = ({ isVisible }) => {
  const { t } = useTranslation();

  const { get, params, pageInfo, shoppingLists } = useShoppingList();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleMore = async () => {
    setIsLoading(true);
    await get({ ...params, pageNo: params.pageNo + 1 }, [...shoppingLists]);
    setIsLoading(false);
  };

  return isVisible && !pageInfo.last ? (
    <Box marginBottom={30}>
      <Button variant={"link"} onPress={handleMore} isLoading={isLoading}>
        {t("form_messages.load_more_list")}
      </Button>
    </Box>
  ) : (
    <Box marginBottom={70}></Box>
  );
};

export default ListFooter;
