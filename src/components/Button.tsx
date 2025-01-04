import React from "react";
import { Text, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { getGlobalStyles } from "../styles/globalStyles";

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: "primary" | "secondary";
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = "primary",
  style,
}) => {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);

  const buttonStyle =
    type === "primary"
      ? globalStyles.buttonPrimary
      : globalStyles.buttonSecondary;

  return (
    <TouchableOpacity
      style={[globalStyles.button, buttonStyle, style]}
      onPress={onPress}
    >
      <Text style={globalStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
