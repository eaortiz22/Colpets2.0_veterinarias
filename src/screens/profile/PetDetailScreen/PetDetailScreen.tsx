import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { spacing } from "../../../styles/theme";
import { RootStackParamList } from "../../../navigation/PetsNavigator/PetsNavigator";
import ArrowBack from "../../../components/ArrowBack";
import { useTheme } from "../../../context/ThemeContext";
import TextTitle from "../../../components/TextTitle";
import IconButton from "../../../components/IconButton";
import { EditIcon } from "../../../../assets/icons";
import LineHorizontal from "../../../components/ui/LineHorizontal";
import TextMedium from "../../../components/TextMedium";

type RouteParams = RouteProp<RootStackParamList, "PetDetailScreen">;

export default function PetDetailScreen() {
  const route = useRoute<RouteParams>();
  const { pet, backgroundColor, iconColor } = route.params;
  const { theme } = useTheme();

  return (
    <View style={[styles.container]}>
      <View
        style={[styles.imageContainer, { backgroundColor: backgroundColor }]}
      >
        <Image source={pet.image} resizeMode="cover" style={styles.image} />
        <ArrowBack style={{ top: 70 }} bgColor={iconColor} />
      </View>

      <View
        style={[
          styles.detailContainer,
          {
            backgroundColor: theme.colors.background,
            gap: 20,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextTitle>{pet.name}</TextTitle>
          <IconButton
            onPress={() => console.log("Editar mascota")}
            icon={EditIcon}
          />
        </View>
        <LineHorizontal bgColor={iconColor} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextMedium>Edad:</TextMedium>
          <TextMedium>{pet.age}</TextMedium>
        </View>
        <LineHorizontal bgColor={iconColor} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextMedium>Peso:</TextMedium>
          <TextMedium>{pet.weight}</TextMedium>
        </View>
        <LineHorizontal bgColor={iconColor} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextMedium>Género:</TextMedium>
          <TextMedium>{pet.gender}</TextMedium>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "75%",
    height: "75%",
    borderRadius: 16,
    position: "absolute",
    bottom: 10,
  },
  detailContainer: {
    flex: 6,
    padding: spacing.large,
    borderRadius: 36,
    marginTop: -36,
  },
});
