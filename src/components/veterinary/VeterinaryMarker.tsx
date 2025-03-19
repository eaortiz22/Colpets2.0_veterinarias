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
      title={Platform.OS === "ios" ? vet.name : undefined} // Evita sobreescribir el Callout en Android
      onPress={() => onPress(vet)}
    >
      <Image
        source={require("../../../assets/iconsPng/mapMarkerVeterinary.png")}
        style={{ width: 32, height: 32 }}
        resizeMode="contain"
      />
      <Callout tooltip={Platform.OS === "android"} onPress={() => {}}>
        <View
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 10,
            width: 150,
            alignItems: "center",
            elevation: 5, // Sombra en Android
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 4,
            shadowOffset: { width: 1, height: 2 },
          }}
        >
          <Image
            source={vet.image}
            style={{ width: 100, height: 80, borderRadius: 8, marginBottom: 4 }}
          />
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{ textAlign: "center" }}
          >
            {vet.name}
          </Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
          >
            <StarIcon fill={theme.colors.warning} width={16} height={16} />
            <Text style={{ marginLeft: 4 }}>
              {vet.rating} ({formatReviews(vet.reviews)})
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.primary,
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 4,
              marginTop: 8,
            }}
            onPress={() => onPress(vet)}
          >
            <Text style={{ color: "#fff" }}>Ver detalles</Text>
          </TouchableOpacity>
        </View>
      </Callout>
    </Marker>
  );
};

export default VeterinaryMarker;
