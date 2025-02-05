import { TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { View } from "react-native";
import TextMedium from "../TextMedium";
import { AngleIcon } from "../../../assets/icons";
import { StyleSheet } from "react-native";

type ProfileItemProps = {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
};

// Componente reutilizable para los ítems
const ProfileItem: React.FC<ProfileItemProps> = ({ icon, title, onPress }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        {icon}
        <TextMedium>{title}</TextMedium>
      </View>
      <AngleIcon fill={theme.colors.text} width={24} height={24} />
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ProfileItem;
