import React from "react";
import { View, StyleSheet } from "react-native";
import TextTitle from "./TextTitle";
import ViewAllButton from "./ui/ViewAllButton";

interface SectionHeaderProps {
  title: string;
  onViewAll?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onViewAll }) => {
  return (
    <View style={styles.container}>
      <TextTitle style={styles.title} numberOfLines={1} ellipsizeMode="tail">
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
