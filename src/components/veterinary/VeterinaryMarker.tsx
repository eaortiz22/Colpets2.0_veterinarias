import React from "react";
import { Image } from "react-native";
import { Marker } from "react-native-maps";

const VeterinaryMarker = ({
  vet,
  onPress,
}: {
  vet: any;
  onPress: (vet: any) => void;
}) => {
  return (
    <Marker
      coordinate={{ latitude: vet.latitude, longitude: vet.longitude }}
      onPress={() => onPress(vet)}
    >
      <Image
        source={require("../../../assets/iconsPng/mapMarkerVeterinary.png")}
        style={{ width: 32, height: 32 }}
        resizeMode="contain"
      />
    </Marker>
  );
};

export default VeterinaryMarker;
