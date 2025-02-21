import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TextMedium from "../components/TextMedium";
import TextSmall from "../components/TextSmall";
import { spacing } from "../styles/theme";
import { BellIcon, MapMarkerIcon, SearchIcon } from "../../assets/icons";
import SafeContainer from "../components/SafeContainer ";
import IconButton from "../components/IconButton";
import CircularIconButton from "../components/CircularIconButton";

export default function Home() {
  const { theme, isDarkTheme } = useTheme();

  return (
    <SafeContainer>
      <View style={{ padding: spacing.medium }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 4,
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={{ flexDirection: "row", gap: 8 }}>
            <CircularIconButton
              icon={<MapMarkerIcon fill="#555" />}
              onPress={() => console.log("Ubi presionado")}
            />
            <View>
              <TextMedium>Bogotá, Edificio cataly</TextMedium>
              <TextSmall>Colombia</TextSmall>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <CircularIconButton
              icon={<SearchIcon fill="#555" />}
              onPress={() => console.log("Buscar presionado")}
            />
            <CircularIconButton
              icon={<BellIcon fill="#555" />}
              onPress={() => console.log("Notification presionado")}
            />
          </View>
        </View>
      </View>
    </SafeContainer>
  );
}
export const styles = StyleSheet.create({});
