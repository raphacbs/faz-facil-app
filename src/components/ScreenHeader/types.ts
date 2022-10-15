export interface Props {
    title: React.ReactNode;
    subtitle?: string;
    actionOne?: {
        icon: string;
        onPress: () => void;
    };
    actionTwo?: {
        icon: string;
        onPress: () => void;
    },
    children: React.ReactNode;
}