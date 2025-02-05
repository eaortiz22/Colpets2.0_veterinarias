import { StyleProp, View, ViewStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { spacing } from "../../styles/theme";

type ProfileCardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ children, style }) => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.cardBackground,
          borderRadius: 8,
          padding: spacing.medium,
          gap: 16,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default ProfileCard;
