import React, { useRef, useState, useEffect } from "react";
import {
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

const screenWidth = Dimensions.get("window").width;

interface Promotion {
  id: string;
  image: any;
}

interface BannerCarouselProps {
  data: Promotion[];
  size?: number;
  styles?: boolean;
  containerStyle?: ViewStyle;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({
  data,
  size,
  styles,
  containerStyle,
}) => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<Promotion> | null>(null);
  const [isTouching, setIsTouching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTouching) {
        setCurrentIndex((prevIndex) =>
          prevIndex === data.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isTouching]);

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
    <FlatList
      ref={flatListRef}
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={handleScrollEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={[
        styles ? { borderRadius: 16, overflow: "hidden" } : {},
        containerStyle,
      ]}
      renderItem={({ item }) => (
        <Image
          source={item.image}
          resizeMode="cover"
          style={[
            defaultStyles.image,
            {
              width: size ? screenWidth - size : screenWidth,
              borderRadius: styles ? 16 : 0,
            },
          ]}
        />
      )}
    />
  );
};

const defaultStyles = StyleSheet.create({
  image: {
    height: 180,
    overflow: "hidden",
  },
});

export default BannerCarousel;
