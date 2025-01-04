import React from "react";
import { Text, TextStyle } from "react-native";
import { getGlobalStyles } from "../styles/globalStyles";
import { useTheme } from "../context/ThemeContext";

interface TextTitleProps {
  children: string;
  style?: TextStyle;
}

const TextTitle: React.FC<TextTitleProps> = ({ children, style }) => {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);

  return <Text style={[globalStyles.textTitle, style]}>{children}</Text>;
};

export default TextTitle;
