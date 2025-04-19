import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import TextSmall from "../TextSmall";

const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getStartDayOfMonth = (month: number, year: number) => {
  const startDay = new Date(year, month, 1).getDay();
  return (startDay + 6) % 7; // Para empezar en lunes
};

const CustomCalendar = ({
  selectedDate,
  onDateChange,
  availableHours,
  selectedHour,
  onHourSelect,
}: CustomCalendarProps) => {
  const { theme } = useTheme();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const startDay = getStartDayOfMonth(currentMonth, currentYear);

  const handleMonthChange = (increment: number) => {
    const newDate = new Date(currentYear, currentMonth + increment, 1);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };

  const isSameDay = (date1: Date, date2: Date) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  const isPast = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return (
      date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
    );
  };

  return (
    <View style={{ gap: 12 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => handleMonthChange(-1)}>
          {/* <ChevronLeft color={theme.colors.text} /> */}
        </TouchableOpacity>
        <Text
          style={{ fontWeight: "bold", fontSize: 16, color: theme.colors.text }}
        >
          {new Date(currentYear, currentMonth).toLocaleString("es-ES", {
            month: "long",
            year: "numeric",
          })}
        </Text>
        <TouchableOpacity onPress={() => handleMonthChange(1)}>
          {/* <ChevronRight color={theme.colors.text} /> */}
        </TouchableOpacity>
      </View>

      {/* Días de la semana */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {daysOfWeek.map((d) => (
          <Text
            key={d}
            style={{
              width: 32,
              textAlign: "center",
              fontWeight: "500",
              color: theme.colors.text,
            }}
          >
            {d}
          </Text>
        ))}
      </View>

      {/* Días del mes */}
      {/* Días del mes en filas de 7 */}
      {(() => {
        const totalCells = startDay + daysInMonth;
        const rows = Math.ceil(totalCells / 7);
        const calendarRows = [];

        let dayCounter = 1;

        for (let row = 0; row < rows; row++) {
          const week = [];
          for (let col = 0; col < 7; col++) {
            const cellIndex = row * 7 + col;
            if (cellIndex < startDay || dayCounter > daysInMonth) {
              week.push(
                <View
                  key={`empty-${row}-${col}`}
                  style={{ width: 32, height: 32, margin: 2 }}
                />
              );
            } else {
              const date = new Date(currentYear, currentMonth, dayCounter);
              const isSelected = isSameDay(date, selectedDate);
              const past = isPast(dayCounter);

              week.push(
                <TouchableOpacity
                  key={dayCounter}
                  onPress={() => !past && onDateChange(date)}
                  style={{
                    width: 32,
                    height: 32,
                    margin: 2,
                    borderRadius: 16,
                    backgroundColor: isSelected
                      ? theme.colors.primary
                      : past
                      ? theme.colors.cardBackground
                      : "transparent",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  disabled={past}
                >
                  <Text
                    style={{
                      color: isSelected
                        ? theme.colors.background
                        : past
                        ? theme.colors.tertiary
                        : theme.colors.text,
                    }}
                  >
                    {dayCounter}
                  </Text>
                </TouchableOpacity>
              );

              dayCounter++;
            }
          }

          calendarRows.push(
            <View
              key={`week-${row}`}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {week}
            </View>
          );
        }

        return calendarRows;
      })()}

      {/* Horas disponibles */}
      {availableHours.length === 0 ? (
        <TextSmall style={{ color: theme.colors.text, textAlign: "center" }}>
          No hay horas disponibles para este día.
        </TextSmall>
      ) : (
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {availableHours.map((hour: any) => (
            <TouchableOpacity
              key={hour}
              onPress={() => onHourSelect(hour)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 16,
                backgroundColor:
                  selectedHour === hour
                    ? theme.colors.primary
                    : theme.colors.text,
              }}
            >
              <Text
                style={{
                  color:
                    selectedHour === hour
                      ? theme.colors.background
                      : theme.colors.background,
                }}
              >
                {hour}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default CustomCalendar;
