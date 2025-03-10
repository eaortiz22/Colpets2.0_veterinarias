import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
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
  onPress: () => void;
}) => {
  const { theme } = useTheme();
  return (
    <Marker
      coordinate={{ latitude: vet.latitude, longitude: vet.longitude }}
      title={vet.name}
      onPress={onPress}
    >
      <Image
        source={require("../../../assets/iconsPng/mapMarkerVeterinary.png")}
        style={{ width: 32, height: 32 }}
        resizeMode="contain"
      />
      <Callout>
        <View style={{ alignItems: "center", width: 125 }}>
          <Image
            source={vet.image}
            style={{ width: 100, height: 80, borderRadius: 8, marginBottom: 4 }}
          />
          <Text numberOfLines={2} ellipsizeMode="tail">
            {vet.name}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <StarIcon fill={theme.colors.warning} width={16} height={16} />
            <Text style={{ marginLeft: 4 }}>
              {vet.rating} ({formatReviews(vet.reviews)})
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.primary,
              padding: 6,
              borderRadius: 4,
            }}
          >
            <Text style={{ color: "#fff" }}>Ver detalles</Text>
          </TouchableOpacity>
        </View>
      </Callout>
    </Marker>
  );
};

export default VeterinaryMarker;
