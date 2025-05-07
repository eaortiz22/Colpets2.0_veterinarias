import React from "react";
import { useTheme } from "../context/ThemeContext";
import SafeContainer from "../components/SafeContainer";
import ServicesSection from "../components/home/ServicesSection";
import SectionHeader from "../components/SectionHeader";
import { View } from "react-native";
import HeaderBar from "../components/HeaderBar";

export default function Services() {
  const { theme } = useTheme();

  return (
    <SafeContainer>
      {/* Header */}
      <View>
        <HeaderBar
          location="Bogotá, Edificio Cataly"
          country="Colombia"
          onLocationPress={() => console.log("Ubicación seleccionada")}
          onSearchPress={() => console.log("Buscar acción")}
          onRightPress={() => console.log("Carrito abierto")}
          containerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
        />
      </View>
    </SafeContainer>
  );
}
