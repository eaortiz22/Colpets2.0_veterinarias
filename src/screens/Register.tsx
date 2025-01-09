import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "../context/ThemeContext";
import TextTitle from "../components/TextTitle";
import TextMedium from "../components/TextMedium";
import Input from "../components/Input";
import Button from "../components/Button";
import TextSmall from "../components/TextSmall";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing } from "../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

const Register: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const [isSecureConfirm, setIsSecureConfirm] = useState(true);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "", confirmPassword: "" };

    if (!email) {
      newErrors.email = "El correo es obligatorio";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "El correo no es válido";
      valid = false;
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      valid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Debes confirmar tu contraseña";
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = () => {
    if (validateForm()) {
      console.log("Registro exitoso con:", { email, password });
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
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
              <TextMedium>
                Completa los siguientes campos para registrarte
              </TextMedium>
              <View>
                <Input
                  label="Correo electrónico"
                  placeholder="Ingrese su correo"
                  autoComplete="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  leftIcon={<MaterialIcons name="email" />}
                  value={email}
                  onChangeText={setEmail}
                  errorMessage={errors.email}
                />
                <Input
                  label="Contraseña"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  autoComplete="password"
                  textContentType="oneTimeCode"
                  secureTextEntry={isSecure}
                  leftIcon={<MaterialIcons name="lock" />}
                  rightIcon={
                    <MaterialIcons
                      name={isSecure ? "visibility" : "visibility-off"}
                      onPress={() => setIsSecure(!isSecure)}
                    />
                  }
                  onChangeText={setPassword}
                  errorMessage={errors.password}
                />
                <Input
                  label="Confirmar Contraseña"
                  placeholder="Confirme su contraseña"
                  autoComplete="off"
                  textContentType="oneTimeCode"
                  secureTextEntry={isSecureConfirm}
                  leftIcon={<MaterialIcons name="lock" />}
                  rightIcon={
                    <MaterialIcons
                      name={isSecureConfirm ? "visibility" : "visibility-off"}
                      onPress={() => setIsSecureConfirm(!isSecureConfirm)}
                    />
                  }
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  errorMessage={errors.confirmPassword}
                />
              </View>
              <Button
                title="Registrarse"
                onPress={handleRegister}
                type="primary"
              />
            </View>
            <TextSmall style={{ alignSelf: "center" }}>
              ¿Ya tienes cuenta?{" "}
              <Text
                onPress={() => navigation.goBack()}
                style={{
                  color: theme.colors.secondary,
                  textDecorationLine: "underline",
                  fontWeight: '700',
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
