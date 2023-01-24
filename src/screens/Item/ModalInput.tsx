import { Button, Modal } from "native-base";
import MaskInput, {
  createNumberMask,
  Mask,
  Masks,
} from "react-native-mask-input";
import { useEffect, useState, useTranslation } from "../../hooks";

type Props = {
  isOpen: boolean;
  header: string;
  value: string;
  mask: Mask | undefined;
  onChangeText: (formatted: string, extracted: string | undefined) => void;
  onClose: () => void;
  onSave: () => void;
};
const ModalInput: React.FC<Props> = ({
  isOpen,
  header,
  onClose,
  onSave,
  mask,
  value,

  onChangeText,
}) => {
  const [_value, setValue] = useState("");
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
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
      <Modal.Content maxH="212">
        <Modal.CloseButton />
        <Modal.Header>{header}</Modal.Header>
        <Modal.Body>
          <MaskInput
            autoFocus
            value={_value}
            onChangeText={(masked, unmasked) => {
              setValue(unmasked);
              onChangeText(masked, unmasked);
            }}
            keyboardType="numeric"
            mask={mask}
            onSubmitEditing={() => {
              onSave();
              onClose();
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
              {t("form_messages.label_cancel")}
            </Button>
            <Button
              onPress={() => {
                onSave();
                onClose();
              }}
            >
              {t("form_messages.label_apply")}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ModalInput;
