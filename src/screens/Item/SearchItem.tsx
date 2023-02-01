import { Icon, IconButton, Input, Modal, Stack } from "native-base";
import { useItem, useRef, useState, useTranslation } from "../../hooks";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const SearchItem = () => {
  const [open, setOpen] = useState(false);
  const { loading } = useItem();
  const [searchText, setSearchText] = useState<string>("");
  const inputSearchRef = useRef(null);
  const { t } = useTranslation();

  const openModal = (placement: any) => {
    setOpen(true);
  };

  return (
    <Stack>
      <IconButton
        size={"md"}
        variant="ghost"
        _icon={{
          as: Ionicons,
          name: "search",
          color: "white",
        }}
        onPress={() => {
          if (!loading) {
            openModal("top");
          }
        }}
      />

      <Modal
        size={"full"}
        isOpen={open}
        onClose={() => setOpen(false)}
        safeAreaTop={true}
      >
        <Modal.Content {...styles["top"]}>
          <Modal.Body>
            <Input
              bgColor={"white"}
              placeholder={`${t("form_messages.placeholder_search_items")}`}
              width="100%"
              borderRadius="4"
              autoFocus
              m={1}
              returnKeyType="search"
              ref={inputSearchRef}
              value={searchText}
              fontSize="14"
              onChangeText={setSearchText}
              InputLeftElement={
                <Icon
                  m="2"
                  ml="3"
                  size="6"
                  color="gray.400"
                  as={<MaterialIcons name="arrow-back" />}
                  onPress={() => {
                    if (!loading) {
                      setOpen(false);
                      setSearchText("");
                    }
                  }}
                />
              }
              //@ts-ignore
              InputRightElement={
                searchText.length >= 1 ? (
                  <Icon
                    m="2"
                    mr="3"
                    size="6"
                    color="gray.400"
                    as={<MaterialIcons name="close" />}
                    onPress={() => setSearchText("")}
                  />
                ) : null
              }
              onSubmitEditing={() => {}}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Stack>
  );
};
const styles = {
  top: {
    marginBottom: "auto",
    marginTop: 0,
  },
  bottom: {
    marginBottom: 0,
    marginTop: "auto",
  },
  left: {
    marginLeft: 0,
    marginRight: "auto",
  },
  right: {
    marginLeft: "auto",
    marginRight: 0,
  },
  center: {},
};
export default SearchItem;
