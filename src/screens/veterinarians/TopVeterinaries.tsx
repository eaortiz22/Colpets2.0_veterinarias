import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import VetCardList from "./VetCardList";
import { ImageSourcePropType } from "react-native";
import { getDistance } from "../../services/distanceService";

interface Vet {
  id: number;
  name: string;
  city: string;
  rating: number;
  reviews: number;
  image?: ImageSourcePropType;
  latitude: number;  // Asegúrate de que la veterinaria tenga latitud
  longitude: number; // Y longitud también
  distanceInfo?: { distance: string; duration: string } | null;
}

interface TopVeterinariesProps {
  vets: Vet[];
  city: string;
  topCount?: number;
  location: any;
}

const TopVeterinaries: React.FC<TopVeterinariesProps> = ({ vets, city, topCount = 5, location }) => {
  const [vetsWithDistance, setVetsWithDistance] = useState<any[]>([]);

  useEffect(() => {
    const calculateDistances = async () => {
      if (location) {
        // Filtrar y ordenar las veterinarias
        const filteredVets = vets
          .filter((vet) => vet.city.toLowerCase() === city.toLowerCase())
          .sort((a, b) => {
            if (b.rating === a.rating) {
              return b.reviews - a.reviews;
            }
            return b.rating - a.rating;
          })
          .slice(0, topCount);

        // Calcular distancia y duración para cada veterinaria
        const updatedVets = await Promise.all(
          filteredVets.map(async (vet) => {
            const distanceInfo = await getDistance(location, vet);  // Calcular la distancia
            return { ...vet, distanceInfo };  // Añadir la info de distancia a la veterinaria
          })
        );

        setVetsWithDistance(updatedVets);  // Actualizar el estado con las veterinarias con distancia
      }
    };

    calculateDistances();  // Ejecutar el cálculo
  }, [location, city, vets, topCount]);

  return (
    <View style={{ gap: 8 }}>
      {vetsWithDistance.length === 0 ? (
        <Text style={{ textAlign: "center", fontStyle: "italic" }}>
          No hay veterinarias destacadas en esta ciudad.
        </Text>
      ) : (
        vetsWithDistance.map((vet) => (
          <VetCardList key={vet.id} vet={vet} />  // Pasar la veterinaria con la distancia calculada
        ))
      )}
    </View>
  );
};

export default TopVeterinaries;
