import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { fontSizes, spacing } from "../../styles/theme";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label?: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
}

const Select: React.FC<CustomSelectProps> = ({
  label,
  selectedValue,
  onValueChange,
  options,
  placeholder = "Selecciona una opción",
}) => {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || "";

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.secondary }]}>
          {label}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[
          styles.selectBox,
          {
            backgroundColor: theme.colors.inputBg,
            borderColor: theme.colors.text,
          },
        ]}
      >
        <Text
          style={{
            color: selectedLabel ? theme.colors.text : theme.colors.placeholder,
            fontSize: fontSizes.small,
          }}
        >
          {selectedLabel || placeholder}
        </Text>
        {/* <ChevronDown size={16} color={theme.colors.text} /> */}
      </TouchableOpacity>

      <Modal transparent visible={modalVisible} animationType="fade">
        <TouchableOpacity
          style={styles.modalBackdrop}
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
        >
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.colors.cardBackground },
            ]}
          >
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={{ color: theme.colors.text }}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: spacing.medium,
  },
  label: {
    fontSize: fontSizes.small,
    marginBottom: spacing.small,
    fontWeight: "400",
  },
  selectBox: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: spacing.small,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
  },
  modalContent: {
    borderRadius: 12,
    padding: spacing.medium,
    maxHeight: 300,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
});

export default Select;
