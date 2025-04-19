import { View, TouchableOpacity, TextStyle } from "react-native";
import React from "react";
import { spacing } from "../styles/theme";
import { AngleIcon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";

interface ArrowBackProps {
  style?: TextStyle;
}

export default function ArrowBack({ style }: ArrowBackProps) {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <View style={[{ position: "absolute", left: 16, top: 0 }, style]}>
      <TouchableOpacity
        style={{
          padding: spacing.small,
          backgroundColor: theme.colors.primary,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.goBack()}
      >
        <AngleIcon
          fill={"white"}
          width={40}
          height={40}
          style={{ transform: [{ rotate: "180deg" }] }}
        />
      </TouchableOpacity>
    </View>
  );
}
