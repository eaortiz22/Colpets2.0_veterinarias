import React from "react";
import { View, Text, Image, ImageSourcePropType, Pressable } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigator";

interface Vet {
  id: number;
  name: string;
  city: string;
  rating: number;
  reviews: number;
  image?: ImageSourcePropType;
  distanceInfo?: { distance: string; duration: string } | null;
}

type VeterinarinsScreenNavigationProp = StackNavigationProp<RootStackParamList, "VeterinaryDetails">;

const VetCardList: React.FC<{ vet: Vet }> = ({ vet }) => {
  const { theme } = useTheme();
  const navigation = useNavigation<VeterinarinsScreenNavigationProp>();

  const handlePress = () => {
    navigation.navigate("VeterinaryDetails", {
      veterinary: vet,
      distanceInfo: vet.distanceInfo || null,
    });
  };

  console.log(vet);

  return (
    <Pressable
      style={{
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 12,
        padding: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={handlePress}
    >
      {vet.image && <Image source={vet.image} style={{ width: 60, height: 60, borderRadius: 8, marginRight: 12 }} />}
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "600", fontSize: 16, color: theme.colors.text }}>{vet.name}</Text>
        <Text style={{ color: theme.colors.text }}>{vet.city}</Text>
        <Text style={{ color: theme.colors.text }}>
          ⭐ {vet.rating.toFixed(1)} · {vet.reviews} reseñas
        </Text>

        {vet.distanceInfo && (
          <Text style={{ color: theme.colors.text }}>
            📍 {vet.distanceInfo.distance} · ⏱ {vet.distanceInfo.duration}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default VetCardList;
