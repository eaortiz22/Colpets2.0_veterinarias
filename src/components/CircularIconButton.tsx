import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { spacing } from "../styles/theme";

interface CircularIconButtonProps {
  icon: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function CircularIconButton({
  icon,
  onPress,
}: CircularIconButtonProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: theme.colors.cardBackground }]}
      onPress={onPress}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: spacing.small,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
