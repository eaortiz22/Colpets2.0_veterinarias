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

type Veterinary = {
  id: string;
  name: string;
  image: any;
  rating: number;
  reviews: number;
  latitude: number;
  longitude: number;
};

const MapComponent = ({
  mapRef,
  location,
  vets,
  handleRegionChangeComplete,
  message,
}: any) => {
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
        <Animated.View style={styles.card}>
          <Image source={selectedVet.image} style={styles.cardImage} />
          <Text numberOfLines={2} style={styles.cardTitle}>
            {selectedVet.name}
          </Text>
          <Text style={styles.cardRating}>
            ⭐ {selectedVet.rating} ({selectedVet.reviews})
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Ver detalles", selectedVet)}
          >
            <Text style={styles.buttonText}>Ver detalles</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedVet(null)}>
            <Text style={styles.closeText}>Cerrar</Text>
          </TouchableOpacity>
        </Animated.View>
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
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardImage: {
    width: 100,
    height: 80,
    borderRadius: 8,
  },
  cardTitle: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  cardRating: {
    marginTop: 4,
    color: "#777",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#4C9EEB",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeText: {
    marginTop: 8,
    color: "red",
    fontSize: 14,
  },
});

export default MapComponent;
