import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import TextTitle from "../../components/TextTitle";
import TextSmall from "../../components/TextSmall";
import TextMedium from "../../components/TextMedium";
import { HeartIcon, MapMarkerIcon, UsersIcon } from "../../../assets/icons";
import { useTheme } from "../../context/ThemeContext";
import EntityDetailWrapper from "../../components/common/EntityDetailWrapper";
import HorizontalStatsCard from "../../components/common/HorizontalStatsCard";
import { formatReviews } from "../../utils/formatUtils";
import SectionHeader from "../../components/SectionHeader";
import CategoryList from "../../components/marketplace/CategoryList";
import VetCard from "../../components/VetCard";
import { ScrollView } from "react-native";
import AppointmentForm from "./AppointmentForm";

const VeterinaryDetails = ({ route }: any) => {
  const { veterinary, distanceInfo } = route.params;
  const { theme } = useTheme();
  const [selectedVetId, setSelectedVetId] = useState("any");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const vetsWithDefault = [{ id: "any", name: "Cualquiera", image: null }, ...veterinary?.veterinarians];

  const selectedVet =
    selectedVetId === "any"
      ? null
      : veterinary.veterinarians.find((vet: any) => String(vet.id) === String(selectedVetId));

  const selectedDateStr = selectedDate.toISOString().split("T")[0];

  const sortByHour = (hours: string[]) => {
    return hours.slice().sort((a, b) => {
      const to24H = (time: string) => {
        const [hourMin, meridiem] = time.split(" ");
        let [hour, min] = hourMin.split(":").map(Number);
        if (meridiem === "PM" && hour !== 12) hour += 12;
        if (meridiem === "AM" && hour === 12) hour = 0;
        return hour * 60 + min;
      };
      return to24H(a) - to24H(b);
    });
  };

  const toMinutes = (time: string) => {
    const [hourMin, meridiem] = time.split(" ");
    let [hour, min] = hourMin.split(":").map(Number);

    if (meridiem === "PM" && hour !== 12) hour += 12;
    if (meridiem === "AM" && hour === 12) hour = 0;

    const totalMinutes = hour * 60 + min;
    return totalMinutes;
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const now = new Date();

  now.setHours(now.getHours());
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const filterFutureHours = (hours: string[]) => {
    return hours.filter((hour) => {
      const minutes = toMinutes(hour);

      if (!isToday) return true;

      return minutes > currentMinutes;
    });
  };

  const availableHours =
    selectedVetId === "any"
      ? sortByHour(
          filterFutureHours(
            [
              ...new Set(veterinary.veterinarians.flatMap((vet: any) => vet.availability?.[selectedDateStr] || [])),
            ].filter(Boolean) as string[]
          )
        )
      : sortByHour(filterFutureHours(selectedVet?.availability?.[selectedDateStr] || []));

  return (
    <EntityDetailWrapper
      image={veterinary.image}
      modalContent={
        showAppointmentModal && (
          <AppointmentForm
            vetsWithDefault={vetsWithDefault}
            selectedVetId={selectedVetId}
            setSelectedVetId={setSelectedVetId}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            availableHours={availableHours}
            selectedHour={selectedHour}
            setSelectedHour={setSelectedHour}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            veterinary={veterinary}
            onConfirm={() => setShowAppointmentModal(false)}
          />
        )
      }
      rating={veterinary.rating}
      onButtonPress={() => setShowAppointmentModal(true)}
      isScrollEnabled={!showAppointmentModal}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextTitle style={{ flexShrink: 1 }} numberOfLines={1}>
          {veterinary.name}
        </TextTitle>
        <TouchableOpacity>
          <HeartIcon width={24} height={24} fill={theme.colors.text} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
        <MapMarkerIcon width={24} height={24} fill={theme.colors.primary} />
        <TextMedium style={{ color: theme.colors.text }}>
          {veterinary.neighborhood}, {veterinary.city} {" • "}
          {distanceInfo?.duration}
        </TextMedium>
      </View>
      <HorizontalStatsCard
        data={[
          { label: "Opiniones", value: formatReviews(veterinary.reviews) },
          {
            label: "Pacientes",
            value: formatReviews(veterinary.patientsCount),
          },
          { label: "Años exp", value: veterinary.yearsExperience },
        ]}
      />

      {/* Puedes agregar más información aquí dentro */}
      <View style={{ gap: 8 }}>
        <TextMedium>Descripción</TextMedium>
        <TextSmall>{veterinary.description}</TextSmall>
      </View>

      <View style={{ gap: 8 }}>
        <SectionHeader
          title="Servicios"
          onViewAll={() => console.log("Ver todos los servicios")}
          titleStyle={{ fontSize: 18, fontWeight: "500" }}
        />
        <CategoryList
          categories={veterinary?.services.map(({ id, name }: any) => ({
            id,
            name,
          }))}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 4 }}
      >
        {veterinary?.veterinarians?.map((vet: any) => (
          <VetCard
            key={vet.id}
            name={vet.name}
            last_name={vet.last_name}
            role={vet.specialty}
            rating={vet.rating}
            onLike={() => console.log("like")}
            image={vet.image}
            gender={vet.gender}
          />
        ))}
      </ScrollView>
    </EntityDetailWrapper>
  );
};

export default VeterinaryDetails;
