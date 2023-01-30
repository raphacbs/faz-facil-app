import { Button, Modal, AlertDialog, TextArea } from "native-base";
import MaskInput, {
  createNumberMask,
  Mask,
  Masks,
} from "react-native-mask-input";
import { useEffect, useRef, useState, useTranslation } from "../../hooks";

type Props = {
  isOpen: boolean;
  header: string;
  value: string;
  mask: Mask | undefined;
  isTextArea: boolean;
  onChangeText: (formatted: string, extracted: string | undefined) => void;
  onClose: () => void;
  onSave: (text: string) => void;
};
const ModalInput: React.FC<Props> = ({
  isOpen,
  header,
  mask,
  value,
  isTextArea,
  onClose,
  onSave,

  onChangeText,
}) => {
  const [_value, setValue] = useState(value);
  const cancelRef = useRef(null);
  useEffect(() => {
    setValue(value);
  }, [value]);
  const { t } = useTranslation();
  const dollarMask = createNumberMask({
    prefix: ["R", "$", " "],
    delimiter: ".",
    separator: ",",
    precision: 2,
  });

  const _onClose = () => {
    setValue(value);
    onClose();
  };
  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={_onClose}
      size={"sm"}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialog.Content maxH="212">
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{header}</AlertDialog.Header>
        <AlertDialog.Body>
          {isTextArea ? (
            <TextArea
              w="100%"
              h="90%"
              numberOfLines={4}
              value={_value}
              onChangeText={setValue}
              autoCompleteType={false}
            />
          ) : (
            <MaskInput
              autoFocus
              value={_value}
              onChangeText={(masked, unmasked) => {
                setValue(masked);
                onChangeText(masked, unmasked);
              }}
              keyboardType="numeric"
              mask={mask}
              onSubmitEditing={() => {
                onSave(_value);
                _onClose();
              }}
            />
          )}
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={_onClose}>
              {t("form_messages.label_cancel")}
            </Button>
            <Button
              onPress={() => {
                onSave(_value);
                _onClose();
              }}
            >
              {t("form_messages.label_apply")}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default ModalInput;
