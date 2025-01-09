import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import TextSmall from '../TextSmall';
import { spacing } from '../../styles/theme';

const CategoryList = ({ categories }: any) => {
  const { theme } = useTheme();
  const [selectedCategoryId, setSelectedCategoryId] = useState<any>('1');

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((category: any, index: number) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryItem,
            index !== categories.length - 1 && { marginRight: 16 },
            { backgroundColor: selectedCategoryId === category.id ? theme.colors.primary : theme.colors.cardBackground },
          ]}
          onPress={() => setSelectedCategoryId(category.id)}
        >
          <TextSmall style={{ color: selectedCategoryId === category.id ? 'white' : theme.colors.secondary, fontWeight: '700' }}>
            {category.name}
          </TextSmall>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: 'center',
    padding: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: spacing.medium,
  },
});

export default CategoryList;
