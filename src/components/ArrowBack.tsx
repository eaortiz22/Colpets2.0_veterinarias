import { View, TouchableOpacity, TextStyle } from "react-native";
import React from "react";
import { spacing } from "../styles/theme";
import { AngleIcon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";

interface ArrowBackProps {
  style?: TextStyle;
  bgColor?: string;
}

export default function ArrowBack({
  style,
  bgColor = "#fb8ecf",
}: ArrowBackProps) {
  const navigation = useNavigation();

  return (
    <View style={[{ position: "absolute", left: 16, top: 0 }, style]}>
      <TouchableOpacity
        style={{
          padding: spacing.small,
          backgroundColor: bgColor,
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
