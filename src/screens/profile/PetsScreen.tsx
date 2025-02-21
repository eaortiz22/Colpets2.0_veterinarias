import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TextTitle from "../../components/TextTitle";
import { spacing } from "../../styles/theme";
import { useTheme } from "../../context/ThemeContext";
import {
  ArrowLeftIcon,
  PetFootprintIcon,
  PlusIcon,
} from "../../../assets/icons";
import {
  NavigationContainerProps,
  useNavigation,
} from "@react-navigation/native";
import TextMedium from "../../components/TextMedium";
import { pastelColorPairs } from "../../utils/pastelColors";
import IconButton from "../../components/IconButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/PetsNavigator/PetsNavigator";

type NavigationProps = StackNavigationProp<RootStackParamList, "PetsScreen">;

export default function PetsScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProps>();

  const pets = [
    {
      id: 1,
      name: "Firulais",
      image: require("../../../assets/images/imageProfile.jpg"),
      age: "2 años",
      weight: "5kg",
      gender: "Macho",
    },
    {
      id: 2,
      name: "Michi",
      image: require("../../../assets/images/imageProfile.jpg"),
      age: "3 años",
      weight: "3kg",
      gender: "Hembra",
    },
    {
      id: 3,
      name: "Rex",
      image: require("../../../assets/images/imageProfile.jpg"),
      age: "1 año",
      weight: "7kg",
      gender: "Macho",
    },
    // {
    //   id: 4,
    //   name: "Pelusa",
    //   image: require("../../../assets/images/imageProfile.jpg"),
    //   age: "4 años",
    //   weight: "4kg",
    //   gender: "Hembra",
    // },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <ArrowLeftIcon
            fill={theme.colors.secondary}
            width={32}
            height={32}
            onPress={() => navigation.goBack()}
          />
          <TextTitle>Mis mascotas</TextTitle>
          <IconButton
            onPress={() => console.log("Añadir mascota")}
            icon={PlusIcon}
          />
        </View>

        <View style={styles.gridContainer}>
          {pets.map((pet, index) => {
            const { background, icon } =
              pastelColorPairs[index % pastelColorPairs.length];

            return (
              <TouchableOpacity
                key={pet.id}
                style={[styles.card, { backgroundColor: background }]}
                onPress={() =>
                  navigation.navigate("PetDetailScreen", {
                    pet: {
                      id: pet.id,
                      name: pet.name,
                      image: pet.image,
                      age: pet.age,
                      weight: pet.weight,
                      gender: pet.gender,
                    },
                    backgroundColor: background,
                    iconColor: icon,
                  })
                }
              >
                <Image
                  source={pet.image}
                  resizeMode="cover"
                  style={styles.image}
                />
                <View style={styles.cardInfo}>
                  <TextMedium>{pet.name}</TextMedium>
                  <View style={styles.petDetailsContainer}>
                    <View style={styles.petDetail}>
                      <Text style={styles.petDetailText}>{pet.age}</Text>
                    </View>
                    <View style={styles.petDetail}>
                      <Text style={styles.petDetailText}>{pet.weight}</Text>
                    </View>
                    <View style={styles.petDetail}>
                      <Text style={styles.petDetailText}>{pet.gender}</Text>
                    </View>
                  </View>
                  <PetFootprintIcon
                    fill={icon}
                    width={100}
                    height={100}
                    style={styles.petFootprint}
                  />
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Card para añadir mascota */}
          <TouchableOpacity
            style={[
              styles.card,
              styles.addCard,
              { backgroundColor: theme.colors.cardBackground },
            ]}
            onPress={() => console.log("Añadir mascota")}
          >
            <PetFootprintIcon fill={theme.colors.text} width={70} height={70} />
            <PlusIcon
              fill={theme.colors.background}
              style={{
                position: "absolute",
              }}
            />
            <TextMedium>Añadir Mascota</TextMedium>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    borderRadius: 16,
    width: "48%",
    marginBottom: spacing.medium,
    padding: spacing.small,
    gap: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 16,
  },
  cardInfo: {
    gap: 4,
    paddingBottom: 14,
  },
  petName: {
    fontWeight: "700",
    fontSize: 16,
  },
  petAge: {
    fontSize: 14,
    backgroundColor: "white",
  },
  petDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 2,
  },

  petDetail: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignItems: "center",
  },

  petDetailText: {
    fontSize: 12,
    fontWeight: "500",
  },
  petFootprint: {
    position: "absolute",
    right: -20,
    zIndex: -1,
    transform: [{ rotate: "300deg" }],
    bottom: -10,
  },

  addCard: {
    justifyContent: "center",
    alignItems: "center",
    height: 244,
  },
  addText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
