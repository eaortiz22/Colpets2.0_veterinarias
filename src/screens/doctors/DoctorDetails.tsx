import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import EntityDetailWrapper from "../../components/common/EntityDetailWrapper";
import { useNavigation } from "@react-navigation/native";
import TextTitle from "../../components/TextTitle";
import HorizontalStatsCard from "../../components/common/HorizontalStatsCard";
import { formatReviews } from "../../utils/formatUtils";
import { HeartIcon } from "../../../assets/icons";
import { useTheme } from "../../context/ThemeContext";
import TextMedium from "../../components/TextMedium";
import TextSmall from "../../components/TextSmall";
import { EducationTimeline } from "../../components/doctors/EducationTimeline";

export default function DoctorDetails({ route }: any) {
  const { doctor } = route.params;
  const navigation = useNavigation();
  const { theme } = useTheme();

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
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextTitle style={{ flexShrink: 1 }} numberOfLines={1}>
          {`${doctor?.name} ${doctor?.last_name}`}
        </TextTitle>
        <TouchableOpacity>
          <HeartIcon width={24} height={24} fill={theme.colors.text} />
        </TouchableOpacity>
      </View>
      <TextMedium style={{ fontWeight: 400 }}>
        {doctor?.specialty} - {doctor?.education?.[1]?.title} ({doctor?.education?.[1]?.university})
      </TextMedium>
      <HorizontalStatsCard
        data={[
          { label: "Opiniones", value: formatReviews(doctor?.reviews) },
          {
            label: "Pacientes",
            value: formatReviews(doctor?.patientsCount),
          },
          { label: "Años exp", value: doctor?.yearsExperience },
        ]}
      />
      <View style={{ gap: 4 }}>
        <TextMedium>Biografía</TextMedium>
        <TextSmall>{doctor?.description}</TextSmall>
      </View>
      <View>
        <TextMedium>Educación</TextMedium>
        <EducationTimeline education={doctor?.education} />
      </View>
    </EntityDetailWrapper>
  );
}
