import { Box, Button } from "native-base";
import { useTranslation } from "../hooks";

type Props = {
  isLoading: boolean;
  isVisible: boolean | undefined;
  handleMore: () => void;
  sizeEmpty: number | 0;
};

const ListFooter: React.FC<Props> = ({
  isVisible,
  isLoading,
  sizeEmpty,
  handleMore,
}) => {
  const { t } = useTranslation();

  if (isVisible) {
    return (
      <Box marginBottom={30}>
        <Button variant={"link"} onPress={handleMore} isLoading={isLoading}>
          {t("form_messages.load_more_list")}
        </Button>
      </Box>
    );
  } else {
    return <Box marginBottom={sizeEmpty}></Box>;
  }
};

export default ListFooter;
