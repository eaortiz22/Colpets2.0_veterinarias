import { StyleSheet } from 'react-native';
import { fontSizes } from './theme';

export const getGlobalStyles = (theme: { colors: { [key: string]: string } }, isDarkTheme?: boolean) =>
  StyleSheet.create({
    button: {
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: 32,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    buttonPrimary: {
      backgroundColor: theme.colors.primary,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 13,
      elevation: 3,
    },
    buttonSecondary: {
      backgroundColor: 'transparent',
      borderColor: isDarkTheme ? '#ac9cb7' : theme.colors.primary,
      borderWidth: 2,
      paddingVertical: 14,
    },
    buttonTextPrimary: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
    buttonTextSecondary: {
      color: isDarkTheme ? '#ac9cb7' : theme.colors.primary,
      fontSize: 16,
      fontWeight: 'bold',
    },
    filterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
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
      color: theme.colors.secondary,
      fontSize: fontSizes.large,
      fontWeight: '700',
    },
    textMedium: {
      color: theme.colors.secondary,
      fontSize: fontSizes.medium,
      fontWeight: '500',
    },
    textSmall: {
      color: theme.colors.text,
      fontSize: fontSizes.small,
      fontWeight: '400',
    },
  });
