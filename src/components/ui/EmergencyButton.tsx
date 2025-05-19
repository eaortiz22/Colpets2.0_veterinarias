import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Animated, Platform, Text } from "react-native";
import { AmbulanceIcon, AngleIcon, XIcon } from "../../../assets/icons";
import { useTheme } from "../../context/ThemeContext";
import { Dimensions, findNodeHandle, UIManager } from "react-native";

const EmergencyButton = () => {
  const { theme } = useTheme();

  const [minimized, setMinimized] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [buttonLayout, setButtonLayout] = useState({ x: 0, y: 0, width: 60 });
  const [fullScreen, setFullScreen] = useState(false);

  const sizeAnim = useRef(new Animated.Value(60)).current; // inicial del botón

  const positionAnim = useRef(new Animated.ValueXY({ x: 20, y: 130 })).current;
  const slideAnim = useRef(new Animated.Value(0)).current; // 0: expandido, 1: minimizado
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const buttonRef = useRef(null);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

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

  const handleClose = () => {
    setMinimized(true);
  };

  const handleRestore = () => {
    setMinimized(false);
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 120], // se va hacia la derecha
  });

  const diameter = Math.sqrt(screenWidth ** 2 + screenHeight ** 2) * 0.95;

  // Quita radiusAnim y usa borderRadius interpolado
  const radiusAnim = sizeAnim.interpolate({
    inputRange: [60, diameter],
    outputRange: [30, diameter / 2],
  });

  const handleExpand = () => {
    if (!buttonRef.current) return;

    const nodeHandle = findNodeHandle(buttonRef.current);
    if (nodeHandle != null) {
      UIManager.measureInWindow(nodeHandle, (x, y, width, height) => {
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
              x: (screenWidth - diameter) / 2,
              y: (screenHeight - diameter) / 2,
            },
            duration: 500,
            useNativeDriver: false,
          }),
        ]).start(() => {
          setFullScreen(true);
        });
      });
    }
  };

  const closeButtonOffset = (screenWidth - diameter) / 2 + diameter - 40; // 40px del borde derecho

  const handleCloseExpanded = () => {
    setFullScreen(false); // Oculta contenido inmediatamente

    Animated.parallel([
      Animated.timing(sizeAnim, {
        toValue: 60,
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
    ]).start(() => {
      setExpanded(false); // Elimina la vista del círculo una vez termina
    });
  };

  return (
    <>
      {/* Botón Emergencia */}
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
        <TouchableOpacity style={styles.closeIcon} onPress={handleClose}>
          <XIcon fill="#fff" width={16} height={16} />
        </TouchableOpacity>

        <TouchableOpacity
          ref={buttonRef}
          style={[styles.button, { backgroundColor: theme.colors.error }]}
          onPress={handleExpand}
        >
          <AmbulanceIcon fill="#fff" width={24} height={24} />
        </TouchableOpacity>
      </Animated.View>

      {/* Flecha para restaurar */}
      {minimized && (
        <Animated.View style={[styles.minimizedBubble, { backgroundColor: theme.colors.error }]}>
          <TouchableOpacity onPress={handleRestore}>
            <AngleIcon width={24} height={24} fill="#fff" />
          </TouchableOpacity>
        </Animated.View>
      )}
      {expanded && (
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
            },
            {
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          {/* Contenido solo si está en pantalla completa */}
          {fullScreen && (
            <>
              {/* Botón de cerrar */}
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 100,
                  left: closeButtonOffset,
                  backgroundColor: "black",
                  borderRadius: 16,
                  padding: 6,
                  zIndex: 1000,
                }}
                onPress={handleCloseExpanded}
              >
                <XIcon fill="#fff" width={16} height={16} />
              </TouchableOpacity>

              <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Emergencia activada</Text>
            </>
          )}
        </Animated.View>
      )}
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
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  closeIcon: {
    position: "absolute",
    top: -3,
    right: -3,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 2,
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
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EmergencyButton;
