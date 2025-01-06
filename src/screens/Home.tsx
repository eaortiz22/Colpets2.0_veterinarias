import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TextMedium from "../components/TextMedium";
import TextSmall from "../components/TextSmall";
import { spacing } from "../styles/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Home() {
  const { theme } = useTheme();

  return (
    <SafeAreaProvider style={[{ backgroundColor: theme.colors.background }]}>
      <SafeAreaView style={[styles.container]}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 16,
                alignItems: "center",
              }}
            >
              <View style={styles.image}>
                <Image
                  source={require("../../assets/images/imageProfile.jpg")}
                  resizeMode="cover"
                  style={styles.image}
                />
              </View>
              <View style={{ gap: 10 }}>
                <TextMedium>Gato Perez</TextMedium>
                <TextSmall>Gato Siamés</TextSmall>
              </View>
            </View>

            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderRadius: 50,
                height: 60,
                width: 60,
                borderColor: theme.colors.text,
              }}
            >
              <MaterialCommunityIcons
                name="bell-outline"
                size={24}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
export const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    gap: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    maxWidth: 60,
    maxHeight: 60,
    borderRadius: 50,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.medium,
  },
});
