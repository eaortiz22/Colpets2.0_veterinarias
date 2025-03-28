import React from "react";
import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import { Marker, Callout } from "react-native-maps";
import { useTheme } from "../../context/ThemeContext";
import { StarIcon } from "../../../assets/icons";

const formatReviews = (reviews?: number) => {
  if (!reviews) return "0";
  if (reviews >= 1_000_000) return `${(reviews / 1_000_000).toFixed(1)}m`;
  if (reviews >= 1_000) return `${(reviews / 1_000).toFixed(1)}k`;
  return reviews.toString();
};

const VeterinaryMarker = ({
  vet,
  onPress,
}: {
  vet: any;
  onPress: (vet: any) => void;
}) => {
  const { theme } = useTheme();
  return (
    <Marker
      coordinate={{ latitude: vet.latitude, longitude: vet.longitude }}
      onPress={() => onPress(vet)}
    >
      <Image
        source={require("../../../assets/iconsPng/mapMarkerVeterinary.png")}
        style={{ width: 32, height: 32 }}
        resizeMode="contain"
      />
    </Marker>
  );
};

export default VeterinaryMarker;
