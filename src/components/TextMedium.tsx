import React from "react";
import { Text, TextStyle, TextProps } from "react-native";
import { getGlobalStyles } from "../styles/globalStyles";
import { useTheme } from "../context/ThemeContext";

interface TextMediumProps extends TextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const TextMedium: React.FC<TextMediumProps> = ({
  children,
  style,
  numberOfLines,
  ellipsizeMode,
  ...rest
}) => {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);

  return (
    <Text
      style={[globalStyles.textMedium, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default TextMedium;
