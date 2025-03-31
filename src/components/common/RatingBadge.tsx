import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StarIcon } from "../../../assets/icons";
import { spacing } from "../../styles/theme";
import { useTheme } from "../../context/ThemeContext";

interface RatingBadgeProps {
  rating: number | string;
  backgroundColor: string;
  iconColor: string;
}

const RatingBadge: React.FC<RatingBadgeProps> = ({
  rating,
  backgroundColor,
  iconColor,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.ratingContainer, { backgroundColor }]}>
      <StarIcon fill={iconColor} width={16} height={16} />
      <Text
        style={{
          color: theme.colors.secondary,
          fontWeight: "700",
          fontSize: spacing.medium,
        }}
      >
        {rating}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    padding: spacing.medium,
    borderRadius: 99,
    zIndex: 1,
    position: "absolute",
    top: 70,
    right: 16,
  },
  text: {
    fontWeight: "700",
    marginLeft: 4,
  },
});

export default RatingBadge;
