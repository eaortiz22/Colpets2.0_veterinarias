import React from "react";
import { View, StyleSheet, TextStyle } from "react-native";
import TextTitle from "./TextTitle";
import ViewAllButton from "./ui/ViewAllButton";

interface SectionHeaderProps {
  title: string;
  onViewAll?: () => void;
  titleStyle?: TextStyle;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onViewAll,
  titleStyle,
}) => {
  return (
    <View style={styles.container}>
      <TextTitle
        style={[styles.title, titleStyle]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </TextTitle>
      {onViewAll && <ViewAllButton onPress={onViewAll} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    flex: 1,
  },
});

export default SectionHeader;
