import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import TextTitle from "../components/TextTitle";
import TextMedium from "../components/TextMedium";
import TextSmall from "../components/TextSmall";
import {
  AngleIcon,
  BalanceIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  EditIcon,
  HeartIcon,
  QuestionCircleIcon,
  SignInIcon,
  StarIcon,
} from "../../assets/icons";
import { Image } from "react-native";
import { spacing } from "../styles/theme";
import Button from "../components/Button";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileItem from "../components/profile/ProfileItem";
import LineHorizontal from "../components/LineHorizontal";

export default function Profile() {
  const { toggleTheme, theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TextTitle>Perfil</TextTitle>

        {/* Tarjeta de Perfil */}
        <ProfileCard
          style={{ justifyContent: "space-between", flexDirection: "row" }}
        >
          <View style={styles.row}>
            <View style={styles.imageWrapper}>
              <Image
                source={require("../../assets/images/imageProfile.jpg")}
                resizeMode="cover"
                style={styles.image}
              />
            </View>
            <View style={styles.textWrapper}>
              <TextMedium style={{ fontWeight: "700" }}>
                Nombre dueño
              </TextMedium>
              <TextSmall>correo@gmail.com</TextSmall>
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.editButton,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <EditIcon fill="white" width={18} height={18} />
          </TouchableOpacity>
        </ProfileCard>

        {/* Sección: Mis Mascotas */}
        <ProfileCard>
          <ProfileItem
            icon={<HeartIcon fill={theme.colors.text} width={24} height={24} />}
            title="Mis mascotas"
          />
        </ProfileCard>

        {/* Sección: Configuraciones */}
        <ProfileCard>
          <ProfileItem
            icon={<CogIcon fill={theme.colors.text} width={24} height={24} />}
            title="Configuraciones"
          />
        </ProfileCard>

        {/* Sección: Planes y Membresías */}
        <ProfileCard>
          <ProfileItem
            icon={<StarIcon fill={theme.colors.text} width={24} height={24} />}
            title="Planes y Membresías"
          />
          <LineHorizontal />
          <ProfileItem
            icon={
              <CreditCardIcon fill={theme.colors.text} width={24} height={24} />
            }
            title="Pagos y Métodos de Pago"
          />
        </ProfileCard>

        {/* Sección: Historial y Ayuda */}
        <ProfileCard>
          <ProfileItem
            icon={<ClockIcon fill={theme.colors.text} width={24} height={24} />}
            title="Historial de Actividades"
          />
          <LineHorizontal />
          <ProfileItem
            icon={
              <BalanceIcon fill={theme.colors.text} width={24} height={24} />
            }
            title="Términos Legales y Políticas"
          />
          <LineHorizontal />
          <ProfileItem
            icon={
              <QuestionCircleIcon
                fill={theme.colors.text}
                width={24}
                height={24}
              />
            }
            title="Ayuda y Soporte"
          />
        </ProfileCard>

        {/* Botón de cerrar sesión */}
        <ProfileCard>
          <ProfileItem
            icon={
              <SignInIcon fill={theme.colors.text} width={24} height={24} />
            }
            title="Cerrar sesión"
          />
        </ProfileCard>

        {/* Botón de cambio de tema */}
        {/* <Button title="Cambiar tema" onPress={toggleTheme} type="primary" /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    gap: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    maxWidth: 60,
    maxHeight: 60,
    borderRadius: 50,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    padding: spacing.medium,
  },
  scrollViewContent: {
    flexGrow: 1,
    gap: 20,
  },
  containerCard: {
    padding: spacing.medium,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  imageWrapper: {
    width: 60,
    height: 60,
    overflow: "hidden",
  },
  textWrapper: {
    gap: 2,
  },
  editButton: {
    padding: spacing.small,
    borderRadius: 50,
    alignSelf: "center",
    justifyContent: "center",
  },
});
