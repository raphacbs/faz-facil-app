import { ColorSchemeType } from "native-base/lib/typescript/components/types";

export interface Props {
    title: string;
    body: React.ComponentType<any> | React.ReactElement;
    buttonRight: ModalButton;
    buttonLeft: ModalButton;
    isOpen: boolean
}

export interface ModalButton {
    label: string;
    onPress: () => void;
    colorScheme?: ColorSchemeType
    style?: "ghost" | "outline" | "solid" | "subtle" | "link" | "unstyled"
}