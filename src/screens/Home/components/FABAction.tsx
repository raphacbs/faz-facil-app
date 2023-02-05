import { FAB } from "react-native-paper";
import { useNavigation, useState, useTranslation } from "../../../hooks";

const FABActions = () => {
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
          onPress: () => console.log("Go screen add product"),
        },
        {
          icon: "shopping",
          label: `${t("fab.add_shopping_list")}`,
          //@ts-ignore
          onPress: () => navigation.navigate("ShoppingListRegister"),
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

export default FABActions;
