import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import MapView, { Region } from "react-native-maps";
import * as Location from "expo-location";
import HeaderBar from "../components/HeaderBar";
import SectionHeader from "../components/SectionHeader";
import SafeContainer from "../components/SafeContainer ";
import MapComponent from "../components/veterinary/MapComponent";
import { VETS } from "../data/veterinaries";
import TopVeterinaries from "./veterinarians/TopVeterinaries";

export default function Veterinarians() {
  const mapRef = useRef<MapView | null>(null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  const handleRegionChangeComplete = (region: Region) => {
    if (!location) return;
    const visibleVeterinarias = VETS.filter(
      (vet) =>
        vet.latitude >= region.latitude - region.latitudeDelta / 2 &&
        vet.latitude <= region.latitude + region.latitudeDelta / 2 &&
        vet.longitude >= region.longitude - region.longitudeDelta / 2 &&
        vet.longitude <= region.longitude + region.longitudeDelta / 2
    );
    setMessage(
      visibleVeterinarias.length
        ? `Se encontraron ${visibleVeterinarias.length} veterinarias en esta área`
        : "No hay veterinarias en esta área"
    );
  };

  return (
    <SafeContainer style={{ marginBottom: 70 }}>
      <View style={{ padding: 16, gap: 16 }}>
        <HeaderBar location="Bogotá, Edificio Cataly" country="Colombia" />
        {errorMsg ? (
          <View
            style={{
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "red" }}>{errorMsg}</Text>
          </View>
        ) : (
          <>
            <SectionHeader title="Veterinarias cercanas" />
            <MapComponent
              mapRef={mapRef}
              location={location}
              vets={VETS}
              handleRegionChangeComplete={handleRegionChangeComplete}
              message={message}
            />
            <SectionHeader title="Top 5 veterinarias Bogotá" />
            <TopVeterinaries vets={VETS} city="Bogotá" location={location} />
          </>
        )}
      </View>
    </SafeContainer>
  );
}
