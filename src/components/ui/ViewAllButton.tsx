import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import TextSmall from "../TextSmall";
import { AngleIcon } from "../../../assets/icons";
import { useTheme } from "../../context/ThemeContext";

interface ViewAllButtonProps {
  onPress: () => void;
}

const ViewAllButton: React.FC<ViewAllButtonProps> = ({ onPress }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <TextSmall style={{ color: theme.colors.primary }}>Ver todo</TextSmall>
      <AngleIcon size={12} fill={theme.colors.primary} width={16} height={16} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
});

export default ViewAllButton;
