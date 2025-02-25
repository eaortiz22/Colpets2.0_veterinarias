import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import Card from "../ui/Card";

interface QuickAccessItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
}

interface QuickAccessSectionProps {
  accesses?: QuickAccessItem[];
  cardStyle?: ViewStyle;
}

const QuickAccessSection: React.FC<QuickAccessSectionProps> = ({
  accesses = [],
  cardStyle,
}) => {
  const { theme } = useTheme();

  return (
    <Card
      styles={{
        backgroundColor: theme.colors.cardBackground,
        ...cardStyle,
      }}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Accesos Rápidos
      </Text>
      <FlatList
        data={accesses}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={item.onPress}
          >
            {item.icon}
            <Text style={[styles.label, { color: theme.colors.text }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 12,
    width: 100,
    height: 100,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
    textAlign: "center",
  },
});

export default QuickAccessSection;
