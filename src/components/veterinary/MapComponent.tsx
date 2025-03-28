import React, { useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView from "react-native-maps";
import VeterinaryMarker from "./VeterinaryMarker";
import CenterButton from "./CenterButton";
import MessageBanner from "./MessageBanner";
import { useTheme } from "../../context/ThemeContext";
import { StarIcon, XIconIcon } from "../../../assets/icons";
import TextSmall from "../TextSmall";
import { spacing } from "../../styles/theme";
import TextMedium from "../TextMedium";

type Veterinary = {
  id: string;
  name: string;
  image: any;
  rating: number;
  reviews: number;
  latitude: number;
  longitude: number;
  schedule: string;
};
//***************/
//SACAR COMPONENTE
//***************/

const formatReviews = (reviews?: number) => {
  if (!reviews) return "0";
  if (reviews >= 1_000_000) return `${(reviews / 1_000_000).toFixed(1)}m`;
  if (reviews >= 1_000) return `${(reviews / 1_000).toFixed(1)}k`;
  return reviews.toString();
};

const MapComponent = ({
  mapRef,
  location,
  vets,
  handleRegionChangeComplete,
  message,
}: any) => {
  const { theme } = useTheme();

  const [selectedVet, setSelectedVet] = useState<Veterinary | null>(null);

  const focusOnVeterinary = (vet: any) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: vet.latitude,
        longitude: vet.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
    setSelectedVet(vet);
  };

  if (!location)
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando ubicación...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        onRegionChangeComplete={handleRegionChangeComplete}
        showsUserLocation
        rotateEnabled
        toolbarEnabled={false}
        showsMyLocationButton={false}
      >
        {vets.map((vet: any) => (
          <VeterinaryMarker
            key={vet.id}
            vet={vet}
            onPress={() => focusOnVeterinary(vet)}
          />
        ))}
      </MapView>

      {selectedVet && (
        <Animated.View
          style={[
            styles.card,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <Image source={selectedVet.image} style={styles.cardImage} />
          <TextMedium
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{ fontWeight: "700", color: theme.colors.secondary }}
          >
            {selectedVet.name}
          </TextMedium>
          <TextSmall style={{ color: theme.colors.secondary }}>
            {selectedVet.schedule}
          </TextSmall>

          <View style={styles.ratingContainer}>
            <StarIcon fill={theme.colors.warning} width={16} height={16} />
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ color: theme.colors.secondary, fontWeight: "700" }}
              >
                {selectedVet.rating}
              </Text>
              <Text style={styles.ratingText}>
                ({formatReviews(selectedVet.reviews)})
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Ver detalles", selectedVet)}
          >
            <Text style={styles.buttonText}>Ver detalles</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {selectedVet && (
        <TouchableOpacity
          style={[
            styles.closeButton,
            { backgroundColor: theme.colors.primary },
          ]}
          onPress={() => setSelectedVet(null)}
        >
          <XIconIcon width={16} height={16} fill={"#FFF"} />
        </TouchableOpacity>
      )}

      <MessageBanner message={message} />
      <CenterButton mapRef={mapRef} location={location} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
  },
  loadingText: {
    fontSize: 16,
    color: "#555",
  },
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
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
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
    backgroundColor: "#4C9EEB",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
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

export default MapComponent;
