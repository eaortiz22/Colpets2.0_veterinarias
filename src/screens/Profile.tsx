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

export default function Profile() {
  const { toggleTheme, theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TextTitle>Perfil</TextTitle>
        <View
          style={{
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 8,
          }}
        >
          <View style={styles.containerCard}>
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
          </View>
          <View
            style={{ height: 1, backgroundColor: theme.colors.background }}
          ></View>
          <TouchableOpacity style={styles.containerCard}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <HeartIcon fill={theme.colors.text} width={24} height={24} />
              <TextMedium>Mis mascotas</TextMedium>
            </View>
            <View>
              <AngleIcon fill={theme.colors.text} width={24} height={24} />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 8,
          }}
        >
          <View style={{ padding: spacing.medium, gap: 16 }}>
            <TouchableOpacity style={styles.item}>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <CogIcon fill={theme.colors.text} width={24} height={24} />
                <TextMedium>Configuraciones</TextMedium>
              </View>
              <View>
                <AngleIcon fill={theme.colors.text} width={24} height={24} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 8,
          }}
        >
          <View style={{ padding: spacing.medium, gap: 16 }}>
            <TouchableOpacity style={styles.item}>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <StarIcon fill={theme.colors.text} width={24} height={24} />
                <TextMedium>Planes y Membresías</TextMedium>
              </View>
              <View>
                <AngleIcon fill={theme.colors.text} width={24} height={24} />
              </View>
            </TouchableOpacity>
            <View
              style={{ height: 1, backgroundColor: theme.colors.background }}
            ></View>
            <TouchableOpacity style={styles.item}>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <CreditCardIcon
                  fill={theme.colors.text}
                  width={24}
                  height={24}
                />
                <TextMedium>Pagos y Métodos de Pago</TextMedium>
              </View>
              <View>
                <AngleIcon fill={theme.colors.text} width={24} height={24} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 8,
          }}
        >
          <View style={{ padding: spacing.medium, gap: 16 }}>
            <TouchableOpacity style={styles.item}>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <ClockIcon fill={theme.colors.text} width={24} height={24} />
                <TextMedium>Historial de Actividades</TextMedium>
              </View>
              <View>
                <AngleIcon fill={theme.colors.text} width={24} height={24} />
              </View>
            </TouchableOpacity>
            <View
              style={{ height: 1, backgroundColor: theme.colors.background }}
            ></View>
            <TouchableOpacity style={styles.item}>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <BalanceIcon fill={theme.colors.text} width={24} height={24} />
                <TextMedium>Términos Legales y Políticas</TextMedium>
              </View>
              <View>
                <AngleIcon fill={theme.colors.text} width={24} height={24} />
              </View>
            </TouchableOpacity>
            <View
              style={{ height: 1, backgroundColor: theme.colors.background }}
            ></View>
            <TouchableOpacity style={styles.item}>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <QuestionCircleIcon
                  fill={theme.colors.text}
                  width={24}
                  height={24}
                />
                <TextMedium>Ayuda y Soporte</TextMedium>
              </View>
              <View>
                <AngleIcon fill={theme.colors.text} width={24} height={24} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            backgroundColor: theme.colors.cardBackground,
            borderRadius: 8,
          }}
        >
          <TouchableOpacity style={styles.item}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <SignInIcon fill={theme.colors.text} width={24} height={24} />
              <TextMedium>Cerrar sesión</TextMedium>
            </View>
            <View>
              <AngleIcon fill={theme.colors.text} width={24} height={24} />
            </View>
          </TouchableOpacity>
        </View>

        <Button title="Cambiar tema" onPress={toggleTheme} type="primary" />
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
    justifyContent: "center",
    alignItems: "center",
  },
});
