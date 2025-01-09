import React from 'react';
import { Text, TextStyle } from 'react-native';
import { getGlobalStyles } from '../styles/globalStyles';
import { useTheme } from '../context/ThemeContext';

interface TextMediumProps {
  children: any;
  style?: TextStyle;
}

const TextMedium: React.FC<TextMediumProps> = ({ children, style }) => {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);

  return <Text style={[globalStyles.textMedium, style]}>{children}</Text>;
};

export default TextMedium;
