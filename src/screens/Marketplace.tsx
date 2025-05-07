import React from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import TextTitle from "../components/TextTitle";
import { AngleIcon } from "../../assets/icons";
import { spacing } from "../styles/theme";
import TextSmall from "../components/TextSmall";
import HeaderComponent from "../components/marketplace/HeaderComponent";
import BannerCarousel from "../components/ui/BannerCarousel";
import CategoryList from "../components/marketplace/CategoryList";
import ProductCard from "../components/marketplace/ProductCard";
import SafeContainer from "../components/SafeContainer";
import ProductSection from "../components/ProductSection";
import HeaderBar from "../components/HeaderBar";

const promotions = [
  { id: "1", image: require("../../assets/images/bannerMarketplace.jpg") },
  { id: "2", image: require("../../assets/images/bannerMarketplace_2.jpg") },
  { id: "3", image: require("../../assets/images/bannerMarketplace_3.jpg") },
];

const categories = [
  {
    id: "1",
    name: "Comida",
  },
  {
    id: "2",
    name: "Accesorios",
  },
  {
    id: "3",
    name: "Salud",
  },
  {
    id: "4",
    name: "Juguetes",
  },
  {
    id: "5",
    name: "Hogar",
  },
];

const products = Array(5).fill({
  id: "1",
  name: "Purina para perro",
  price: 30000,
  image: require("../../assets/images/product.png"),
  rating: 4.8,
  reviews: 2200,
});

export default function Marketplace() {
  const { theme } = useTheme();

  return (
    <SafeContainer style={{ marginBottom: 70 }}>
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

      {/* Banner */}
      <View>
        <BannerCarousel data={promotions} />
      </View>

      {/* Categories */}
      <View
        style={{
          paddingHorizontal: spacing.medium,
          gap: 8,
        }}
      >
        <View style={[styles.header, { paddingHorizontal: 0 }]}>
          <TextTitle style={{ fontWeight: "700" }}>
            Compra por categoria
          </TextTitle>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <TextSmall style={{ color: theme.colors.primary }}>
              Ver todo
            </TextSmall>
            <AngleIcon
              size={12}
              fill={theme.colors.primary}
              width={16}
              height={16}
            />
          </TouchableOpacity>
        </View>
        <View>
          <CategoryList categories={categories} />
        </View>
      </View>
      {/* Recommended */}
      <ProductSection
        title="Recomendados"
        products={products}
        onViewAll={() => console.log("Ver todos")}
      />
    </SafeContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: spacing.medium,
  },
  scrollViewContent: {
    flexGrow: 1,
    gap: 20,
  },
  header: {
    paddingHorizontal: spacing.medium,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
