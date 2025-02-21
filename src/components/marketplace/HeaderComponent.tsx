import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import TextTitle from "../TextTitle";
import { SearchIcon, ShoppingCartIcon } from "../../../assets/icons";
import { spacing } from "../../styles/theme";
import CircularIconButton from "../CircularIconButton";

const HeaderComponent = () => {
  const { theme } = useTheme();

  return (
    <View style={styles.header}>
      <TextTitle>Marketplace</TextTitle>
      <View style={styles.iconContainer}>
        <CircularIconButton
          icon={<SearchIcon fill="#555" />}
          onPress={() => console.log("Buscar presionado")}
        />
        <CircularIconButton
          icon={<ShoppingCartIcon fill="#555" />}
          onPress={() => console.log("Shop presionado")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.medium,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    gap: spacing.medium,
  },
});

export default HeaderComponent;
