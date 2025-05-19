import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import TextSmall from "../TextSmall";
import { spacing } from "../../styles/theme";

type TabItem = {
  key: string;
  label: string;
  Icon: React.ComponentType<{ fill: string; width?: number; height?: number }>;
};

interface TabsProps {
  tabs: TabItem[];
  selectedKey: string;
  onTabPress: (key: string) => void;
}

export default function Tabs({ tabs, selectedKey, onTabPress }: TabsProps) {
  const { theme, isDarkTheme } = useTheme();

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.small }}>
      {tabs.map(({ key, label, Icon }) => {
        const isActive = selectedKey === key;

        const tabBackgroundColor = isActive ? theme.colors.primary : theme.colors.cardBackground;

        const textColor = isActive ? (isDarkTheme ? theme.colors.text : theme.colors.background) : theme.colors.text;

        const iconColor = textColor;

        return (
          <TouchableOpacity
            key={key}
            onPress={() => onTabPress(key)}
            style={{
              backgroundColor: tabBackgroundColor,
              borderRadius: 16,
              paddingHorizontal: isActive ? spacing.medium : 0,
              paddingVertical: isActive ? 8 : 0,
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Icon fill={iconColor} width={16} height={16} />
            <TextSmall
              style={{
                color: textColor,
                fontWeight: isActive ? "700" : "400",
              }}
            >
              {label}
            </TextSmall>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
