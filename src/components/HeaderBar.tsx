import { View, TouchableOpacity, ViewStyle } from "react-native";
import CircularIconButton from "./CircularIconButton";
import TextMedium from "./TextMedium";
import TextSmall from "./TextSmall";
import {
  BellIcon,
  MapMarkerIcon,
  SearchIcon,
  AngleIcon,
} from "../../assets/icons";
import { useTheme } from "../context/ThemeContext";
import React from "react";

interface HeaderBarProps {
  location?: string;
  country?: string;
  onLocationPress?: () => void;
  onSearchPress?: () => void;
  onRightPress?: () => void;
  rightIcon?: JSX.Element;
  containerStyle?: ViewStyle;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  location = "Bogotá, Edificio Cataly",
  country = "Colombia",
  onLocationPress = () => console.log("Ubicación presionada"),
  onSearchPress = () => console.log("Buscar presionado"),
  onRightPress = () => console.log("Right presionado"),
  rightIcon = <BellIcon />,
  containerStyle = {},
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 4,
          flex: 1,
        },
        containerStyle,
      ]}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", flex: 1, gap: 8 }}
        onPress={onLocationPress}
      >
        <CircularIconButton icon={<MapMarkerIcon fill={theme.colors.text} />} />
        <View style={{ flexShrink: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", flexShrink: 1 }}>
              <TextMedium
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ flexShrink: 1 }}
              >
                {location}
              </TextMedium>
              <View style={{ alignSelf: "center" }}>
                <AngleIcon
                  fill={theme.colors.text}
                  height={24}
                  width={24}
                  style={{ transform: [{ rotate: "90deg" }] }}
                />
              </View>
            </View>
            <TextSmall numberOfLines={1} ellipsizeMode="tail">
              {country}
            </TextSmall>
          </View>
        </View>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", gap: 8 }}>
        <CircularIconButton
          icon={<SearchIcon fill={theme.colors.text} />}
          onPress={onSearchPress}
        />
        <CircularIconButton
          icon={
            rightIcon &&
            React.cloneElement(rightIcon, {
              fill: theme.colors.text,
            })
          }
          onPress={onRightPress}
        />
      </View>
    </View>
  );
};

export default HeaderBar;
