import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout, Region } from "react-native-maps";
import * as Location from "expo-location";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import HeaderBar from "../components/HeaderBar";
import SectionHeader from "../components/SectionHeader";
import ServicesSection from "../components/home/ServicesSection";
import { LocationArrowtIcon, StarIcon } from "../../assets/icons";
import SafeContainer from "../components/SafeContainer ";

const formatReviews = (reviews?: number) => {
  if (!reviews) return "0";
  if (reviews >= 1_000_000) return `${(reviews / 1_000_000).toFixed(1)}m`;
  if (reviews >= 1_000) return `${(reviews / 1_000).toFixed(1)}k`;
  return reviews.toString();
};

const VETERINARIAS = [
  {
    id: 1,
    name: "Veterinaria Piloto",
    latitude: 4.585876,
    longitude: -74.137913,
    rating: 4.5,
    reviews: 12400,
    image: require("../../assets/images/vet.jpg"),
  },
  {
    id: 2,
    name: "Sweet Animal",
    latitude: 4.591795,
    longitude: -74.140329,
    rating: 4.2,
    reviews: 9200,
    image: require("../../assets/images/vet2.jpg"),
  },
  {
    id: 3,
    name: "Pet Health",
    latitude: 4.705678,
    longitude: -74.069123,
    rating: 4.8,
    reviews: 5400,
    image: require("../../assets/images/vet.jpg"),
  },
];

export default function Veterinarians() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const mapRef = useRef<MapView | null>(null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      // Escuchar cambios en la dirección del dispositivo
      Location.watchHeadingAsync((headingData) => {
        setHeading(headingData.trueHeading); // trueHeading es la dirección real en grados
      });
    })();
  }, []);

  useEffect(() => {
    if (mapRef.current && location) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [location]);

  const handleRegionChangeComplete = (region: Region) => {
    if (!location) return;

    // Filtrar veterinarias dentro de la región visible
    const visibleVeterinarias = VETERINARIAS.filter(
      (vet) =>
        vet.latitude >= region.latitude - region.latitudeDelta / 2 &&
        vet.latitude <= region.latitude + region.latitudeDelta / 2 &&
        vet.longitude >= region.longitude - region.longitudeDelta / 2 &&
        vet.longitude <= region.longitude + region.longitudeDelta / 2
    );

    setMessage(
      visibleVeterinarias.length > 0
        ? `Se encontraron ${visibleVeterinarias.length} veterinarias en esta área`
        : "No hay veterinarias en esta área"
    );
  };

  const handleMarkerPress = (latitude: number, longitude: number) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
    }
  };

  const centerOnUser = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  };

  return (
    <SafeContainer style={{ marginBottom: 70 }}>
      <View style={{ padding: 16, gap: 16 }}>
        <HeaderBar
          location="Bogotá, Edificio Cataly"
          country="Colombia"
          onLocationPress={() => console.log("Ubicación seleccionada")}
          onSearchPress={() => console.log("Buscar acción")}
          onRightPress={() => console.log("Notificaciones abiertas")}
        />

        {errorMsg ? (
          <View style={styles.loading}>
            <Text style={{ color: "red" }}>{errorMsg}</Text>
          </View>
        ) : (
          <View style={{ gap: 16 }}>
            <SectionHeader
              title="Veterinarias cercanas"
              onViewAll={() => console.log("ver todo")}
            />
            <View style={styles.mapContainer}>
              {location ? (
                <>
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
                    followsUserLocation
                  >
                    {location && (
                      <Marker
                        coordinate={location}
                        anchor={{ x: 0.5, y: 0.5 }}
                        style={{ transform: [{ rotate: `${heading}deg` }] }}
                      >
                        <View style={[styles.directionIndicator]} />
                      </Marker>
                    )}

                    {VETERINARIAS.map((vet) => (
                      <Marker
                        key={vet.id}
                        coordinate={{
                          latitude: vet.latitude,
                          longitude: vet.longitude,
                        }}
                        title={vet.name}
                        onPress={() =>
                          handleMarkerPress(vet.latitude, vet.longitude)
                        }
                      >
                        <Image
                          source={require("../../assets/iconsPng/mapMarkerVeterinary.png")}
                          style={{ width: 32, height: 32 }}
                          resizeMode="contain"
                        />
                        <Callout>
                          <View style={styles.calloutContainer}>
                            <Image source={vet.image} style={styles.vetImage} />
                            <Text
                              numberOfLines={2}
                              ellipsizeMode="tail"
                              style={styles.ratingText}
                            >
                              {vet.name}
                            </Text>
                            <View style={styles.ratingContainer}>
                              <StarIcon
                                fill={theme.colors.warning}
                                width={16}
                                height={16}
                              />
                              <Text style={styles.ratingText}>
                                {vet.rating} ({formatReviews(vet.reviews)})
                              </Text>
                            </View>
                            <TouchableOpacity
                              style={[
                                styles.detailsButton,
                                { backgroundColor: theme.colors.primary },
                              ]}
                              // onPress={() =>
                              //   navigation.navigate("VeterinarianDetails", {
                              //     vet,
                              //   })
                              // }
                            >
                              <Text style={styles.detailsButtonText}>
                                Ver detalles
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </Callout>
                      </Marker>
                    ))}
                  </MapView>
                  {message ? (
                    <View style={styles.messageContainer}>
                      <Text style={styles.messageText}>{message}</Text>
                    </View>
                  ) : null}

                  {/* Botón para volver a la ubicación del usuario */}
                  <TouchableOpacity
                    style={[
                      styles.centerButton,
                      { backgroundColor: theme.colors.background },
                    ]}
                    onPress={centerOnUser}
                  >
                    <LocationArrowtIcon fill={theme.colors.primary} />
                  </TouchableOpacity>
                </>
              ) : (
                <View style={styles.loading}>
                  <Text>Cargando ubicación...</Text>
                </View>
              )}
            </View>
          </View>
        )}

        <View style={{ gap: 16 }}>
          <SectionHeader
            title="Servicios"
            onViewAll={() => console.log("ver todo")}
          />
          <ServicesSection />
        </View>
      </View>
    </SafeContainer>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 300,
    borderRadius: 16,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loading: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  calloutContainer: {
    alignItems: "center",
    maxHeight: 150,
    width: 125,
  },

  vetImage: {
    width: 100,
    height: 80,
    borderRadius: 8,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    color: "#777",
    fontSize: 14,
    fontWeight: "500",
  },
  messageContainer: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  messageText: {
    fontWeight: "bold",
    color: "#333",
  },
  centerButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    padding: 8,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  detailsButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  detailsButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  directionIndicator: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#a2d2ff",
    position: "absolute",
    top: -20, // Ajusta la posición
    left: -10, // Ajusta la posición
  },
});
