import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  UIManager,
  findNodeHandle,
  Text,
} from "react-native";
import { AmbulanceIcon, AngleIcon, XIcon } from "../../../assets/icons";
import { useTheme } from "../../context/ThemeContext";

const BUTTON_SIZE = 60;
const ICON_SIZE = 24;
const MINIMIZED_TRANSLATE = 120;

const EmergencyButton = () => {
  const { theme } = useTheme();
  const screen = Dimensions.get("window");
  const diameter = Math.sqrt(screen.width ** 2 + screen.height ** 2) * 0.95;

  const [minimized, setMinimized] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [buttonLayout, setButtonLayout] = useState({ x: 0, y: 0, width: BUTTON_SIZE });

  const sizeAnim = useRef(new Animated.Value(BUTTON_SIZE)).current;
  const positionAnim = useRef(new Animated.ValueXY({ x: 20, y: 130 })).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const buttonRef = useRef(null);

  // Animaciones al minimizar/restaurar
  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: minimized ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: minimized ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [minimized]);

  const handleExpand = () => {
    if (!buttonRef.current) return;

    const nodeHandle = findNodeHandle(buttonRef.current);
    if (nodeHandle != null) {
      UIManager.measureInWindow(nodeHandle, (x, y, width) => {
        setButtonLayout({ x, y, width });
        positionAnim.setValue({ x, y });
        sizeAnim.setValue(width);
        setExpanded(true);

        Animated.parallel([
          Animated.timing(sizeAnim, {
            toValue: diameter,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(positionAnim, {
            toValue: {
              x: (screen.width - diameter) / 2,
              y: (screen.height - diameter) / 2,
            },
            duration: 500,
            useNativeDriver: false,
          }),
        ]).start(() => setFullScreen(true));
      });
    }
  };

  const handleCloseExpanded = () => {
    setFullScreen(false);
    Animated.parallel([
      Animated.timing(sizeAnim, {
        toValue: BUTTON_SIZE,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(positionAnim, {
        toValue: {
          x: buttonLayout.x,
          y: buttonLayout.y,
        },
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start(() => setExpanded(false));
  };

  const renderMainButton = () => {
    const translateX = slideAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, MINIMIZED_TRANSLATE],
    });

    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateX }],
            opacity: opacityAnim,
            pointerEvents: minimized ? "none" : "auto",
          },
        ]}
      >
        <TouchableOpacity style={styles.closeIcon} onPress={() => setMinimized(true)}>
          <XIcon fill="#fff" width={12} height={12} />
        </TouchableOpacity>

        <TouchableOpacity
          ref={buttonRef}
          style={[styles.button, { backgroundColor: theme.colors.error, shadowColor: theme.colors.error }]}
          onPress={handleExpand}
        >
          <AmbulanceIcon fill="#fff" width={ICON_SIZE} height={ICON_SIZE} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderRestoreButton = () => (
    <Animated.View style={[styles.minimizedBubble, { backgroundColor: theme.colors.error }]}>
      <TouchableOpacity onPress={() => setMinimized(false)}>
        <AngleIcon width={ICON_SIZE} height={ICON_SIZE} fill="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );

  const renderExpandedView = () => {
    const radiusAnim = sizeAnim.interpolate({
      inputRange: [BUTTON_SIZE, diameter],
      outputRange: [BUTTON_SIZE / 2, diameter / 2],
    });

    const closeButtonOffset = (screen.width - diameter) / 2 + diameter - 40;

    return (
      <Animated.View
        style={[
          {
            position: "absolute",
            width: sizeAnim,
            height: sizeAnim,
            borderRadius: fullScreen ? 0 : radiusAnim,
            top: positionAnim.y,
            left: positionAnim.x,
            backgroundColor: theme.colors.error,
            zIndex: 998,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        {fullScreen && (
          <>
            <TouchableOpacity
              style={[styles.expandedCloseButton, { left: closeButtonOffset }]}
              onPress={handleCloseExpanded}
            >
              <XIcon fill="#fff" width={16} height={16} />
            </TouchableOpacity>

            <Text style={styles.expandedText}>Emergencia activada</Text>
          </>
        )}
      </Animated.View>
    );
  };

  return (
    <>
      {renderMainButton()}
      {minimized && renderRestoreButton()}
      {expanded && renderExpandedView()}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 130,
    right: 16,
    zIndex: 100,
    alignItems: "center",
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 5,
  },
  closeIcon: {
    position: "absolute",
    top: -3,
    right: -3,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 4,
    zIndex: 101,
  },
  minimizedBubble: {
    position: "absolute",
    bottom: 130,
    right: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    zIndex: 100,
    width: 30,
    height: BUTTON_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  expandedCloseButton: {
    position: "absolute",
    top: 100,
    backgroundColor: "black",
    borderRadius: 16,
    padding: 6,
    zIndex: 1000,
  },
  expandedText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default EmergencyButton;
