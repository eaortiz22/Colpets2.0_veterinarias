import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import TextSmall from "./TextSmall";
import { useTheme } from "../context/ThemeContext";
import { UsersIcon } from "../../assets/icons";

type Vet = {
  id: string;
  name: string;
  gender?: string;
  image?: any | null;
};

type VetSelectorProps = {
  vets: Vet[];
  selectedVetId: string;
  onSelect: (id: string) => void;
};

const VetSelector: React.FC<VetSelectorProps> = ({
  vets,
  selectedVetId,
  onSelect,
}) => {
  const { theme } = useTheme();

  return (
    <ScrollView horizontal contentContainerStyle={{ gap: 12 }}>
      {vets.map((vet) => {
        const isSelected = selectedVetId === vet.id;
        const showDefaultImage = vet.image === null;

        return (
          <TouchableOpacity
            key={vet.id}
            onPress={() => onSelect(vet.id)}
            style={{ alignItems: "center", gap: 4 }}
          >
            <View
              style={{
                width: 56,
                height: 56,
                backgroundColor:
                  vet.id === "any"
                    ? theme.colors.tertiary
                    : theme.colors.cardBackground,
                borderRadius: 8,
                overflow: "hidden",
                borderWidth: isSelected ? 3 : 0,
                borderColor: isSelected ? theme.colors.primary : "transparent",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {showDefaultImage ? (
                <UsersIcon
                  width={24}
                  height={24}
                  fill={theme.colors.background}
                />
              ) : (
                <Image
                  source={
                    vet.image ||
                    (vet.gender === "male"
                      ? require("../../assets/images/vetManIA.png")
                      : require("../../assets/images/vetIA.png"))
                  }
                  resizeMode="contain"
                  style={{ width: 50, height: 50 }}
                />
              )}
            </View>

            <TextSmall
              style={{
                textAlign: "center",
                fontWeight: isSelected ? "700" : "400",
              }}
            >
              {vet.name}
            </TextSmall>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default VetSelector;
