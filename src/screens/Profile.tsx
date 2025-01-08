import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./Login";
import { useTheme } from "../context/ThemeContext";
import { View } from "react-native";
import Button from "../components/Button";

export default function Profile() {
  const { toggleTheme, theme } = useTheme();

  return (
    <SafeAreaProvider style={[{ backgroundColor: theme.colors.background }]}>
      <SafeAreaView style={[styles.container]}>
        {/* Button */}
        <View>
          <Button title="Cambiar tema" onPress={toggleTheme} type="primary" />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
