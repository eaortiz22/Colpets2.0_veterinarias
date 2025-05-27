import { View, TouchableOpacity, ViewStyle } from "react-native";
import CircularIconButton from "./CircularIconButton";
import TextMedium from "./TextMedium";
import TextSmall from "./TextSmall";
import { BellIcon, MapMarkerIcon, SearchIcon, AngleIcon, XIcon } from "../../assets/icons";
import { useTheme } from "../context/ThemeContext";
import React, { JSX } from "react";
import { Animated, TextInput, Easing } from "react-native";
import { useRef, useState } from "react";
import Input from "./ui/Input";

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

  const [showSearch, setShowSearch] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const toggleSearch = () => {
    if (showSearch) {
      // Animación de cierre
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }).start(() => {
        setShowSearch(false); // Oculta solo después de animar
      });
    } else {
      setShowSearch(true); // Muestra primero
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }).start();
    }
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
  });

  const opacity = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={[{ flex: 1 }, containerStyle]}>
      {showSearch ? (
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            opacity,
            transform: [{ translateY }],
            paddingHorizontal: 16,
            width: "100%",
          }}
        >
          <Input placeholder="Buscar..." />
          <TouchableOpacity onPress={toggleSearch}>
            <XIcon width={24} height={24} fill={theme.colors.text} />
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
            flex: 1,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", flex: 1, gap: 8 }}
            onPress={onLocationPress}
          >
            <CircularIconButton icon={<MapMarkerIcon fill={theme.colors.text} />} />
            <View style={{ flexShrink: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", flexShrink: 1 }}>
                  <TextMedium numberOfLines={1} ellipsizeMode="tail" style={{ flexShrink: 1 }}>
                    {location}
                  </TextMedium>
                  <View style={{ alignSelf: "center", transform: [{ rotate: "90deg" }] }}>
                    <AngleIcon fill={theme.colors.text} height={24} width={24} />
                  </View>
                </View>
                <TextSmall numberOfLines={1} ellipsizeMode="tail">
                  {country}
                </TextSmall>
              </View>
            </View>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", gap: 8 }}>
            <CircularIconButton icon={<SearchIcon fill={theme.colors.text} />} onPress={toggleSearch} />
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
      )}
    </View>
  );
};

export default HeaderBar;
