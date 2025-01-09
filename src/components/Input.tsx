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
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const [text, setText] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTextChange = (value: string) => {
    setText(value);
    if (props.onChangeText) props.onChangeText(value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    if (onRightIconPress) onRightIconPress();
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.secondary }]}>
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
            {
              color: theme.colors.placeholder,
              fontSize: fontSizes.small,
              fontWeight: "normal",
            },
            style,
          ]}
          value={isPasswordVisible ? text : "●".repeat(text.length)}
          onChangeText={handleTextChange}
          placeholderTextColor={theme.colors.placeholder}
          editable
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.iconWrapper}
          >
            {React.cloneElement(rightIcon as React.ReactElement, {
              size: 16,
              color: theme.colors.text,
            })}
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && (
        <Text style={[styles.error, { color: theme.colors.error }]}>
          {errorMessage}
        </Text>
      )}
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
    backgroundColor: "transparent",
  },
  error: {
    fontSize: 12,
    marginTop: spacing.small,
  },
});

export default Input;
