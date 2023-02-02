import {
  Box,
  Button,
  CheckIcon,
  FormControl,
  IconButton,
  Modal,
  Popover,
  Radio,
  Select,
} from "native-base";

import {
  useCallback,
  useMemo,
  useRef,
  useState,
  useTranslation,
} from "../../hooks";
import { Ionicons } from "@expo/vector-icons";

const Filter = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState();
  const [sortDir, setSortDir] = useState();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

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
          setIsOpen(true);
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
                minWidth="200"
                placeholder="Choose"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size={5} />,
                }}
                defaultValue={sortBy}
                onValueChange={(value) => {
                  console.log(value);
                  // setSortBy(value);
                }}
                mt="1"
              >
                <Select.Item
                  label={t("form_messages.select_option_updated_at")}
                  value="updatedAt"
                />
                <Select.Item
                  label={t("form_messages.select_option_created_at")}
                  value="createdAt"
                />
                <Select.Item
                  label={t("form_messages.select_option_description")}
                  value="description"
                />
                <Select.Item
                  label={t("form_messages.select_option_status")}
                  value="status"
                />
              </Select>
              <FormControl.Label>
                {t("form_messages.label_sort_direction")}
              </FormControl.Label>
              <Radio.Group
                name="myRadioGroup"
                accessibilityLabel="favorite number"
                value={sortDir}
                onChange={(nextValue) => {
                  // setSortDir(nextValue);
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
              <Button colorScheme="success" onPress={async () => {}}>
                {t("form_messages.label_filter_apply")}
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default Filter;
