import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function LineHorizontal() {
  const { theme } = useTheme();

  return (
    <View
      style={{ height: 1, backgroundColor: theme.colors.background }}
    ></View>
  );
}
