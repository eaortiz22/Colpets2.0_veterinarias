import { StyleSheet } from "react-native";
import { fontSizes } from "./theme";

export const getGlobalStyles = (theme: { colors: { [key: string]: string } }) =>
  StyleSheet.create({
    button: {
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: 32,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    buttonPrimary: {
      backgroundColor: theme.colors.primary,
    },
    buttonSecondary: {
      backgroundColor: theme.colors.secondary,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.background,
    },
    filterContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      backgroundColor: theme.colors.background,
      borderRadius: 8,
      marginBottom: 8,
    },
    filterText: {
      fontSize: 14,
      color: theme.colors.text,
      marginLeft: 8,
    },
    input: {
      height: 40,
      borderColor: theme.colors.text,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      marginBottom: 16,
    },
    textTitle: {
      color: theme.colors.text,
      fontSize: fontSizes.large,
      fontWeight: "700",
    },
    textMedium: {
      color: theme.colors.text,
      fontSize: fontSizes.medium,
      fontWeight: "500",
    },
    textSmall: {
      color: theme.colors.text,
      fontSize: fontSizes.small,
    },
  });
