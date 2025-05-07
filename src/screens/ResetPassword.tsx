import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import Input from "../components/ui/Input";
import TextTitle from "../components/TextTitle";
import TextMedium from "../components/TextMedium";
import Button from "../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { spacing } from "../styles/theme";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { isValidEmail } from "../utils/validators";

type ResetPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ResetPassword"
>;

export default function ResetPassword() {
  const { theme } = useTheme();
  const navigation = useNavigation<ResetPasswordScreenNavigationProp>();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  });
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const [isSecureConfirm, setIsSecureConfirm] = useState(true);

  const inputRefs = Array(4)
    .fill(null)
    .map(() => useRef<TextInput>(null));

  const handleEmailSubmit = () => {
    if (!isValidEmail(email)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "Por favor ingresa un correo válido.",
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
      setStep(2);
    }
  };

  const handleCodeSubmit = () => {
    if (code.length !== 4) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        code: "El código debe tener 4 dígitos.",
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        code: "",
      }));
      setStep(3);
    }
  };

  const handlePasswordSubmit = () => {
    if (!password) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: "La contraseña no puede estar vacía.",
      }));
    } else if (password !== confirmPassword) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Las contraseñas no coinciden.",
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
        confirmPassword: "",
      }));
      alert("Contraseña restablecida con éxito.");
      navigation.goBack();
    }
  };

  const handleTextChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode.join(""));

    if (text && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && !code[index]) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.formContainer}>
            <Image
              source={require("../../assets/background/backgroundResetPassword.png")}
              style={styles.image}
              resizeMode="cover"
            />
            <TextTitle>Recupera tu contraseña!</TextTitle>

            {/* Step 1 - Email */}
            {step === 1 && (
              <View style={{ gap: 20 }}>
                <TextMedium>
                  Ingresa tu correo electrónico y te enviaremos un código de
                  validación.
                </TextMedium>
                <Input
                  label="Correo electrónico"
                  placeholder="Ingrese su correo"
                  value={email}
                  onChangeText={setEmail}
                  autoComplete="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  errorMessage={formErrors.email}
                />
              </View>
            )}

            {/* Step 2 - Code */}
            {step === 2 && (
              <View style={{ gap: 20 }}>
                <TextMedium>
                  Hemos enviado un código de 4 dígitos a tu correo. Ingresa el
                  código para continuar.
                </TextMedium>
                <View style={styles.otpContainer}>
                  {Array(4)
                    .fill("")
                    .map((_, index) => (
                      <TextInput
                        key={index}
                        style={[styles.otpInput, { color: theme.colors.text }]}
                        value={code[index] || ""}
                        onChangeText={(text) => handleTextChange(text, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        textAlign="center"
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        ref={inputRefs[index]}
                        autoFocus={index === 0}
                      />
                    ))}
                </View>
                {formErrors.code && (
                  <Text style={[styles.error, { color: theme.colors.error }]}>
                    {formErrors.code}
                  </Text>
                )}
              </View>
            )}

            {/* Step 3 - Password */}
            {step === 3 && (
              <View style={{ gap: 20 }}>
                <TextMedium>
                  Ingresa una nueva contraseña para tu cuenta.
                </TextMedium>
                <Input
                  label="Contraseña"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  autoComplete="password"
                  textContentType="oneTimeCode"
                  secureTextEntry={isSecure}
                  rightIcon={
                    <MaterialIcons
                      name={isSecure ? "visibility" : "visibility-off"}
                    />
                  }
                  onRightIconPress={() => setIsSecure(!isSecure)}
                  onChangeText={setPassword}
                  errorMessage={formErrors.password}
                />
                <Input
                  label="Confirmar Contraseña"
                  placeholder="Confirme su contraseña"
                  autoComplete="off"
                  textContentType="oneTimeCode"
                  secureTextEntry={isSecureConfirm}
                  rightIcon={
                    <MaterialIcons
                      name={isSecureConfirm ? "visibility" : "visibility-off"}
                    />
                  }
                  onRightIconPress={() => setIsSecureConfirm(!isSecureConfirm)}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  errorMessage={formErrors.confirmPassword}
                />
              </View>
            )}
          </View>
          {/* Button Container */}
          <View style={styles.buttonContainer}>
            {step === 1 && (
              <Button
                title="Enviar"
                onPress={handleEmailSubmit}
                type="primary"
              />
            )}
            {step === 2 && (
              <Button
                title="Verificar Código"
                onPress={handleCodeSubmit}
                type="primary"
              />
            )}
            {step === 3 && (
              <Button
                title="Restablecer Contraseña"
                onPress={handlePasswordSubmit}
                type="primary"
              />
            )}
            <Button
              title="Volver"
              onPress={() => {
                if (step === 1) {
                  navigation.goBack();
                } else {
                  setStep(step - 1);
                }
              }}
              type="secondary"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    padding: spacing.medium,
  },
  formContainer: {
    gap: 20,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 30,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 20,
    textAlign: "center",
  },
  error: {
    fontSize: 12,
    marginTop: spacing.small,
  },
  buttonContainer: {
    gap: 16,
  },
});
