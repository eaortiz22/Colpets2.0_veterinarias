import React from "react";
import { Text, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import VeterinaryMarker from "./VeterinaryMarker";
import CenterButton from "./CenterButton";
import MessageBanner from "./MessageBanner";

const MapComponent = ({
  mapRef,
  location,
  veterinarias,
  handleRegionChangeComplete,
  message,
}: any) => {
  const focusOnVeterinary = (vet: any) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: vet.latitude,
        longitude: vet.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  if (!location)
    return (
      <View
        style={{ height: 300, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Cargando ubicación...</Text>
      </View>
    );

  return (
    <View style={{ height: 300, borderRadius: 16, overflow: "hidden" }}>
      <MapView
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
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
        {veterinarias.map((vet: any) => (
          <VeterinaryMarker
            key={vet.id}
            vet={vet}
            onPress={() => focusOnVeterinary(vet)}
          />
        ))}
      </MapView>
      <MessageBanner message={message} />
      <CenterButton mapRef={mapRef} location={location} />
    </View>
  );
};

export default MapComponent;
