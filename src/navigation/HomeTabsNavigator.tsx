import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef } from "react";
import { GestureResponderEvent, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import Home from "../screens/Home";
import Veterinarians from "../screens/Veterinarians";
import Services from "../screens/Services";
import Marketplace from "../screens/Marketplace";
import { useTheme } from "../context/ThemeContext";
import { HomeIcon, ShoppingBagIcon, UsersIcon, HospitalIcon, UserIcon } from "../../assets/icons";
import ProfileStack from "./ProfileStack";
import { LocationProvider } from "../context/LocationContext";
import EmergencyButton from "../components/ui/EmergencyButton";

const TabArr = [
  {
    route: "Veterinarias",
    label: "Veterinarias",
    IconComponent: HospitalIcon,
    component: Veterinarians,
  },
  {
    route: "Servicios",
    label: "Servicios",
    IconComponent: UsersIcon,
    component: Services,
  },
  {
    route: "Home",
    label: "",
    IconComponent: HomeIcon,
    component: Home,
  },
  {
    route: "Tienda",
    label: "Tienda",
    IconComponent: ShoppingBagIcon,
    component: Marketplace,
  },
  {
    route: "Perfil",
    label: "Perfil",
    IconComponent: UserIcon,
    component: ProfileStack,
  },
];

const Tab = createBottomTabNavigator();

const animate1 = {
  0: { scale: 0.5, translateY: 7 },
  0.92: { translateY: -34 },
  1: { scale: 1.2, translateY: -24 },
};
const animate2 = {
  0: { scale: 1.2, translateY: -24 },
  1: { scale: 1, translateY: 7 },
};

const circle1 = {
  0: { scale: 0 },
  0.3: { scale: 0.9 },
  0.5: { scale: 0.2 },
  0.8: { scale: 0.7 },
  1: { scale: 1 },
};
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } };

interface TabButtonProps {
  item: (typeof TabArr)[0];
  onPress?: (event: GestureResponderEvent) => void;
  accessibilityState: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({ item, onPress, accessibilityState }) => {
  const focused = accessibilityState;
  const viewRef = useRef<Animatable.View & { animate: (animation: any) => void }>(null);
  const circleRef = useRef<Animatable.View & { animate: (animation: any) => void }>(null);
  const textRef = useRef<Animatable.Text & { transitionTo: (style: object) => void }>(null);
  const { theme, isDarkTheme } = useTheme();

  useEffect(() => {
    if (focused) {
      viewRef.current?.animate(animate1);
      circleRef.current?.animate(circle1);
      textRef.current?.transitionTo({ scale: 1 });
    } else {
      viewRef.current?.animate(animate2);
      circleRef.current?.animate(circle2);
      textRef.current?.transitionTo({ scale: 0 });
    }
  }, [focused]);

  const Icon = item.IconComponent;

  let iconColor = focused
    ? theme.colors.primary
    : isDarkTheme
      ? theme.colors.text
      : theme.colors.secondary;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <View
          style={[
            styles.btn,
            focused && {
              shadowColor: theme.colors.primary,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.4,
              shadowRadius: 13,
              elevation: 50,
            },
            {
              borderColor: focused ? theme.colors.primary : "transparent",
              backgroundColor: focused ? theme.colors.primary : "transparent",
              shadowColor: theme.colors.primary,
            },
          ]}
        >
          <Animatable.View
            ref={circleRef}
            style={[
              styles.circle,
              {
                backgroundColor: "white",
              },
            ]}
          />
          <Icon width={24} height={24} fill={iconColor} />
        </View>
        <Animatable.Text ref={textRef} style={[styles.text, { color: isDarkTheme ? "#ebedf2" : theme.colors.text }]}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

// 🔥 función para decidir cuándo ocultar el tab bar
function getTabBarVisibility(route: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "ProfileMain";
  if (routeName !== "ProfileMain") {
    return { display: "none" }; // ocultar si no es la principal
  }
  return undefined;
}

export default function AnimTab1() {
  const { isDarkTheme, theme } = useTheme();

  return (
    <LocationProvider>
      <SafeAreaProvider>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          {TabArr.map((item, index) => {
            if (item.route === "Perfil") {
              return (
                <Tab.Screen
                  key={index}
                  name={item.route}
                  component={item.component}
                  options={({ route }) => ({
                    tabBarShowLabel: false,
                    tabBarStyle: [
                      styles.tabBar,
                      {
                        backgroundColor: isDarkTheme ? theme.colors.primary : theme.colors.background,
                        ...(isDarkTheme
                          ? {
                              shadowColor: "#FFFFFF",
                              shadowOffset: { width: 0, height: 0 },
                              shadowOpacity: 0.1,
                              shadowRadius: 13,
                              elevation: 3,
                            }
                          : {
                              shadowColor: "#1b1816",
                              shadowOffset: { width: 0, height: 0 },
                              shadowOpacity: 0.1,
                              shadowRadius: 13,
                              elevation: 3,
                            }),
                        bottom: Platform.OS === "ios" ? 10 : 0,
                        ...getTabBarVisibility(route), // 👈 magia aquí
                      },
                    ],
                    tabBarButton: (props) => (
                      <TabButton
                        item={item}
                        onPress={props.onPress}
                        accessibilityState={(props as any)?.children?._owner?.pendingProps?.focused || false}
                      />
                    ),
                  })}
                />
              );
            }

            return (
              <Tab.Screen
                key={index}
                name={item.route}
                component={item.component}
                options={{
                  tabBarShowLabel: false,
                  tabBarButton: (props) => (
                    <TabButton
                      item={item}
                      onPress={props.onPress}
                      accessibilityState={(props as any)?.children?._owner?.pendingProps?.focused || false}
                    />
                  ),
                  tabBarStyle: [
                    styles.tabBar,
                    {
                      backgroundColor: isDarkTheme ? theme.colors.primary : theme.colors.background,
                      ...(isDarkTheme
                        ? {
                            shadowColor: "#FFFFFF",
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.1,
                            shadowRadius: 13,
                            elevation: 3,
                          }
                        : {
                            shadowColor: "#1b1816",
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.1,
                            shadowRadius: 13,
                            elevation: 3,
                          }),
                      bottom: Platform.OS === "ios" ? 10 : 0,
                    },
                  ],
                }}
              />
            );
          })}
        </Tab.Navigator>
        <EmergencyButton />
      </SafeAreaProvider>
    </LocationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 70,
  },
  tabBar: {
    height: 70,
    position: "absolute",
    margin: 16,
    borderRadius: 32,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  text: {
    fontSize: 8,
    textAlign: "center",
    fontWeight: "500",
    bottom: -5,
  },
});
