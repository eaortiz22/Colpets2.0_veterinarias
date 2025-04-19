import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import TextSmall from "../TextSmall";
import { spacing } from "../../styles/theme";

type StatItem = {
  label: string;
  value: string | number;
};

interface Props {
  data: StatItem[];
}

const HorizontalStatsCard = ({ data }: Props) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <View style={styles.item}>
            <Text style={styles.value}>{item.value}</Text>
            <TextSmall style={styles.label}>{item.label}</TextSmall>
          </View>

          {index < data.length - 1 && (
            <View
              style={[
                styles.divider,
                { backgroundColor: theme.colors.background },
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 8,
    alignItems: "center",
  },
  item: {
    flex: 1,
    paddingVertical: spacing.medium,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  label: {
    color: "white",
    textAlign: "center",
  },
  divider: {
    width: 1,
    height: "70%",
  },
});

export default HorizontalStatsCard;
