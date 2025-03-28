import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import MapView, { Region } from "react-native-maps";
import * as Location from "expo-location";
import { useTheme } from "../context/ThemeContext";
import HeaderBar from "../components/HeaderBar";
import SectionHeader from "../components/SectionHeader";
import ServicesSection from "../components/home/ServicesSection";
import SafeContainer from "../components/SafeContainer ";
import MapComponent from "../components/veterinary/MapComponent";

const VETS = [
  {
    id: 1,
    name: "Veterinaria Piloto",
    latitude: 4.585876,
    longitude: -74.137913,
    rating: 4.5,
    reviews: 12400,
    image: require("../../assets/images/vet.jpg"),
    schedule: "Lunes a Viernes 10:00 - 18:00",
  },
  {
    id: 2,
    name: "Sweet Animal",
    latitude: 4.591795,
    longitude: -74.140329,
    rating: 4.2,
    reviews: 9200,
    image: require("../../assets/images/vet2.jpg"),
    schedule: "Lunes a Sábado 09:00 - 19:00",
  },
  {
    id: 3,
    name: "Pet Health",
    latitude: 4.705678,
    longitude: -74.069123,
    rating: 4.8,
    reviews: 5400,
    image: require("../../assets/images/vet.jpg"),
    schedule: "Todos los días 08:00 - 20:00",
  },
];

export default function Veterinarians() {
  const { theme } = useTheme();
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
            <SectionHeader title="Servicios" />
            <ServicesSection />
          </>
        )}
      </View>
    </SafeContainer>
  );
}
