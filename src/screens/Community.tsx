import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./Login";
import { useTheme } from "../context/ThemeContext";
import { Text } from "react-native";

export default function Community() {
  const { theme } = useTheme();

  return (
    <SafeAreaProvider style={[{ backgroundColor: theme.colors.background }]}>
      <SafeAreaView style={[styles.container]}>
        <Text>Comunidad</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
