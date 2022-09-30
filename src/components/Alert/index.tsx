import {
  Alert,
  Stack,
  VStack,
  HStack,
  Text,
  IconButton,
  CloseIcon,
  Collapse,
} from "native-base";
import React from "react";

interface Props {
  status: string;
  title: string;
  show: boolean;
}

const MessageAlert: React.FC<Props> = ({ status, title, show }) => {
  return (
    <Collapse isOpen={show}>
      <Stack space={3} w="100%" maxW="400">
        <Alert w="100%" status={status}>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  {title}
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                _focus={{
                  borderWidth: 0,
                }}
                icon={<CloseIcon size="3" />}
                _icon={{
                  color: "coolGray.600",
                }}
              />
            </HStack>
          </VStack>
        </Alert>
      </Stack>
    </Collapse>
  );
};

export default MessageAlert;
