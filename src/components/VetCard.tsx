// components/VetCard.tsx
import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";
import TextSmall from "./TextSmall";
import IconButton from "./IconButton";
import { HeartIcon, StarIcon } from "../../assets/icons";
import { spacing } from "../styles/theme";

type VetCardProps = {
  name: string;
  last_name: string;
  role: string;
  rating: number;
  onLike?: () => void;
  image?: any;
  gender: string;
};

const VetCard: React.FC<VetCardProps> = ({
  name,
  last_name,
  role,
  rating,
  onLike,
  image,
  gender,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}
    >
      <View style={styles.header}>
        <View style={{ flexShrink: 1 }}>
          <TextSmall
            style={[styles.name, { color: theme.colors.text }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {name} {last_name}
          </TextSmall>
          <Text style={{ color: theme.colors.text }}>{role}</Text>
        </View>
        <IconButton onPress={() => onLike} icon={HeartIcon} />
      </View>

      <View style={styles.rating}>
        <StarIcon fill={theme.colors.primary} width={16} height={16} />
        <Text style={{ color: theme.colors.text }}>{rating.toFixed(1)}</Text>
      </View>

      <View style={styles.imageWrapper}>
        <Image
          source={
            image ||
            (gender === "male"
              ? require("../../assets/images/vetManIA.png")
              : require("../../assets/images/vetIA.png"))
          }
          resizeMode="contain"
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.medium,
    borderRadius: 16,
    height: 200,
    width: 200,
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontWeight: "700",
  },
  rating: {
    flexDirection: "row",
    gap: 4,
  },
  imageWrapper: {
    position: "absolute",
    bottom: 0,
    right: -35,
    width: 150,
    height: 150,
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default VetCard;
