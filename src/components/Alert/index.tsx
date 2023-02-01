import { AlertDialog, Button } from "native-base";
import { useRef, useTranslation } from "../../hooks";

type Props = {
  body: React.ReactElement;
  title: React.ReactElement;
  isShow: boolean;
  onPressYes: () => void;
  onPressNo: () => void;
  onClose: () => void;
};
const AlertYesOrNo: React.FC<Props> = ({
  body,
  title,
  onPressYes,
  onPressNo,
  isShow,
  onClose,
}) => {
  const cancelRef = useRef(null);
  const { t } = useTranslation();
  return (
    <AlertDialog
      isOpen={isShow}
      onClose={onClose}
      size={"sm"}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialog.Content maxH="212">
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{title}</AlertDialog.Header>
        <AlertDialog.Body>{body}</AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onPressNo}>
              {t("form_messages.label_no")}
            </Button>
            <Button colorScheme="danger" onPress={onPressYes}>
              {t("form_messages.label_yes")}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default AlertYesOrNo;
