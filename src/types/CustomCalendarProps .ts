export type CustomCalendarProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  availableHours: string[];
  selectedHour: string | null;
  onHourSelect: (hour: string) => void;
  maxMonthAdvance?: number;
  allowPastNavigation?: boolean;
  limitToToday?: boolean;
};
