import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface Option {
  id: string;
  label: string;
  price?: number;
}

interface Props {
  label?: string;
  options: Option[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  showPrice?: boolean;
  placeholder?: string;
}

const CustomCheckboxSelect = ({
  label,
  options,
  selectedValues,
  onChange,
  showPrice = false,
  placeholder = "Selecciona una opción",
}: Props) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  const toggleValue = (id: string) => {
    const isSelected = selectedValues.includes(id);
    const updated = isSelected
      ? selectedValues.filter((val) => val !== id)
      : [...selectedValues, id];
    onChange(updated);
  };

  const selectedLabels = options
    .filter((opt) => selectedValues.includes(opt.id))
    .map((opt) => opt.label)
    .join(", ");

  return (
    <View style={{ gap: 8 }}>
      {label && (
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
            color: theme.colors.text,
          }}
        >
          {label}
        </Text>
      )}

      {/* SELECT BUTTON */}
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={{
          borderWidth: 1,
          borderColor: theme.colors.primary,
          borderRadius: 12,
          padding: 12,
          backgroundColor: theme.colors.cardBackground,
        }}
      >
        <Text style={{ color: theme.colors.text }}>
          {selectedLabels || placeholder}
        </Text>
      </TouchableOpacity>

      {/* DROPDOWN */}
      {open &&
        options.map((opt) => {
          const isChecked = selectedValues.includes(opt.id);
          return (
            <TouchableOpacity
              key={opt.id}
              onPress={() => toggleValue(opt.id)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: theme.colors.cardBackground,
                borderRadius: 12,
                padding: 12,
                gap: 12,
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: theme.colors.primary,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isChecked
                    ? theme.colors.primary
                    : "transparent",
                }}
              >
                {isChecked && (
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: "#fff",
                      borderRadius: 2,
                    }}
                  />
                )}
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, color: theme.colors.text }}>
                  {opt.label}
                </Text>
                {showPrice && opt.price !== undefined && (
                  <Text style={{ fontSize: 12, color: theme.colors.text }}>
                    ${opt.price.toLocaleString()}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

export default CustomCheckboxSelect;
