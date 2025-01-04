import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "../context/ThemeContext";
import TextTitle from "../components/TextTitle";
import TextMedium from "../components/TextMedium";
import Input from "../components/Input";
import Button from "../components/Button";
import TextSmall from "../components/TextSmall";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { spacing } from "../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

const Register = () => {
  const { theme } = useTheme();
  const [isSecure, setIsSecure] = useState(true);
  const [isSecureConfirm, setIsSecureConfirm] = useState(true);
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  return (
    <SafeAreaProvider style={[{ backgroundColor: theme.colors.background }]}>
      <SafeAreaView style={[styles.container]}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: "100%" }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                />
                <Input
                  label="Contraseña"
                  placeholder="Ingrese su contraseña"
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
                />
                <Input
                  label="Confirmar Contraseña"
                  placeholder="Confirme su contraseña"
                  autoComplete="password"
                  textContentType="password"
                  secureTextEntry={isSecureConfirm}
                  leftIcon={<MaterialIcons name="lock" />}
                  rightIcon={
                    <MaterialIcons
                      name={isSecureConfirm ? "visibility" : "visibility-off"}
                    />
                  }
                  onRightIconPress={() => setIsSecureConfirm(!isSecureConfirm)}
                />
              </View>
              <Button
                title="Registrarse"
                onPress={() => console.log("Registro exitoso")}
                type="primary"
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
              <TextSmall style={{ alignSelf: "center" }}>
                ¿Ya tienes cuenta?{" "}
                <Text
                  onPress={() => navigation.goBack()}
                  style={{
                    color: theme.colors.link,
                    textDecorationLine: "underline",
                  }}
                >
                  Inicia sesión aquí
                </Text>
              </TextSmall>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.medium,
  },
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
});

export default Register;
