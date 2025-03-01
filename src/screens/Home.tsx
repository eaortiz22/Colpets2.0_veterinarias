import React from "react";
import { useTheme } from "../context/ThemeContext";
import { StyleSheet, View } from "react-native";
import { spacing } from "../styles/theme";
import SafeContainer from "../components/SafeContainer ";
import TextTitle from "../components/TextTitle";
import HeaderBar from "../components/HeaderBar";
import BannerCarousel from "../components/ui/BannerCarousel";
import HealthReminderCard from "../components/home/HealthReminderCard";
import PetCareSection from "../components/home/PetCareSection";
import ProductSection from "../components/ProductSection";
import FeaturedVeterinaries from "../components/home/FeaturedVeterinaries";
import ViewAllButton from "../components/ui/ViewAllButton";
import SectionHeader from "../components/SectionHeader";
import ServicesSection from "../components/home/ServicesSection";

const dataBanners = [
  { id: "1", image: require("../../assets/images/bannerMarketplace.jpg") },
  { id: "2", image: require("../../assets/images/bannerMarketplace_2.jpg") },
  { id: "3", image: require("../../assets/images/bannerMarketplace_3.jpg") },
];

const carefulBanners = [
  { id: "1", image: require("../../assets/images/cremaPerro.webp") },
  { id: "2", image: require("../../assets/images/cremaPerro.webp") },
];

export default function Home() {
  const { theme, isDarkTheme } = useTheme();

  const reminders = [
    {
      id: "1",
      petName: "Luna",
      date: "25 de Febrero",
      event: "vacunación",
      image: require("../../assets/images/cremaPerro.webp"),
    },
    {
      id: "2",
      petName: "Max",
      date: "10 de Marzo",
      event: "desparasitación",
      image: require("../../assets/images/cremaPerro.webp"),
    },
  ];

  const products = Array(5).fill({
    id: "1",
    name: "Purina para perro",
    price: 30000,
    image: require("../../assets/images/product.png"),
    rating: 4.9,
    reviews: 3500,
  });

  const veterinaries = [
    {
      id: "1",
      name: "Veterinaria Patitas",
      image: require("../../assets/images/vet2.jpg"),
      rating: 4.8,
      reviews: 12400,
      neighborhood: "Fatima",
    },
    {
      id: "2",
      name: "Huellas & Amor",
      image: require("../../assets/images/vet.jpg"),
      rating: 4.7,
      reviews: 9800,
      neighborhood: "Venecia",
    },
    {
      id: "3",
      name: "PetCare Express",
      image: require("../../assets/images/vet2.jpg"),
      rating: 4.9,
      reviews: 7100,
      neighborhood: "Tunal",
    },
  ];

  return (
    <SafeContainer style={{ marginBottom: 70 }}>
      <View style={{ padding: spacing.medium, gap: 16 }}>
        <HeaderBar
          location="Bogotá, Edificio Cataly"
          country="Colombia"
          onLocationPress={() => console.log("Ubicación seleccionada")}
          onSearchPress={() => console.log("Buscar acción")}
          onRightPress={() => console.log("Notificaciones abiertas")}
        />
        <View style={{ borderRadius: 16 }}>
          <BannerCarousel data={dataBanners} size={32} styles />
        </View>

        <PetCareSection reminders={reminders} />

        <View style={{ gap: 16 }}>
          <SectionHeader
            title="Servicios"
            onViewAll={() => console.log("ver todo")}
          />
          <ServicesSection />
        </View>

        <ProductSection
          title="Productos destacados"
          products={products}
          onViewAll={() => console.log("Ver todos")}
          paddingHorizontal={0}
        />
        <FeaturedVeterinaries
          title="Veterinarias destacadas"
          onViewAll={() => console.log("Ver todos")}
          veterinaries={veterinaries}
        />
      </View>
    </SafeContainer>
  );
}
export const styles = StyleSheet.create({});
