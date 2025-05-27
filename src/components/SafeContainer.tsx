import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { ScrollView, StyleSheet, ViewStyle } from "react-native";
import { spacing } from "../styles/theme";

interface SafeContainerProps {
  children: ReactNode;
  style?: ViewStyle;
  padding?: number; // Si se pasa, usa padding en vez de paddingVertical
  isScrollEnabled?: boolean; // Nueva prop para controlar el scroll
  backgroundColor?: string;
}

export default function SafeContainer({
  children,
  style,
  padding,
  isScrollEnabled = true, // Por defecto, el scroll está habilitado
  backgroundColor,
}: SafeContainerProps) {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: backgroundColor || theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContent,
          padding !== undefined
            ? { padding } // Si llega la prop padding, usa padding en vez de paddingVertical
            : { paddingVertical: spacing.medium }, // Si no, usa paddingVertical
        ]}
        style={style}
        scrollEnabled={isScrollEnabled} // Controlamos si el scroll está habilitado
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    gap: 20,
  },
});
