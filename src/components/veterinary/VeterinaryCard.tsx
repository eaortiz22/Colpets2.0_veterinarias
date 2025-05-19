import React from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ClockIcon,
  HeartIcon,
  MapMarkerIcon,
  ShareAltIcon,
  StarIcon,
  XIcon,
} from "../../../assets/icons";
import TextSmall from "../TextSmall";
import TextMedium from "../TextMedium";
import { useTheme } from "../../context/ThemeContext";
import { spacing } from "../../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { formatReviews } from "../../utils/formatUtils";
import { Veterinary } from "../../types/veterinaryTypes";
import { RootStackParamList } from "../../navigation/AppNavigator";

type VeterinaryCardProps = {
  vet: Veterinary;
  distanceInfo?: { distance: string; duration: string } | null;
  onClose: () => void;
};

type VeterinarinsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "VeterinaryDetails"
>;

const VeterinaryCard: React.FC<VeterinaryCardProps> = ({
  vet,
  distanceInfo,
  onClose,
}) => {
  const { theme } = useTheme();
  const navigation = useNavigation<VeterinarinsScreenNavigationProp>();

  const handlePress = () => {
    navigation.navigate("VeterinaryDetails", { veterinary: vet, distanceInfo });
  };

  return (
    <>
      <Animated.View
        style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Image source={vet.image} style={styles.cardImage} />
          <View style={{ flexDirection: "row", gap: 4 }}>
            <TouchableOpacity>
              <HeartIcon width={24} height={24} fill={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity>
              <ShareAltIcon width={24} height={24} fill={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>
        <TextMedium
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontWeight: "700", color: theme.colors.secondary }}
        >
          {vet.name}
        </TextMedium>
        <TextSmall style={{ color: theme.colors.secondary }}>
          {vet.schedule}
        </TextSmall>

        {distanceInfo && (
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <MapMarkerIcon width={16} height={16} fill={theme.colors.text} />
            <Text style={{ color: theme.colors.text }}>
              {distanceInfo?.distance}
            </Text>
            <Text style={{ color: theme.colors.text }}>|</Text>
            <ClockIcon width={16} height={16} fill={theme.colors.text} />
            <Text style={{ color: theme.colors.text }}>
              {distanceInfo?.duration}
            </Text>
          </View>
        )}

        <View style={styles.ratingContainer}>
          <StarIcon fill={theme.colors.warning} width={16} height={16} />
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: theme.colors.secondary, fontWeight: "700" }}>
              {vet.rating}
            </Text>
            <Text style={styles.ratingText}>
              ({formatReviews(vet.reviews)})
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Ver detalles</Text>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={[styles.closeButton, { backgroundColor: theme.colors.primary }]}
        onPress={onClose}
      >
        <XIcon width={16} height={16} fill={"#FFF"} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    bottom: 45,
    padding: 16,
    borderRadius: 12,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    maxHeight: "80%",
    width: "90%",
    zIndex: 2,
    gap: 4,
    alignSelf: "center",
  },
  cardImage: {
    width: 100,
    height: 80,
    borderRadius: 8,
    marginTop: -35,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  ratingText: {
    marginLeft: 4,
    color: "#777",
    fontSize: 14,
    fontWeight: "500",
  },
  button: {
    alignItems: "center",
    padding: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: spacing.medium,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    padding: 8,
    borderRadius: 99,
  },
});

export default VeterinaryCard;
