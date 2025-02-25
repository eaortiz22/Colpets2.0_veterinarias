import React from "react";
import { View, TouchableOpacity } from "react-native";
import TextTitle from "./TextTitle";
import TextSmall from "./TextSmall";
import { AngleIcon } from "../../assets/icons";
import ProductCard from "./marketplace/ProductCard";
import { useTheme } from "../context/ThemeContext";

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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* Título con truncado si es muy largo */}
        <TextTitle
          style={{ fontWeight: "700", flex: 1 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </TextTitle>

        {onViewAll && (
          <TouchableOpacity
            onPress={onViewAll}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 8,
            }}
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
        )}
      </View>

      <ProductCard products={products} />
    </View>
  );
};

export default ProductSection;
