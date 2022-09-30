import { AlertDialog, Button } from "native-base";
import React from "react";
import { Props } from "./types";

const Modal = (props: Props) => {
  const cancelRef = React.useRef(null);
  const { title, body, buttonLeft, buttonRight, isOpen } = props;
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      // onClose={onClose}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton ref={cancelRef} />
        <AlertDialog.Header>{title}</AlertDialog.Header>
        <AlertDialog.Body>{body}</AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant={buttonLeft.style ? buttonLeft.style : "solid"}
              colorScheme={
                buttonLeft.colorScheme ? buttonLeft.colorScheme : "info"
              }
              onPress={buttonLeft.onPress}
              ref={cancelRef}
            >
              {buttonLeft.label}
            </Button>
            <Button
              variant={buttonRight.style ? buttonRight.style : "solid"}
              colorScheme={
                buttonRight.colorScheme ? buttonRight.colorScheme : "info"
              }
              onPress={buttonRight.onPress}
            >
              {buttonRight.label}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default Modal;
