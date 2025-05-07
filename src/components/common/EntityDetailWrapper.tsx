import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { spacing } from "../../styles/theme";
import ArrowBack from "../ArrowBack";
import Button from "../ui/Button";
import { BottomSheetModal } from "../ui/BottomSheetModal";
import SafeContainer from "../SafeContainer";
import RatingBadge from "./RatingBadge";

const { height } = Dimensions.get("window");

type EntityDetailWrapperProps = {
  image: any;
  children: React.ReactNode;
  modalContent: React.ReactNode;
  buttonLabel?: string;
  onButtonPress?: () => void;
  rating?: number;
  isScrollEnabled: boolean;
};

const EntityDetailWrapper: React.FC<EntityDetailWrapperProps> = ({
  image,
  children,
  modalContent,
  buttonLabel = "Reservar",
  onButtonPress,
  rating,
  isScrollEnabled,
}) => {
  const { theme } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOpen = () => {
    setModalVisible(true);
    onButtonPress?.();
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeContainer
        style={{
          backgroundColor: theme.colors.background,
        }}
        isScrollEnabled={isScrollEnabled}
      >
        <View
          style={[
            styles.imageContainer,
            { backgroundColor: theme.colors.tertiary },
          ]}
        >
          <View
            style={[styles.circle, { backgroundColor: theme.colors.primary }]}
          />
          {rating !== undefined && (
            <RatingBadge
              rating={rating}
              backgroundColor={theme.colors.background}
              iconColor={theme.colors.warning}
            />
          )}
          <Image source={image} resizeMode="cover" style={styles.image} />
          <ArrowBack style={{ top: 70 }} />
        </View>

        <View
          style={[
            styles.detailContainer,
            { backgroundColor: theme.colors.background, paddingBottom: 50 },
          ]}
        >
          {children}
        </View>

        {isModalVisible && modalContent && (
          <BottomSheetModal visible={isModalVisible} onClose={handleClose}>
            {modalContent}
          </BottomSheetModal>
        )}
      </SafeContainer>
      <View style={styles.fixedButton}>
        <Button title={buttonLabel} onPress={handleOpen} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -56,
    height: height * 0.32,
  },
  circle: {
    position: "absolute",
    width: "85%",
    height: "100%",
    borderRadius: 9999,
    top: "50%",
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-20%" }],
  },
  image: {
    width: "75%",
    height: "75%",
    borderRadius: 16,
    position: "absolute",
    bottom: 20,
  },
  detailContainer: {
    padding: spacing.large,
    borderRadius: 36,
    gap: 16,
    flex: 1,
  },
  fixedButton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
});

export default EntityDetailWrapper;
