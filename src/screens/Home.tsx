import React from "react";
import { useTheme } from "../context/ThemeContext";
import { StyleSheet, View } from "react-native";
import { spacing } from "../styles/theme";
import SafeContainer from "../components/SafeContainer ";
import TextTitle from "../components/TextTitle";
import HeaderBar from "../components/HeaderBar";
import BannerCarousel from "../components/ui/BannerCarousel";
import HealthReminderCard from "../components/home/HealthReminderCard";

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

  let reminders = false;

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

        <View style={{ gap: 8 }}>
          <TextTitle>Cuida a tu mascota hoy</TextTitle>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <HealthReminderCard
              reminders={[
                {
                  id: "1",
                  petName: "Max",
                  date: "15 de agosto",
                  event: "vacuna",
                },
              ]}
            />
          </View>
        </View>
      </View>
    </SafeContainer>
  );
}
export const styles = StyleSheet.create({});
