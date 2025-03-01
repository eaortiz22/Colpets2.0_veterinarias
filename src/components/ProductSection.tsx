import React from "react";
import { View, TouchableOpacity } from "react-native";
import TextTitle from "./TextTitle";
import TextSmall from "./TextSmall";
import { AngleIcon } from "../../assets/icons";
import ProductCard from "./marketplace/ProductCard";
import { useTheme } from "../context/ThemeContext";
import SectionHeader from "./SectionHeader";

interface ProductSectionProps {
  title: string;
  products: any[];
  onViewAll?: () => void;
  paddingHorizontal?: number;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  products,
  onViewAll,
  paddingHorizontal = 16,
}) => {
  const { theme } = useTheme();

  return (
    <View style={{ paddingHorizontal, gap: 8 }}>
      <SectionHeader title="Productos destacados" onViewAll={onViewAll} />
      <ProductCard products={products} />
    </View>
  );
};

export default ProductSection;
