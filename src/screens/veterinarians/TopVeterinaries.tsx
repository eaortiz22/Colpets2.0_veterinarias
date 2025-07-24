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
  latitude: number; // Asegúrate de que la veterinaria tenga latitud
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
  const [topVets, setTopVets] = useState<Vet[]>([]);

  useEffect(() => {
    const filtered = vets
      .filter((vet) => vet.city.toLowerCase() === city.toLowerCase())
      .sort((a, b) => (b.rating === a.rating ? b.reviews - a.reviews : b.rating - a.rating))
      .slice(0, topCount);

    setTopVets(filtered);
  }, [city, vets, topCount]);

  return (
    <View style={{ gap: 8 }}>
      {topVets.length === 0 ? (
        <Text style={{ textAlign: "center", fontStyle: "italic" }}>No hay veterinarias destacadas en esta ciudad.</Text>
      ) : (
        topVets.map((vet) => <VetCardList key={vet.id} vet={vet} />)
      )}
    </View>
  );
};

export default TopVeterinaries;
