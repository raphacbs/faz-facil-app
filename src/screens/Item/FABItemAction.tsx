import { FAB } from "react-native-paper";
import { useNavigation, useState, useTranslation } from "../../hooks";
type Props = {
  shoppingListId: string;
};
const FABItemActions: React.FC<Props> = ({ shoppingListId }) => {
  const [openFab, setOpenFab] = useState<boolean>(false);
  const navigation = useNavigation();
  const onStateChange = ({ open }: any) => setOpenFab(open);
  const { t } = useTranslation();

  return (
    <FAB.Group
      open={openFab}
      icon={openFab ? "close" : "plus"}
      color="white"
      visible={true}
      fabStyle={{
        backgroundColor: "#0099e6",
      }}
      actions={[
        {
          icon: "barcode-scan",
          label: `${t("fab.search_product_bar_code")}`,
          onPress: () =>
            //@ts-ignore
            navigation.navigate("Scan", { shoppingListId: shoppingListId }),
        },
        {
          icon: "shopping",
          label: `${t("fab.search_product_by_description")}`,
          onPress: () =>
            //@ts-ignore
            navigation.navigate("ProductSearch", {
              shoppingListId: shoppingListId,
            }),
        },
      ]}
      onStateChange={onStateChange}
      onPress={() => {
        if (openFab) {
          // do something if the speed dial is open
        }
      }}
    />
  );
};

export default FABItemActions;
