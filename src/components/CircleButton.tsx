import { View, TouchableOpacity, TextStyle } from "react-native";
import React from "react";
import { spacing } from "../styles/theme";

interface CircleButtonProps {
  style?: TextStyle;
  onPress: () => void;
  Icon: React.ElementType;
}

export default function CircleButton({
  style,
  onPress,
  Icon,
}: CircleButtonProps) {
  return (
    <View style={style}>
      <TouchableOpacity
        style={{
          padding: spacing.small,
          backgroundColor: "#fb8ecf",
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={onPress}
      >
        <Icon fill="white" width={40} height={40} />
      </TouchableOpacity>
    </View>
  );
}
