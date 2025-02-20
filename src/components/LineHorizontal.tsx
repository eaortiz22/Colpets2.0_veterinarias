import { View } from "react-native";
import React from "react";
import { useTheme } from "../context/ThemeContext";

interface LineHorizontalProps {
  bgColor?: string;
}

export default function LineHorizontal({ bgColor }: LineHorizontalProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{ height: 1, backgroundColor: bgColor || theme.colors.background }}
    />
  );
}
