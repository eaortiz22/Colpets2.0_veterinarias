import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";

type Props = {
  pet: {
    _id: string;
    name: string;
    image: string;
  };
  selected: boolean;
  onSelect: () => void;
};

const PetCard = ({ pet, selected, onSelect }: Props) => (
  <TouchableOpacity onPress={onSelect} style={[styles.petCard, selected && styles.selected]}>
    <Image source={{ uri: pet.image }} style={styles.petImage} />
    <Text style={styles.petName}>{pet.name}</Text>
  </TouchableOpacity>
);

export default PetCard;

const styles = StyleSheet.create({
  petCard: {
    width: 100,
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    margin: 6,
    elevation: 2, // sombra en Android
    shadowColor: "#000", // sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  selected: {
    borderWidth: 2,
    borderColor: "#F44336",
  },
  petImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
    backgroundColor: "#eee",
  },
  petName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});
