import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface IconButtonProps {
  onPress: () => void;
  icon: React.FC<{ fill: string; width: number; height: number }>;
}

const IconButton: React.FC<IconButtonProps> = ({ onPress, icon: Icon }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: theme.colors.primary }]}
      onPress={onPress}
    >
      <Icon fill="white" width={18} height={18} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 50,
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default IconButton;
