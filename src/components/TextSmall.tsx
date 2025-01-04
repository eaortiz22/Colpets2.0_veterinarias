import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { getGlobalStyles } from "../styles/globalStyles";

interface TextSmallProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const TextSmall: React.FC<TextSmallProps> = ({ children, style }) => {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);

  return <Text style={[globalStyles.textSmall, style]}>{children}</Text>;
};

export default TextSmall;
