import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { spacing } from "../../styles/theme";
import { useTheme } from "../../context/ThemeContext";

interface CardProps {
  children: React.ReactNode;
  styles?: ViewStyle;
}

const Card: React.FC<CardProps> = ({ children, styles }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        defaultStyles.cards,
        { backgroundColor: theme.colors.cardBackground },
        styles,
      ]}
    >
      {children}
    </View>
  );
};

export default Card;

const defaultStyles = StyleSheet.create({
  cards: {
    padding: spacing.medium,
    borderRadius: 32,
    marginRight: 16,
    flex: 1,
    width: "100%",
  },
});
