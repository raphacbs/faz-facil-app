interface Props {
    id: string | number;
    status: "info" | "warnnig" | "danger";
    variant: "ghost" | "outline" | "solid" | "subtle" | "link" | "unstyled"
    title: string;
    description: string;
    isClosable: boolean;
    rest?: any
}
