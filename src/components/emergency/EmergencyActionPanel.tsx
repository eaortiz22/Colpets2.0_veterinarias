import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { AmbulanceIcon, CarIcon, HomeIcon, LocationArrowtIcon, MapMarkerIcon, XIcon } from "../../../assets/icons";
import PetCard from "./PetCard";
import SafeContainer from "../SafeContainer";
import { spacing } from "../../styles/theme";
import { useTheme } from "../../context/ThemeContext";
import Input from "../ui/Input";
import TextMedium from "../TextMedium";
import { useLocation } from "../../context/LocationContext";
import SelectableButton from "./SelectableButton";
import { isNonEmpty } from "../../utils/validators";

type Props = {
  onClose: () => void;
  onActivate: (mode: "ambulance" | "clinic", petId: string) => void;
  pets: any[];
};

const HOME_LOCATION = {
  latitude: 4.710989,
  longitude: -74.07209,
};

const EmergencyActionPanel = ({ onClose, onActivate, pets }: Props) => {
  const { theme } = useTheme();
  const { location, errorMsg, isLoading } = useLocation();

  const [selectedPetId, setSelectedPetId] = React.useState(pets[0]?._id);
  const [selectedMode, setSelectedMode] = React.useState(null);
  const [useCurrentLocation, setUseCurrentLocation] = React.useState("");
  const [caseDescription, setCaseDescription] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");

  const selectedLocation = useCurrentLocation ? location : HOME_LOCATION;

  const handleDescriptionChange = (value: string) => {
    setCaseDescription(value);
    if (!isNonEmpty(value)) {
      setDescriptionError("La descripción es obligatoria.");
    } else {
      setDescriptionError("");
    }
  };

  const handleActivate = (mode: any) => {
    if (isLoading) return;
    if (errorMsg) {
      console.warn("No se pudo obtener la ubicación:", errorMsg);
      return;
    }

    setSelectedMode(mode);
  };

  const handleConfirm = () => {
    if (!isNonEmpty(caseDescription)) {
      setDescriptionError("La descripción es obligatoria.");
      return;
    }

    console.log("Mascota seleccionada:", selectedPetId);
    console.log("Modo seleccionado:", selectedMode);
    console.log("Ubicación seleccionada:", selectedLocation);
    console.log("Descripción del caso:", caseDescription);
  };

  const isFormValid = selectedPetId && selectedMode && useCurrentLocation && isNonEmpty(caseDescription);

  return (
    <SafeContainer backgroundColor={theme.colors.error} padding={spacing.medium}>
      <View style={styles.buttoncontainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <XIcon fill="#fff" width={16} height={16} />
        </TouchableOpacity>
      </View>

      <TextMedium style={styles.title}>¿Qué mascota necesita ayuda?</TextMedium>

      <View style={styles.petList}>
        {pets.map((pet: any) => (
          <PetCard
            key={pet._id}
            pet={pet}
            selected={pet._id === selectedPetId}
            onSelect={() => setSelectedPetId(pet._id)}
          />
        ))}
      </View>

      <TextMedium style={styles.subtitle}>¿Cómo quieres actuar?</TextMedium>

      <View style={styles.row}>
        <SelectableButton
          icon={<AmbulanceIcon fill={selectedMode === "direction" ? "#F44336" : "#B71C1C"} />}
          text="¡Vengan donde estoy!"
          selected={selectedMode === "direction"}
          onPress={() => handleActivate("direction")}
        />
        <SelectableButton
          icon={<CarIcon fill={selectedMode === "ambulance" ? "#F44336" : "#B71C1C"} />}
          text="Puedo llevarlo"
          selected={selectedMode === "ambulance"}
          onPress={() => handleActivate("ambulance")}
        />
      </View>

      <Input
        label="Descripción del caso"
        placeholder="Ej: Mi gato está sangrando por la boca"
        emergency
        multiline
        numberOfLines={4}
        value={caseDescription}
        onChangeText={handleDescriptionChange}
        errorMessage={descriptionError}
      />

      <TextMedium style={styles.title}>Elige ubicación para tu ermegencia</TextMedium>

      {isLoading ? (
        <ActivityIndicator color={"#fff"} />
      ) : (
        <View style={styles.row}>
          <SelectableButton
            icon={<MapMarkerIcon fill={useCurrentLocation === "location" ? "#F44336" : "#B71C1C"} />}
            text="Ubicación actual"
            selected={useCurrentLocation === "location"}
            onPress={() => setUseCurrentLocation("location")}
          />
          <SelectableButton
            icon={<LocationArrowtIcon fill={useCurrentLocation === "direction" ? "#F44336" : "#B71C1C"} />}
            text="Ubicación de casa"
            selected={useCurrentLocation === "direction"}
            onPress={() => setUseCurrentLocation("direction")}
          />
        </View>
      )}
      <TouchableOpacity
        style={[styles.fixedButton, !isFormValid && styles.disabledButton]}
        onPress={isFormValid ? handleConfirm : undefined}
        disabled={!isFormValid}
      >
        <Text style={[styles.fixedButtonText, !isFormValid && styles.disabledButtonText]}>Confirmar emergencia</Text>
      </TouchableOpacity>
    </SafeContainer>
  );
};

export default EmergencyActionPanel;

const styles = StyleSheet.create({
  buttoncontainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  closeButton: {
    top: 16,
    right: 0,
    backgroundColor: "#00000050",
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
    width: 32,
    justifyContent: "flex-end",
    display: "flex",
  },
  title: {
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  petList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginVertical: 12,
  },
  fixedButton: {
    position: "absolute",
    bottom: 24,
    left: 24,
    right: 24,
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  fixedButtonText: {
    color: "#B71C1C",
    fontWeight: "bold",
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: "#ffffff80",
  },
  disabledButtonText: {
    color: "#B71C1C80",
  },
});
