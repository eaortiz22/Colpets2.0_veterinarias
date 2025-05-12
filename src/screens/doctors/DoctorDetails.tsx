import { View, Text } from "react-native";
import React from "react";
import EntityDetailWrapper from "../../components/common/EntityDetailWrapper";
import { useNavigation } from "@react-navigation/native";

export default function DoctorDetails({ route }: any) {
  const { doctor } = route.params;
  const navigation = useNavigation();

  console.log(doctor);

  return (
    <EntityDetailWrapper
      image={
        doctor.image
          ? doctor.image
          : doctor.gender === "male"
          ? require("../../../assets/images/vetManIA.png")
          : require("../../../assets/images/vetIA.png")
      }
      buttonLabel="Atrás"
      isScrollEnabled
      onButtonPress={() => navigation.goBack()}
      rating={doctor.rating}
    ></EntityDetailWrapper>
  );
}
