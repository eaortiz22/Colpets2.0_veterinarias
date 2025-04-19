import React from "react";
import { View, Image, Text, Modal, StyleSheet } from "react-native";
import TextTitle from "../TextTitle";
import TextMedium from "../TextMedium";
import Button from "../ui/Button";
import { useTheme } from "../../context/ThemeContext";

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  image?: any; // Puede ser require('...') o { uri: '...' }
  title: string;
  subtitle: string;
  confirmText?: string;
  cancelText?: string;
  iconLeftTitle?: React.ReactNode;
  iconLeftSubtitle?: React.ReactNode;
  children?: React.ReactNode;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirm,
  image,
  title,
  subtitle,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  iconLeftTitle,
  iconLeftSubtitle,
  children,
}) => {
  const { theme } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <Image source={image} style={styles.image} resizeMode="contain" />
          <View style={styles.titleContainer}>
            {iconLeftTitle && <View style={styles.icon}>{iconLeftTitle}</View>}
            <TextTitle>{title}</TextTitle>
          </View>
          <View style={styles.subtitleContainer}>
            {iconLeftSubtitle && (
              <View style={styles.icon}>{iconLeftSubtitle}</View>
            )}
            <TextMedium>{subtitle}</TextMedium>
          </View>
          <View style={styles.childrenContainer}>{children}</View>
          <View style={styles.buttonGroup}>
            <Button title={confirmText} onPress={onConfirm} />
            <Button title={cancelText} onPress={onClose} type="secondary" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  modalContent: {
    borderRadius: 20,
    padding: 20,
    width: "85%",
    gap: 8,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
  },
  childrenContainer: {
    marginVertical: 10,
  },
  icon: {
    marginRight: 6,
  },
  buttonGroup: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 10,
  },
});

export default ConfirmationModal;
