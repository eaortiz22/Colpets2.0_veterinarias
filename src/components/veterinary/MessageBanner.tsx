import React from "react";
import { View, Text } from "react-native";

export default function MessageBanner({ message }: any) {
  if (!message) return null;
  return (
    <View
      style={{
        position: "absolute",
        top: 10,
        alignSelf: "center",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        elevation: 3,
      }}
    >
      <Text style={{ fontWeight: "bold" }}>{message}</Text>
    </View>
  );
}
