import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { HeartIcon, InfoCircleIcon } from "../../../assets/icons";
import Card from "../ui/Card";
import { useTheme } from "../../context/ThemeContext";

interface Reminder {
  id: string;
  petName: string;
  date: string;
  event: string;
}

interface HealthReminderCardProps {
  reminders?: Reminder[];
  cardStyle?: ViewStyle; // Nueva prop para personalizar estilos del Card
}

const HealthReminderCard: React.FC<HealthReminderCardProps> = ({
  reminders = [],
  cardStyle,
}) => {
  const nextReminder = reminders.length > 0 ? reminders[0] : null;
  const { theme } = useTheme();

  return (
    <Card
      styles={{
        backgroundColor: nextReminder
          ? theme.colors.warning100
          : theme.colors.cardBackground,
        ...cardStyle,
      }}
    >
      <View style={styles.container}>
        {nextReminder ? (
          <>
            <InfoCircleIcon fill={theme.colors.warning600} size={24} />
            <Text
              style={[styles.text, { color: theme.colors.warning600 }]}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {`Recuerda la ${nextReminder.event} de ${nextReminder.petName} el ${nextReminder.date}`}
            </Text>
          </>
        ) : (
          <>
            <HeartIcon color="#4CAF50" />
            <Text style={styles.text}>
              Chequea la salud de tu mascota en una veterinaria cercana.
            </Text>
          </>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    flexShrink: 1,
  },
});

export default HealthReminderCard;
