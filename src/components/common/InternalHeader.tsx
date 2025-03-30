import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "../../../assets/icons";
import TextTitle from "../TextTitle";
import { useTheme } from "../../context/ThemeContext";
import IconButton from "../IconButton";

type IconButtonProps = {
  onPress: () => void;
  icon: React.FC<{ fill: string; width: number; height: number }>;
};

type InternalHeaderProps = {
  title: string;
  iconButtonProps?: IconButtonProps;
  noPadding?: boolean;
};

const InternalHeader = ({
  title,
  iconButtonProps,
  noPadding,
}: InternalHeaderProps) => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <View style={[styles.header, noPadding && styles.noPadding]}>
      <ArrowLeftIcon
        fill={theme.colors.secondary}
        width={32}
        height={32}
        onPress={() => navigation.goBack()}
      />
      <TextTitle>{title}</TextTitle>
      <View style={{ minWidth: 32 }}>
        {iconButtonProps && <IconButton {...iconButtonProps} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  noPadding: {
    padding: 0,
  },
});

export default InternalHeader;
