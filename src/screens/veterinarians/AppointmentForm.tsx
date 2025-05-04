import React, { useEffect, useState } from "react";
import { View } from "react-native";
import TextTitle from "../../components/TextTitle";
import TextMedium from "../../components/TextMedium";
import VetSelector from "../../components/VetSelector";
import { useTheme } from "../../context/ThemeContext";
import CustomCalendar from "../../components/ui/CustomCalendar";
import { spacing } from "../../styles/theme";
import CustomCheckboxSelect from "../../components/ui/CustomCheckboxSelect";
import Button from "../../components/ui/Button";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import TextSmall from "../../components/TextSmall";

interface AppointmentFormProps {
  vetsWithDefault: any[];
  selectedVetId: string | null;
  setSelectedVetId: (id: string) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  availableHours: string[];
  selectedHour: string | null;
  setSelectedHour: (hour: string) => void;
  selectedType: string[];
  setSelectedType: (types: string[]) => void;
  veterinary: {
    services?: { id: string; name: string; price: number }[];
  } | null;
  onConfirm?: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  vetsWithDefault,
  selectedVetId,
  setSelectedVetId,
  selectedDate,
  setSelectedDate,
  availableHours,
  selectedHour,
  setSelectedHour,
  selectedType,
  setSelectedType,
  veterinary,
  onConfirm,
}) => {
  const { theme } = useTheme();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (!availableHours.includes(selectedHour || "")) {
      setSelectedHour("");
    }
  }, [selectedVetId, availableHours]);

  const vetName = vetsWithDefault.find((v) => v.id === selectedVetId)?.name || "";
  const servicesList = selectedType
    .map((id) => veterinary?.services?.find((s) => s.id === id)?.name)
    .filter(Boolean)
    .join(", ");
  const day = selectedDate.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
  });
  const hour = selectedHour;

  const handleConfirm = () => {
    if (isConfirmed) {
      if (onConfirm) onConfirm();
      setModalVisible(false);
      setIsConfirmed(false);
    } else {
      setIsConfirmed(true);
    }
  };

  const isFormValid = !!selectedVetId && !!selectedDate && !!selectedHour && selectedType.length > 0;

  return (
    <View style={{ gap: 12 }}>
      <TextTitle style={{ textAlign: "center" }}>Reservar Cita</TextTitle>

      <View style={{ gap: 12 }}>
        <TextMedium style={{ fontWeight: "500" }}>1. Selecciona un veterinario</TextMedium>
        <VetSelector vets={vetsWithDefault} selectedVetId={selectedVetId || ""} onSelect={setSelectedVetId} />

        <View style={{ gap: 12 }}>
          <TextMedium style={{ fontWeight: "500" }}>2. Selecciona fecha y hora</TextMedium>
          <View
            style={{
              backgroundColor: theme.colors.cardBackground,
              padding: spacing.medium,
              borderRadius: 16,
            }}
          >
            <CustomCalendar
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              availableHours={availableHours}
              selectedHour={selectedHour}
              onHourSelect={setSelectedHour}
              maxMonthAdvance={1}
              allowPastNavigation={false}
              limitToToday={true}
            />
          </View>
        </View>

        <CustomCheckboxSelect
          label="3. Tipo de servicio"
          selectedValues={selectedType}
          onChange={setSelectedType}
          showPrice
          options={
            veterinary?.services?.map((s: any) => ({
              id: s.id,
              label: s.name,
              price: s.price,
            })) || []
          }
        />

        <Button
          title="Finalizar reserva"
          onPress={() => setModalVisible(true)}
          type={!isFormValid ? "disabled" : "primary"}
          disabled={!isFormValid}
        />

        {isModalVisible && (
          <ConfirmationModal
            visible={isModalVisible}
            onClose={() => {
              if (isConfirmed) {
                if (onConfirm) onConfirm();
                setModalVisible(false);
                setIsConfirmed(false);
              } else {
                setModalVisible(false);
              }
            }}
            onConfirm={handleConfirm}
            image={
              isConfirmed
                ? require("../../../assets/iconsPng/check.png")
                : require("../../../assets/iconsPng/confirm.png")
            }
            title={isConfirmed ? "¡Cita reservada con éxito!" : "Creando reserva..."}
            subtitle={
              isConfirmed
                ? "Tu cita ha sido reservada. Te recomendamos llegar 20 minutos antes."
                : "¿Estás seguro de tu reserva?"
            }
            confirmText={isConfirmed ? undefined : "Sí, reservar"}
            cancelText={isConfirmed ? "Salir" : "Cancelar"}
          >
            {!isConfirmed && (
              <TextSmall style={{ textAlign: "center" }}>
                Su cita será asignada a {vetName} para {servicesList} el día {day} a las {hour}
              </TextSmall>
            )}
          </ConfirmationModal>
        )}
      </View>
    </View>
  );
};

export default AppointmentForm;
