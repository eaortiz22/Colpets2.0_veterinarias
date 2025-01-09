import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardAvoidingView } from 'react-native';
import TextTitle from '../components/TextTitle';
import TextMedium from '../components/TextMedium';
import Input from '../components/Input';
import Button from '../components/Button';
import TextSmall from '../components/TextSmall';
import { spacing } from '../styles/theme';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const { theme } = useTheme();
  const [isSecure, setIsSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => {
    let valid = true;

    if (!email) {
      setEmailError('El correo electrónico es obligatorio.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('La contraseña es obligatoria.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      console.log('Datos validados. Iniciar sesión...');
      setIsLoggedIn(true);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, justifyContent: 'space-between', gap: 20 }}>
            <View style={styles.formContainer}>
              <Image source={require('../../assets/background/backgroundLogin.png')} style={styles.image} resizeMode="cover" />
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
                  rightIcon={<MaterialIcons name={isSecure ? 'visibility' : 'visibility-off'} onPress={() => setIsSecure(!isSecure)} />}
                  onChangeText={setPassword}
                  errorMessage={passwordError}
                />
                <TextSmall>
                  ¿Olvidaste tu contraseña?{' '}
                  <Text
                    onPress={() => navigation.navigate('ResetPassword')}
                    style={{
                      color: theme.colors.secondary,
                      textDecorationLine: 'underline',
                      fontWeight: '700',
                    }}
                  >
                    Recupérala aquí
                  </Text>
                </TextSmall>
              </View>
              <Button title="Ingresar" onPress={handleLogin} type="primary" />
            </View>

            <TextSmall style={{ alignSelf: 'center' }}>
              ¿No tienes una cuenta?{' '}
              <Text
                onPress={() => navigation.navigate('Register')}
                style={{
                  color: theme.colors.secondary,
                  textDecorationLine: 'underline',
                  fontWeight: '700',
                }}
              >
                Crea una aquí
              </Text>
            </TextSmall>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    padding: spacing.medium,
  },
  formContainer: {
    width: '100%',
    gap: 20,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 30,
  },
});

export default Login;
