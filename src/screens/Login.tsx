import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TextTitle from "../components/TextTitle";
import TextMedium from "../components/TextMedium";
import Input from "../components/Input";
import Button from "../components/Button";
import TextSmall from "../components/TextSmall";
import { spacing } from "../styles/theme";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const { theme } = useTheme();
  const [isSecure, setIsSecure] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => {
    let valid = true;

    if (!email) {
      setEmailError("El correo electrónico es obligatorio.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("La contraseña es obligatoria.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      console.log("Datos validados. Iniciar sesión...");
      setIsLoggedIn(true);
    }
  };

  return (
    <SafeAreaProvider style={[{ backgroundColor: theme.colors.background }]}>
      <SafeAreaView style={[styles.container]}>
        <View style={{ flex: 1 }}>
          <KeyboardAwareScrollView
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View style={styles.formContainer}>
              <Image
                source={require("../../assets/background/backgroundLogin.png")}
                style={styles.image}
                resizeMode="cover"
              />
              <TextTitle>Hola de nuevo!</TextTitle>
              <TextMedium>¡Bienvenido, te hemos extrañado!</TextMedium>
              <View>
                <Input
                  label="Correo electrónico"
                  placeholder="Ingrese su correo"
                  value={email}
                  onChangeText={setEmail}
                  autoComplete="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  leftIcon={<MaterialIcons name="email" />}
                  errorMessage={emailError}
                />
                <Input
                  label="Contraseña"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  autoComplete="password"
                  textContentType="password"
                  secureTextEntry={isSecure}
                  leftIcon={<MaterialIcons name="lock" />}
                  rightIcon={
                    <MaterialIcons
                      name={isSecure ? "visibility" : "visibility-off"}
                    />
                  }
                  onRightIconPress={() => setIsSecure(!isSecure)}
                  onChangeText={setPassword}
                  errorMessage={passwordError}
                />
                <TextSmall>
                  ¿Olvidaste tu contraseña?{" "}
                  <Text
                    onPress={() => navigation.navigate("ResetPassword")}
                    style={{
                      color: theme.colors.link,
                      textDecorationLine: "underline",
                    }}
                  >
                    Recupérala aquí
                  </Text>
                </TextSmall>
              </View>
              <Button title="Ingresar" onPress={handleLogin} type="primary" />
            </View>
          </KeyboardAwareScrollView>

          <TextSmall style={{ alignSelf: "center" }}>
            ¿No tienes una cuenta?{" "}
            <Text
              onPress={() => navigation.navigate("Register")}
              style={{
                color: theme.colors.link,
                textDecorationLine: "underline",
              }}
            >
              Crea una aquí
            </Text>
          </TextSmall>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    gap: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    maxHeight: 250,
    borderRadius: 30,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.medium,
  },
});

export default Login;
