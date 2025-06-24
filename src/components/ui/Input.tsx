import React, { useState } from "react";
import { TextInput, StyleSheet, TextInputProps, View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { fontSizes, spacing } from "../../styles/theme";

interface InputProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  emergency?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  errorMessage,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  emergency,
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
        <Text
          style={[
            styles.label,
            { color: emergency ? "#fff" : theme.colors.secondary, fontWeight: emergency ? "700" : "400" },
          ]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: emergency ? "transparent" : theme.colors.inputBg,
            borderColor: emergency ? "#fff" : "#ccc",
          },
        ]}
      >
        {leftIcon && <View style={styles.iconWrapper}>{React.cloneElement(leftIcon as React.ReactElement)}</View>}
        <TextInput
          style={[
            styles.input,
            {
              color: emergency ? "#fff" : theme.colors.placeholder,
              fontSize: fontSizes.small,
              fontWeight: "normal",
              minHeight: props.multiline ? 100 : 48,
            },
            style,
          ]}
          value={text}
          secureTextEntry={props.secureTextEntry}
          onChangeText={handleTextChange}
          placeholderTextColor={emergency ? "#fff" : theme.colors.placeholder}
          editable
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconWrapper}>
            {React.cloneElement(rightIcon as React.ReactElement)}
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && (
        <Text style={[styles.error, { color: emergency ? "#fff" : theme.colors.error }]}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 4,
  },
  label: {
    fontSize: fontSizes.small,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
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
  },
});

export default Input;
