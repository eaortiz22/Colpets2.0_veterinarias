import React from "react";
import { TouchableOpacity } from "react-native";
import { LocationArrowtIcon } from "../../../assets/icons";
import { useTheme } from "../../context/ThemeContext";

const CenterButton = ({ mapRef, location }: any) => {
  const { theme } = useTheme();

  const centerOnUser = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  };

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: theme.colors.background,
        padding: 10,
        borderRadius: 50,
      }}
      onPress={centerOnUser}
    >
      <LocationArrowtIcon fill={theme.colors.primary} />
    </TouchableOpacity>
  );
};

export default CenterButton;
