import React from "react";
import { Text, TextStyle, TextProps } from "react-native";
import { getGlobalStyles } from "../styles/globalStyles";
import { useTheme } from "../context/ThemeContext";

interface TextTitleProps extends TextProps {
  children: string;
  style?: TextStyle | TextStyle[] | (TextStyle | undefined)[];
}

const TextTitle: React.FC<TextTitleProps> = ({ children, style, ...props }) => {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);

  return (
    <Text style={[globalStyles.textTitle, style]} {...props}>
      {children}
    </Text>
  );
};

export default TextTitle;
