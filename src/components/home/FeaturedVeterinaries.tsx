import React from "react";
import { View, TouchableOpacity, ScrollView, Image, Text, StyleSheet } from "react-native";
import TextTitle from "../TextTitle";
import { useTheme } from "../../context/ThemeContext";
import TextSmall from "../TextSmall";
import { AngleIcon, MapMarkerIcon, StarIcon } from "../../../assets/icons";
import { spacing } from "../../styles/theme";
import SectionHeader from "../SectionHeader";
import { formatReviews } from "../../utils/formatUtils";

interface VeterinarySectionProps {
  title: string;
  veterinaries: any[];
  onViewAll?: () => void;
  paddingHorizontal?: number;
}

const VeterinarySection: React.FC<VeterinarySectionProps> = ({
  title,
  veterinaries,
  onViewAll,
  paddingHorizontal = 0,
}) => {
  const { theme } = useTheme();

  return (
    <View style={{ paddingHorizontal, gap: 8 }}>
      <SectionHeader title="Veterinarias destacadas" onViewAll={onViewAll} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {veterinaries.map((veterinary, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.cardBackground,
                marginRight: index !== veterinaries.length - 1 ? 16 : 0,
              },
            ]}
          >
            <Image source={veterinary.image} resizeMode="cover" style={styles.image} />
            <View>
              <TextSmall numberOfLines={2} ellipsizeMode="tail">
                {veterinary.name}
              </TextSmall>
              <View style={styles.ratingContainer}>
                <StarIcon fill={theme.colors.warning} width={16} height={16} />
                <Text style={[styles.ratingText, { color: theme.colors.text }]}>
                  {veterinary.rating} ({formatReviews(veterinary.reviews)})
                </Text>
              </View>

              <View style={styles.locationContainer}>
                <MapMarkerIcon fill={theme.colors.text} width={16} height={16} />
                <TextSmall>{veterinary.neighborhood}</TextSmall>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.medium,
    borderRadius: 16,
    width: 200,
    gap: 4,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    color: "#777",
    fontSize: 14,
    fontWeight: "500",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

export default VeterinarySection;
