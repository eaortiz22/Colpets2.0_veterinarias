import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import TextTitle from '../TextTitle';
import { SearchIcon, ShoppingCartIcon } from '../../../assets/icons';
import { spacing } from '../../styles/theme';

const HeaderComponent = () => {
  const { theme } = useTheme();

  return (
    <View style={styles.header}>
      <TextTitle>Marketplace</TextTitle>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={{ padding: spacing.small, backgroundColor: theme.colors.cardBackground, borderRadius: 50 }}>
          <SearchIcon fill={theme.colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: spacing.small, backgroundColor: theme.colors.cardBackground, borderRadius: 50 }}>
          <ShoppingCartIcon fill={theme.colors.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: spacing.medium,
  },
});

export default HeaderComponent;
