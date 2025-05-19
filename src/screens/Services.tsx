import React from "react";
import { useTheme } from "../context/ThemeContext";
import SafeContainer from "../components/SafeContainer";
import { View } from "react-native";
import HeaderBar from "../components/HeaderBar";
import SectionHeader from "../components/SectionHeader";
import ServicesSection from "../components/home/ServicesSection";
import { spacing } from "../styles/theme";

export default function Services() {
  const { theme } = useTheme();

  return (
    <SafeContainer>
      {/* Header */}
      <View style={{ padding: spacing.medium, gap: 16 }}>
        <HeaderBar
          location="Bogotá, Edificio Cataly"
          country="Colombia"
          onLocationPress={() => console.log("Ubicación seleccionada")}
          onSearchPress={() => console.log("Buscar acción")}
          onRightPress={() => console.log("Carrito abierto")}
        />
        <View style={{ gap: 16 }}>
          <SectionHeader title="Servicios" onViewAll={() => console.log("ver todo")} />
          <ServicesSection />
        </View>
      </View>
    </SafeContainer>
  );
}
