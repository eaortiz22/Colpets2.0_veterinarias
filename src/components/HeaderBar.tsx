import { View, TouchableOpacity } from "react-native";
import CircularIconButton from "./CircularIconButton";
import TextMedium from "./TextMedium";
import TextSmall from "./TextSmall";
import { BellIcon, MapMarkerIcon, SearchIcon } from "../../assets/icons";

const HeaderBar = ({
  location = "Bogotá, Edificio Cataly",
  country = "Colombia",
  onLocationPress = () => console.log("Ubi presionado"),
  onSearchPress = () => console.log("Buscar presionado"),
  onNotificationPress = () => console.log("Notification presionado"),
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 4,
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", gap: 8 }}
        onPress={onLocationPress}
      >
        <CircularIconButton icon={<MapMarkerIcon fill="#555" />} />
        <View>
          <TextMedium>{location}</TextMedium>
          <TextSmall>{country}</TextSmall>
        </View>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <CircularIconButton
          icon={<SearchIcon fill="#555" />}
          onPress={onSearchPress}
        />
        <CircularIconButton
          icon={<BellIcon fill="#555" />}
          onPress={onNotificationPress}
        />
      </View>
    </View>
  );
};

export default HeaderBar;
