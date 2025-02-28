import React from "react";
import {
  Text,
  StyleSheet,
  TextProps,
  StyleProp,
  TextStyle,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { getGlobalStyles } from "../styles/globalStyles";

interface TextSmallProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>; 
}

const TextSmall: React.FC<TextSmallProps> = ({ children, style, ...props }) => {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);

  return (
    <Text style={[globalStyles.textSmall, style]} {...props}>
      {children}
    </Text>
  );
};

export default TextSmall;
