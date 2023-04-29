import { myTheme } from "../theme/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, StyleSheet } from "react-native";

type ButtonType = {
  isLoading: boolean;
  title: string;
  schema: "success" | "error" | "default" | "principal";
  onPress: () => void;
  size?: "s" | "m" | "x";
  style?: any;
};

const CustomButton = ({
  isLoading,
  onPress,
  title,
  schema,
  style,
  size = "m",
}: ButtonType) => {
  const sizeStyles = {
    s: styles.smallText,
    m: styles.mediumText,
    x: styles.largeText,
  };
  return (
    <TouchableOpacity
      disabled={isLoading}
      style={[
        styles.button,
        styles[schema],
        styles[size],
        isLoading && { backgroundColor: myTheme.colors.secondary },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.textButton, sizeStyles[size]]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  success: {
    backgroundColor: myTheme.colors.success,
  },
  error: {
    backgroundColor: myTheme.colors.danger,
  },
  default: {
    backgroundColor: myTheme.colors.secondary,
  },
  principal: {
    backgroundColor: myTheme.colors.primary,
  },
  textButton: {
    color: myTheme.colors.light,
    justifyContent: "center",
    alignSelf: "center",
  },
  s: {
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  m: {
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  x: {
    borderRadius: 5,
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 20,
  },
});

export default CustomButton;
