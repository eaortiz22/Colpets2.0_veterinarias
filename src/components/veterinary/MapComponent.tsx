import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import VeterinaryMarker from "./VeterinaryMarker";
import CenterButton from "./CenterButton";
import MessageBanner from "./MessageBanner";
import VeterinaryCard from "./VeterinaryCard";
import { Veterinary } from "../../types/veterinaryTypes";
import { getDistance } from "../../services/distanceService";

const MapComponent = ({
  mapRef,
  location,
  vets,
  handleRegionChangeComplete,
  message,
}: any) => {
  const [selectedVet, setSelectedVet] = useState<Veterinary | null>(null);
  const [distanceInfo, setDistanceInfo] = useState<{
    distance: string;
    duration: string;
  } | null>(null);

  const focusOnVeterinary = async (vet: Veterinary) => {
    mapRef.current?.animateToRegion({
      latitude: vet.latitude,
      longitude: vet.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setSelectedVet(vet);

    if (location) {
      const result = await getDistance(location, vet);
      setDistanceInfo(result);
    }
  };

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando ubicación...</Text>
      </View>
    );
  }

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
        {vets.map((vet: Veterinary) => (
          <VeterinaryMarker
            key={vet.id}
            vet={vet}
            onPress={() => focusOnVeterinary(vet)}
          />
        ))}
      </MapView>

      {!!selectedVet && (
        <VeterinaryCard
          vet={selectedVet}
          distanceInfo={distanceInfo}
          onClose={() => setSelectedVet(null)}
        />
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
});

export default MapComponent;
