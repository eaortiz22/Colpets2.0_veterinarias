import { View, Text } from "react-native";
import React from "react";
import Button from "../../components/Button";
import { useTheme } from "../../context/ThemeContext";

export default function SettingsScreen() {
  const { toggleTheme } = useTheme();

  return (
    <View>
      <Text>SettingsScreen</Text>
      <Button title="Cambiar tema" onPress={toggleTheme} type="primary" />
    </View>
  );
}
