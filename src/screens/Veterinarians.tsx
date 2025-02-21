import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./Login";
import { useTheme } from "../context/ThemeContext";
import { Text } from "react-native";
import SafeContainer from "../components/SafeContainer ";

export default function Veterinarians() {
  const { theme } = useTheme();

  return (
    <SafeContainer>
      <Text>Veterinarias</Text>
    </SafeContainer>
  );
}
