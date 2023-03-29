import { myTheme } from "../theme/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, StyleSheet } from "react-native";

type ButtonType = {
  isLoading: boolean;
  title: string;
  schema: "success" | "error" | "default" | "principal";
  onPress: () => void;
};

const CustomButton = ({ isLoading, onPress, title, schema }: ButtonType) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      style={styles[schema]}
      onPress={onPress}
    >
      <Text style={styles.textButton}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: myTheme.colors.primary,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  success: {
    backgroundColor: myTheme.colors.success,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  error: {
    backgroundColor: myTheme.colors.danger,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  default: {
    backgroundColor: myTheme.colors.secondary,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  principal: {
    backgroundColor: myTheme.colors.primary,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  textButton: {
    color: myTheme.colors.light,
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default CustomButton;
