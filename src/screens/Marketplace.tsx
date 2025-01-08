import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import Button from "../components/Button";
import TextTitle from "../components/TextTitle";
import { SearchIcon, ShoppingCartIcon, AngleIcon } from "../../assets/icons";
import { spacing } from "../styles/theme";
import TextMedium from "../components/TextMedium";
import TextSmall from "../components/TextSmall";

const promotions = [
  { id: "1", image: require("../../assets/images/bannerMarketplace.jpg") },
  { id: "2", image: require("../../assets/images/bannerMarketplace_2.jpg") },
  { id: "3", image: require("../../assets/images/bannerMarketplace_3.jpg") },
];

const categories = [
  {
    id: "1",
    name: "Comida",
    image: require("../../assets/images/imageProfile.jpg"),
  },
  {
    id: "2",
    name: "Ropa",
    image: require("../../assets/images/imageProfile.jpg"),
  },
  {
    id: "3",
    name: "Electrónica",
    image: require("../../assets/images/imageProfile.jpg"),
  },
  {
    id: "4",
    name: "Hogar",
    image: require("../../assets/images/imageProfile.jpg"),
  },
  {
    id: "5",
    name: "Juguetes",
    image: require("../../assets/images/imageProfile.jpg"),
  },
];

const screenWidth = Dimensions.get("window").width;

export default function Marketplace() {
  const { theme } = useTheme();

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const [isTouching, setIsTouching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTouching) {
        setCurrentIndex((prevIndex) =>
          prevIndex === promotions.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isTouching]); // Dependencia de isTouching

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex]);

  const handleScrollEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(index);
  };

  const handleTouchStart = () => {
    setIsTouching(true);
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <View style={styles.header}>
          <TextTitle>Marketplace</TextTitle>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <SearchIcon size={24} fill={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity>
              <ShoppingCartIcon size={24} fill={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Banner */}
        <View>
          <FlatList
            ref={flatListRef}
            data={promotions}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScrollEnd}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            renderItem={({ item }) => (
              <Image
                source={item.image}
                resizeMode="cover"
                style={styles.image}
              />
            )}
          />
        </View>

        {/* Categories */}
        <View>
          <View style={styles.header}>
            <TextMedium style={{ fontWeight: "600" }}>
              Compra por categoria
            </TextMedium>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <TextSmall style={{ color: theme.colors.secondary }}>
                Ver todo
              </TextSmall>
              <AngleIcon
                size={12}
                fill={theme.colors.secondary}
                width={16}
                height={16}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
              <TouchableOpacity
                style={[
                  styles.categoryItem,
                  index !== categories.length - 1 && { marginRight: 16 },
                ]}
                key={category.id}
              >
                <Image
                  source={category.image}
                  resizeMode="cover"
                  style={styles.categoryImage}
                />
                <TextSmall
                  style={styles.categoryText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {category.name}
                </TextSmall>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View>
          <View style={styles.header}>
            <TextMedium style={{ fontWeight: "600" }}>
              Creado para ti
            </TextMedium>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <TextSmall style={{ color: theme.colors.secondary }}>
                Ver todo
              </TextSmall>
              <AngleIcon
                size={12}
                fill={theme.colors.secondary}
                width={16}
                height={16}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.medium,
  },
  scrollViewContent: {
    flexGrow: 1,
    gap: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    gap: spacing.medium,
  },
  image: {
    width: screenWidth,
    height: 180,
    overflow: "hidden",
  },
  categoryItem: {
    gap: 4,
    width: 70,
    alignItems: "center",
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  categoryText: {
    maxWidth: 70,
    overflow: "hidden",
  },
});
