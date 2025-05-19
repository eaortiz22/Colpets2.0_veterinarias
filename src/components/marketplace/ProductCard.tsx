import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import TextSmall from "../TextSmall";
import { PlusIcon, StarIcon } from "../../../assets/icons"; // Asegúrate de importar el StarIcon
import { spacing } from "../../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { formatReviews } from "../../utils/formatUtils";

type ProductDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, "ProductDetail">;

const ProductCard = ({ products }: any) => {
  const navigation = useNavigation<ProductDetailScreenNavigationProp>();
  const { theme } = useTheme();

  const handlePress = (product: string) => {
    navigation.navigate("ProductDetail", { product });
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {products.map((product: any, index: number) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.cards,
            {
              backgroundColor: theme.colors.cardBackground,
              marginRight: index !== products.length - 1 ? 16 : 0,
              width: 200,
            },
          ]}
          onPress={() => handlePress(product)}
        >
          <Image source={product.image} resizeMode="cover" style={styles.image} />
          <View style={styles.cardDetails}>
            <View style={{ flex: 1, justifyContent: "space-between" }}>
              <TextSmall numberOfLines={2} ellipsizeMode="tail" style={{ color: theme.colors.text }}>
                {product.name}
              </TextSmall>
              {/* Sección de calificación */}
              <View style={styles.ratingContainer}>
                <StarIcon fill={theme.colors.warning} width={16} height={16} />
                <Text style={[styles.ratingText, { color: theme.colors.text }]}>
                  {product.rating} ({formatReviews(product.reviews)})
                </Text>
              </View>
              <Text style={[styles.priceText, { color: theme.colors.text }]}>${product.price.toLocaleString()}</Text>
            </View>
            <TouchableOpacity style={[styles.plusButton, { backgroundColor: theme.colors.primary }]}>
              <PlusIcon fill="white" width={16} height={16} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cards: {
    padding: spacing.medium,
    borderRadius: 32,
    width: 200,
    gap: 4,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 16,
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    color: "#777",
    fontSize: 14,
    fontWeight: "500",
  },
  priceText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 18,
  },
  plusButton: {
    padding: spacing.small,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductCard;
