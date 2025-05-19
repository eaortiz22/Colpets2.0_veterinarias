import React, { useState, useEffect, useRef } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import MapView, { Region } from "react-native-maps";
import HeaderBar from "../components/HeaderBar";
import SectionHeader from "../components/SectionHeader";
import SafeContainer from "../components/SafeContainer";
import MapComponent from "../components/veterinary/MapComponent";
import { VETS } from "../data/veterinaries";
import TopVeterinaries from "./veterinarians/TopVeterinaries";
import { useTheme } from "../context/ThemeContext";
import { useLocation } from "../context/LocationContext";

export default function Veterinarians() {
  const { theme } = useTheme();

  const mapRef = useRef<MapView | null>(null);
  const { location, errorMsg, isLoading } = useLocation();
  const [message, setMessage] = useState("");

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
        {isLoading ? (
          <View style={{ height: "100%", justifyContent: "center", alignItems: "center", gap: 16 }}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={{ color: theme.colors.text }}>Cargando mapa...</Text>
          </View>
        ) : errorMsg ? (
          <View style={{ height: 300, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "red" }}>{errorMsg}</Text>
          </View>
        ) : (
          <>
            <SectionHeader
              title="Veterinarias cercanas"
              text="Mapa completo"
              onViewAll={() => console.log("mapa completo")}
            />
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
