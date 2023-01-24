import {
  Box,
  Button,
  CheckIcon,
  FormControl,
  HStack,
  IconButton,
  Modal,
  Text,
  Radio,
  Select,
  Switch,
} from "native-base";

import {
  useCallback,
  useEffect,
  useItem,
  useMemo,
  useRef,
  useShoppingList,
  useState,
  useTranslation,
} from "../../hooks";
import { Ionicons } from "@expo/vector-icons";

const FilterItem = () => {
  const { params, get, loading } = useItem();
  const { shoppingList } = useShoppingList();

  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState(params.sortBy);
  const [sortDir, setSortDir] = useState(params.sortDir);
  const [added, setAdded] = useState<string>();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  useEffect(() => {
    if (params.isAdded != undefined) {
      setAdded(params.isAdded ? "true" : "false");
    } else {
      setAdded("null");
    }
  }, [params]);

  return (
    <Box alignItems="center">
      <IconButton
        size={"md"}
        variant="ghost"
        _icon={{
          as: Ionicons,
          name: "filter",
          color: "white",
        }}
        onPress={() => {
          if (!loading) {
            setIsOpen(true);
          }
        }}
      />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{t("form_messages.label_filter_title")}</Modal.Header>
          <Modal.Body>
            <FormControl w="3/4" maxW="300">
              <FormControl.Label>
                {t("form_messages.label_filter_order_by")}
              </FormControl.Label>
              <Select
                w={"100%"}
                placeholder={`${t("form_messages.label_filter_order_by")}`}
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size={5} />,
                }}
                defaultValue={sortBy}
                onValueChange={(value) => {
                  console.log(value);
                  setSortBy(value);
                }}
                mt="1"
              >
                <Select.Item
                  label={t("form_messages.select_option_updated_at")}
                  value="updatedAt"
                />
                <Select.Item
                  label={t("form_messages.select_option_description")}
                  value="product.description"
                />
                <Select.Item
                  label={t("form_messages.select_option_created_at")}
                  value="createdAt"
                />
              </Select>
              <FormControl.Label>
                {t("form_messages.label_is_added")}
              </FormControl.Label>
              <HStack alignItems="center" space={4}>
                <Radio.Group
                  name="myRadioGroupAdded"
                  value={added}
                  onChange={(nextValue) => {
                    setAdded(nextValue);
                  }}
                >
                  <Radio value="null" my={1}>
                    {t("form_messages.label_select_option_off")}
                  </Radio>
                  <Radio value="true" my={1}>
                    {t("form_messages.label_select_option_true")}
                  </Radio>
                  <Radio value="false" my={1}>
                    {t("form_messages.label_select_option_false")}
                  </Radio>
                </Radio.Group>
              </HStack>
              <FormControl.Label>
                {t("form_messages.label_sort_direction")}
              </FormControl.Label>
              <Radio.Group
                name="myRadioGroup"
                accessibilityLabel="favorite number"
                value={sortDir}
                onChange={(nextValue) => {
                  setSortDir(nextValue);
                }}
              >
                <Radio value="asc" my={1}>
                  {t("form_messages.label_ascending")}
                </Radio>
                <Radio value="desc" my={1}>
                  {t("form_messages.label_descending")}
                </Radio>
              </Radio.Group>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setIsOpen(false);
                }}
              >
                {t("form_messages.label_filter_cancel")}
              </Button>
              <Button
                colorScheme="success"
                onPress={async () => {
                  const isAdded = added == "null" ? undefined : added == "true";
                  const shoppingListId = shoppingList ? shoppingList.id : "";
                  await get(
                    { ...params, sortBy, sortDir, isAdded },
                    shoppingListId
                  );
                  setIsOpen(false);
                }}
              >
                {t("form_messages.label_filter_apply")}
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default FilterItem;
