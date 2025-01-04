import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { spacing, fontSizes } from "../styles/theme";
import { MaterialIcons } from "@expo/vector-icons"; // Asegúrate de importar los íconos correctamente

interface InputProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  errorMessage,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry: initialSecureTextEntry = false,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const [isSecure, setIsSecure] = useState(initialSecureTextEntry); // Mantén el estado del secureTextEntry

  const handleRightIconPress = () => {
    setIsSecure(!isSecure); // Cambia el estado de secureTextEntry
    if (onRightIconPress) onRightIconPress(); // Llama la función si se pasó
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.text }]}>
          {label}
        </Text>
      )}
      <View
        style={[styles.inputWrapper, { backgroundColor: theme.colors.inputBg }]}
      >
        {leftIcon && (
          <View style={styles.iconWrapper}>
            {React.cloneElement(leftIcon as React.ReactElement, {
              size: 16,
              color: theme.colors.text,
            })}
          </View>
        )}
        <TextInput
          style={[
            styles.input,
            { color: theme.colors.placeholder, fontSize: fontSizes.small },
            style,
          ]}
          secureTextEntry={isSecure} // Usa el estado isSecure para controlar esto
          placeholderTextColor={theme.colors.placeholder}
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={handleRightIconPress}
            style={styles.iconWrapper}
          >
            {React.cloneElement(rightIcon as React.ReactElement, {
              size: 16,
              color: theme.colors.text,
            })}
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
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
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: spacing.small,
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.small,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: spacing.small,
  },
  error: {
    color: "red",
    fontSize: fontSizes.small,
    marginTop: spacing.small,
  },
});

export default Input;
