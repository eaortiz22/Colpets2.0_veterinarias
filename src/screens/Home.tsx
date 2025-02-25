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

  return (
    <SafeContainer>
      <View style={{ padding: spacing.medium, gap: 16 }}>
        <HeaderBar
          location="Medellín, Centro Empresarial"
          country="Colombia"
          onLocationPress={() => console.log("Ubicación seleccionada")}
          onSearchPress={() => console.log("Buscar acción")}
          onNotificationPress={() => console.log("Notificaciones abiertas")}
        />
        <View style={{ borderRadius: 16 }}>
          <BannerCarousel data={dataBanners} size={32} styles />
        </View>

        <PetCareSection reminders={reminders} />

        <ProductSection
          title="Productos recomendados"
          products={products}
          onViewAll={() => console.log("Ver todos")}
          paddingHorizontal={0}
        />
      </View>
    </SafeContainer>
  );
}
export const styles = StyleSheet.create({});
