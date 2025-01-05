import { View, Text } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./Login";
import { useTheme } from "../context/ThemeContext";
import Button from "../components/Button";

export default function Profile() {
  const { theme, toggleTheme } = useTheme();

  return (
    <SafeAreaProvider style={[{ backgroundColor: theme.colors.background }]}>
      <SafeAreaView style={[styles.container]}>
        <Text>Home</Text>

        <Button title="Cambiar tema" onPress={toggleTheme} type="primary" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
