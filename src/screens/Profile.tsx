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
import Button from "../components/ui/Button";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileItem from "../components/profile/ProfileItem";
import LineHorizontal from "../components/ui/LineHorizontal";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "../navigation/ProfileStack";
import IconButton from "../components/IconButton";
import SafeContainer from "../components/SafeContainer ";

type ProfileScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "ProfileMain"
>;

export default function Profile() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { theme } = useTheme();

  return (
    <SafeContainer padding={spacing.medium}>
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
            <TextMedium style={{ fontWeight: "700" }}>Nombre dueño</TextMedium>
            <TextSmall>correo@gmail.com</TextSmall>
          </View>
        </View>

        <IconButton
          onPress={() => navigation.navigate("EditProfile")}
          icon={EditIcon}
        />
      </ProfileCard>

      {/* Sección: Mis Mascotas */}
      <ProfileCard>
        <ProfileItem
          icon={<HeartIcon fill={theme.colors.text} width={24} height={24} />}
          title="Mis mascotas"
          onPress={() => navigation.navigate("Pets")}
        />
      </ProfileCard>

      {/* Sección: Configuraciones */}
      <ProfileCard>
        <ProfileItem
          icon={<CogIcon fill={theme.colors.text} width={24} height={24} />}
          title="Configuraciones"
          onPress={() => navigation.navigate("Settings")}
        />
      </ProfileCard>

      {/* Sección: Planes y Membresías */}
      <ProfileCard>
        <ProfileItem
          icon={<StarIcon fill={theme.colors.text} width={24} height={24} />}
          title="Planes y Membresías"
          onPress={() => navigation.navigate("Memberships")}
        />
        <LineHorizontal />
        <ProfileItem
          icon={
            <CreditCardIcon fill={theme.colors.text} width={24} height={24} />
          }
          title="Pagos y Métodos de Pago"
          onPress={() => navigation.navigate("Payments")}
        />
      </ProfileCard>

      {/* Sección: Historial y Ayuda */}
      <ProfileCard>
        <ProfileItem
          icon={<ClockIcon fill={theme.colors.text} width={24} height={24} />}
          title="Historial de Actividades"
          onPress={() => navigation.navigate("History")}
        />
        <LineHorizontal />
        <ProfileItem
          icon={<BalanceIcon fill={theme.colors.text} width={24} height={24} />}
          title="Términos Legales y Políticas"
          onPress={() => navigation.navigate("Legal")}
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
          onPress={() => navigation.navigate("Help")}
        />
      </ProfileCard>

      {/* Botón de cerrar sesión */}
      <ProfileCard>
        <ProfileItem
          icon={<SignInIcon fill={theme.colors.text} width={24} height={24} />}
          title="Cerrar sesión"
        />
      </ProfileCard>

      {/* Botón de cambio de tema */}
      {/* <Button title="Cambiar tema" onPress={toggleTheme} type="primary" /> */}
    </SafeContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.medium,
  },
  scrollViewContent: {
    flexGrow: 1,
    gap: 20,
  },
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
