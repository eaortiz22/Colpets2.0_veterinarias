import React from "react";
import { View } from "react-native";
import HealthReminderCard from "./HealthReminderCard";
import TextTitle from "../TextTitle";

interface PetCareSectionProps {
  reminders: any[];
}

const PetCareSection: React.FC<PetCareSectionProps> = ({ reminders }) => {
  return (
    <View style={{ gap: 8 }}>
      <TextTitle>Cuida a tu mascota hoy</TextTitle>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <HealthReminderCard reminders={reminders} />
      </View>
    </View>
  );
};

export default PetCareSection;
