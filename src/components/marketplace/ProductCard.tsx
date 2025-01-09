import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import TextSmall from '../TextSmall';
import { PlusIcon } from '../../../assets/icons';
import { spacing } from '../../styles/theme';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ProductDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;

const ProductCard = ({ products }: any) => {
  const navigation = useNavigation<ProductDetailScreenNavigationProp>();
  const { theme } = useTheme();

  const handlePress = (product: string) => {
    navigation.navigate('ProductDetail', { product });
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {products.map((product: any, index: number) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.cards,
            { backgroundColor: theme.colors.cardBackground, marginRight: index !== products.length - 1 ? 16 : 0, width: 200 },
          ]}
          onPress={() => handlePress(product)}
        >
          <Image source={product.image} resizeMode="cover" style={{ width: '100%', height: 150, borderRadius: 16 }} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: spacing.small,
              paddingHorizontal: spacing.small,
            }}
          >
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <TextSmall numberOfLines={1} ellipsizeMode="tail" style={{ color: theme.colors.text }}>
                {product.name}
              </TextSmall>
              <Text style={{ color: theme.colors.secondary, fontWeight: '700', fontSize: 20 }}>${product.price.toLocaleString()}</Text>
            </View>
            <TouchableOpacity
              style={{
                padding: spacing.small,
                backgroundColor: theme.colors.primary,
                borderRadius: 50,
                alignSelf: 'flex-end',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <PlusIcon fill="white" width={16} height={16} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cards: {
    padding: spacing.medium,
    borderRadius: 32,
    width: 200,
    marginRight: 16,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.small,
    paddingHorizontal: spacing.small,
  },
  plusButton: {
    padding: spacing.small,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductCard;
