import React from "react";
import { Text, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { getGlobalStyles } from "../../styles/globalStyles";

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: "primary" | "secondary" | "disabled";
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = "primary",
  style,
  disabled = false,
}) => {
  const { theme, isDarkTheme } = useTheme();
  const globalStyles = getGlobalStyles(theme, isDarkTheme);

  const buttonStyle =
    type === "primary"
      ? globalStyles.buttonPrimary
      : type === "secondary"
      ? globalStyles.buttonSecondary
      : globalStyles.buttonDisabled;

  const textStyle =
    type === "primary"
      ? globalStyles.buttonTextPrimary
      : type === "secondary"
      ? globalStyles.buttonTextSecondary
      : globalStyles.buttonTextDisabled;

  const finalButtonStyle = disabled ? globalStyles.buttonDisabled : buttonStyle;
  const finalTextStyle = disabled ? globalStyles.buttonTextDisabled : textStyle;

  return (
    <TouchableOpacity
      style={[globalStyles.button, finalButtonStyle, style]}
      onPress={disabled ? () => {} : onPress}
      disabled={disabled}
    >
      <Text style={finalTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
