import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import EntityDetailWrapper from "../../components/common/EntityDetailWrapper";
import { useNavigation } from "@react-navigation/native";
import TextTitle from "../../components/TextTitle";
import HorizontalStatsCard from "../../components/common/HorizontalStatsCard";
import { formatReviews } from "../../utils/formatUtils";
import { AwardAltIcon, GraduationCapIcon, HeartIcon, VerifiedIcon } from "../../../assets/icons";
import { useTheme } from "../../context/ThemeContext";
import TextMedium from "../../components/TextMedium";
import TextSmall from "../../components/TextSmall";
import { EducationTimeline } from "../../components/doctors/EducationTimeline";
import { spacing } from "../../styles/theme";
import Tabs from "../../components/common/Tabs";

export default function DoctorDetails({ route }: any) {
  const { doctor } = route.params;
  const navigation = useNavigation();
  const { theme, isDarkTheme } = useTheme();

  const [selectedTab, setSelectedTab] = useState<"education" | "certificates">("education");

  const tabs = [
    {
      key: "education",
      label: "Educación",
      Icon: GraduationCapIcon,
    },
    {
      key: "certificates",
      label: "Certificados",
      Icon: AwardAltIcon,
    },
  ];

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
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <TextTitle style={{ flexShrink: 1 }} numberOfLines={1}>
            {`${doctor?.name} ${doctor?.last_name}`}
          </TextTitle>
          {doctor.verified && <VerifiedIcon fill={theme.colors.primary} />}
        </View>
        <TouchableOpacity>
          <HeartIcon width={24} height={24} fill={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <TextSmall style={{ fontWeight: 400 }}>
        {doctor?.specialty} - {doctor?.education?.[1]?.title} ({doctor?.education?.[1]?.university})
      </TextSmall>

      <HorizontalStatsCard
        data={[
          { label: "Opiniones", value: formatReviews(doctor?.reviews) },
          { label: "Pacientes", value: formatReviews(doctor?.patientsCount) },
          { label: "Años exp", value: doctor?.yearsExperience },
        ]}
      />

      <View style={{ gap: 4 }}>
        <TextMedium>Biografía</TextMedium>
        <TextSmall>{doctor?.description}</TextSmall>
      </View>

      {/* Tabs */}
      <View
        style={{ backgroundColor: theme.colors.cardBackground, padding: spacing.medium, borderRadius: 16, gap: 16 }}
      >
        <Tabs tabs={tabs} selectedKey={selectedTab} onTabPress={(key) => setSelectedTab(key as typeof selectedTab)} />

        {/* Tab content */}
        {selectedTab === "education" ? (
          <EducationTimeline education={doctor?.education} />
        ) : (
          <EducationTimeline education={doctor?.certificates} />
        )}
      </View>
    </EntityDetailWrapper>
  );
}
