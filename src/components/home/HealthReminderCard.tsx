import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Card from "../ui/Card";
import { useTheme } from "../../context/ThemeContext";
import TextMedium from "../TextMedium";

const screenWidth = Dimensions.get("window").width;

interface Reminder {
  id: string;
  petName: string;
  date: string;
  event: string;
  image: any;
}

interface HealthReminderCardProps {
  reminders?: Reminder[];
  cardStyle?: ViewStyle;
}

const HealthReminderCard: React.FC<HealthReminderCardProps> = ({
  reminders = [],
  cardStyle,
}) => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<Reminder>>(null);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentIndex(index);
  };

  const handleDotPress = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };

  return (
    <Card
      styles={{
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 16,
        ...cardStyle,
      }}
    >
      <FlatList
        ref={flatListRef}
        data={reminders}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <TextMedium>Recuerda:</TextMedium>
              <Text style={[styles.text, { color: theme.colors.text }]}>
                {`La ${item.event} de ${item.petName} el ${item.date}`}
              </Text>
            </View>
          </View>
        )}
      />

      <View style={styles.dotsContainer}>
        {reminders.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDotPress(index)}
            style={[
              styles.dot,
              currentIndex === index && {
                backgroundColor: theme.colors.primary,
              },
            ]}
          />
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 80,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    gap: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    flexShrink: 1,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
});

export default HealthReminderCard;
