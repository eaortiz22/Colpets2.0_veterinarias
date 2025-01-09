import React, { useRef, useState, useEffect } from 'react';
import { FlatList, Image, Dimensions } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

interface Promotion {
  id: string;
  image: any; // Ajusta el tipo de 'image' según el tipo que uses en tu aplicación
}

const BannerCarousel = ({ promotions }: { promotions: Promotion[] }) => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<Promotion> | null>(null);
  const [isTouching, setIsTouching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTouching) {
        setCurrentIndex((prevIndex) => (prevIndex === promotions.length - 1 ? 0 : prevIndex + 1));
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
      data={promotions}
      keyExtractor={(item) => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={handleScrollEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      renderItem={({ item }) => <Image source={item.image} resizeMode="cover" style={styles.image} />}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: screenWidth,
    height: 180,
    overflow: 'hidden',
  },
});

export default BannerCarousel;
