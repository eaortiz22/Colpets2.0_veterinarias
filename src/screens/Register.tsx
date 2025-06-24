import React, { JSX, useState } from "react";
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useTheme } from "../context/ThemeContext";
import { RootStackParamList } from "../navigation/AppNavigator";
import { spacing } from "../styles/theme";

import TextTitle from "../components/TextTitle";
import TextMedium from "../components/TextMedium";
import TextSmall from "../components/TextSmall";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { EyeIcon, EyeOffIcon, LockAltIcon, MailIcon } from "../../assets/icons";

import { validateEmail, validatePassword, validateConfirmPassword } from "../utils/formValidators";
import { apiRequest } from "../utils/apiRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";
import { isNonEmpty } from "../utils/validators";

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, "Register">;

type FieldName = "name" | "email" | "password" | "confirmPassword";

const Register: React.FC = () => {
  const { theme } = useTheme();
  const { setIsAuthenticated, setUser } = useAuth();
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const [isSecureConfirm, setIsSecureConfirm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const fieldSetters: Record<FieldName, React.Dispatch<React.SetStateAction<string>>> = {
    name: setName,
    email: setEmail,
    password: setPassword,
    confirmPassword: setConfirmPassword,
  };

  const fieldValidators: Record<FieldName, (value: string) => string> = {
    name: (value) => (isNonEmpty(value) ? "" : "El nombre es obligatorio"),
    email: validateEmail,
    password: validatePassword,
    confirmPassword: (value) => validateConfirmPassword(value, password),
  };

  const handleFieldChange = (field: FieldName, value: string) => {
    fieldSetters[field](value);
    setErrors((prev) => ({
      ...prev,
      [field]: fieldValidators[field](value),
      ...(field === "password" && {
        confirmPassword: validateConfirmPassword(confirmPassword, value),
      }),
    }));
  };

  const handleRegister = async () => {
    const nameError = fieldValidators.name(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password);

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    if (nameError || emailError || passwordError || confirmPasswordError) return;

    setIsLoading(true);

    try {
      const data = await apiRequest("/api/v1/user", "POST", undefined, {
        name,
        email,
        password,
      });
      console.log(data);

      if (data?.code === 200) {
        setIsAuthenticated(true);
      } else {
        console.error("Error al registrar usuario:", data?.message);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordIcon = (show: boolean, isSecure: boolean): JSX.Element | undefined => {
    if (!show) return undefined;
    const IconComponent = isSecure ? EyeOffIcon : EyeIcon;
    return <IconComponent width={16} height={16} fill={theme.colors.text} />;
  };

  return isLoading ? (
    <ActivityIndicator size="large" color={theme.colors.secondary} />
  ) : (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, justifyContent: "space-between", gap: 20 }}>
            <View style={styles.formContainer}>
              <Image
                source={require("../../assets/background/backgroundRegister.png")}
                style={styles.image}
                resizeMode="cover"
              />
              <TextTitle>¡Regístrate!</TextTitle>
              <TextMedium>Completa los siguientes campos para registrarte</TextMedium>

              <View style={{ gap: 8 }}>
                <Input
                  label="Nombre"
                  placeholder="Ingrese su nombre"
                  autoComplete="name"
                  textContentType="name"
                  value={name}
                  onChangeText={(value) => handleFieldChange("name", value)}
                  errorMessage={errors.name}
                />

                <Input
                  label="Correo electrónico"
                  placeholder="Ingrese su correo"
                  autoComplete="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  leftIcon={<MailIcon width={16} height={16} fill={theme.colors.text} />}
                  value={email}
                  onChangeText={(value) => handleFieldChange("email", value)}
                  errorMessage={errors.email}
                />

                <Input
                  label="Contraseña"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  autoComplete="password"
                  textContentType="oneTimeCode"
                  secureTextEntry={isSecure}
                  leftIcon={<LockAltIcon width={16} height={16} fill={theme.colors.text} />}
                  rightIcon={getPasswordIcon(!!password, isSecure)}
                  onRightIconPress={() => setIsSecure(!isSecure)}
                  onChangeText={(value) => handleFieldChange("password", value)}
                  errorMessage={errors.password}
                />

                <Input
                  label="Confirmar Contraseña"
                  placeholder="Confirme su contraseña"
                  autoComplete="off"
                  textContentType="oneTimeCode"
                  secureTextEntry={isSecureConfirm}
                  leftIcon={<LockAltIcon width={16} height={16} fill={theme.colors.text} />}
                  rightIcon={getPasswordIcon(!!confirmPassword, isSecureConfirm)}
                  onRightIconPress={() => setIsSecureConfirm(!isSecureConfirm)}
                  value={confirmPassword}
                  onChangeText={(value) => handleFieldChange("confirmPassword", value)}
                  errorMessage={errors.confirmPassword}
                />
              </View>

              <Button title="Registrarse" onPress={handleRegister} type="primary" />
            </View>

            <TextSmall style={{ alignSelf: "center" }}>
              ¿Ya tienes cuenta?{" "}
              <Text
                onPress={() => navigation.goBack()}
                style={{
                  color: theme.colors.secondary,
                  textDecorationLine: "underline",
                  fontWeight: "700",
                }}
              >
                Inicia sesión aquí
              </Text>
            </TextSmall>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    padding: spacing.medium,
  },
  formContainer: {
    width: "100%",
    gap: 20,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 30,
  },
});

export default Register;
