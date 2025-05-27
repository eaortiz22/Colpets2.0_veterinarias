import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";

type Props = {
  icon: React.ReactNode;
  text: string;
  selected: boolean;
  onPress: () => void;
  style?: ViewStyle;
};

const SelectableButton = ({ icon, text, selected, onPress, style }: Props) => {
  return (
    <TouchableOpacity style={[styles.base, selected ? styles.selected : styles.unselected, style]} onPress={onPress}>
      {icon}
      <Text style={selected ? styles.textSelected : styles.textUnselected}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SelectableButton;

const styles = StyleSheet.create({
  base: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  selected: {
    backgroundColor: "#fff",
  },
  unselected: {
    backgroundColor: "#FFCDD2",
  },
  textSelected: {
    color: "#F44336",
  },
  textUnselected: {
    color: "#B71C1C",
  },
});
