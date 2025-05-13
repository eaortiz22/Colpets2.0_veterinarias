import { View, Text, StyleSheet } from "react-native";
import { Veterinarian } from "../../types/veterinaryTypes";
import { spacing } from "../../styles/theme";
import { useTheme } from "../../context/ThemeContext";

export const EducationTimeline = ({ education }: { education: Veterinarian["education"] }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {education?.map((item, index) => (
        <View key={index} style={styles.entry}>
          <View style={styles.leftColumn}>
            <Text style={[styles.date, { color: theme.colors.text }]}>
              {item.startYear} {item.endYear ? `- ${item.endYear}` : ""}
            </Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={[styles.university, { color: theme.colors.text }]}>{item.university}</Text>
            <Text style={[styles.titleText, { color: theme.colors.text }]}>{item.title}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.medium,
    gap: 24,
  },
  entry: {
    flexDirection: "row",
    gap: spacing.medium,
  },
  leftColumn: {
    alignItems: "flex-end",
  },
  date: {
    fontSize: 12,
  },
  rightColumn: {
    flex: 1,
  },
  university: {
    fontWeight: "bold",
    fontSize: 14,
  },
  titleText: {
    fontSize: 13,
    color: "#333",
  },
  specialization: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
});
