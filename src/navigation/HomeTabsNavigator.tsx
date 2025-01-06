import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import * as Animatable from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; // Usa los íconos correctos
import FontAwesome from "react-native-vector-icons/FontAwesome"; // Usa los íconos correctos
import Home from "../screens/Home"; // Asegúrate de importar las pantallas correctas
import Search from "../screens/Search";
import Settings from "../screens/Settings";
import Profile from "../screens/Profile";
import Notifications from "../screens/Notifications";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

const TabArr = [
  {
    route: "Search",
    label: "Search",
    type: MaterialIcons,
    icon: "search",
    component: Search,
  },
  {
    route: "Add",
    label: "Add",
    type: FontAwesome,
    icon: "plus-square",
    component: Settings,
  },
  {
    route: "Home",
    label: "",
    type: MaterialIcons,
    icon: "home",
    component: Home,
  },
  {
    route: "Like",
    label: "Like",
    type: FontAwesome,
    icon: "heart",
    component: Profile,
  },
  {
    route: "Account",
    label: "Account",
    type: FontAwesome,
    icon: "user-circle-o",
    component: Notifications,
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
  accessibilityState: { selected?: boolean }; // Hacemos que sea opcional
}

const TabButton: React.FC<TabButtonProps> = ({
  item,
  onPress,
  accessibilityState,
}) => {
  const focused = accessibilityState.selected;
  const viewRef = useRef<
    Animatable.View & { animate: (animation: any) => void }
  >(null);
  const circleRef = useRef<
    Animatable.View & { animate: (animation: any) => void }
  >(null);
  const textRef = useRef<
    Animatable.Text & { transitionTo: (style: object) => void }
  >(null);
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

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <View
          style={[
            styles.btn,
            {
              borderColor: focused
                ? isDarkTheme
                  ? theme.colors.primary
                  : "#292d32"
                : "transparent",
              backgroundColor: isDarkTheme
                ? theme.colors.primary
                : theme.colors.background,
            },
          ]}
        >
          <Animatable.View
            ref={circleRef}
            style={[
              styles.circle,
              {
                backgroundColor: theme.colors.text,
              },
            ]}
          />
          <item.type
            name={item.icon}
            size={24}
            color={
              focused
                ? isDarkTheme
                  ? theme.colors.primary
                  : theme.colors.background
                : isDarkTheme
                ? "#a8a2af"
                : "#b8b8b8"
            }
          />
        </View>
        <Animatable.Text
          ref={textRef}
          style={[
            styles.text,
            { color: isDarkTheme ? "#ebedf2" : theme.colors.text },
          ]}
        >
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function AnimTab1() {
  const { isDarkTheme, theme } = useTheme();

  return (
    <SafeAreaProvider>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: [
            styles.tabBar,
            {
              backgroundColor: isDarkTheme
                ? theme.colors.primary
                : theme.colors.background,
              ...(isDarkTheme
                ? {
                    shadowColor: "#FFFFFF", // Sombra blanca para dark mode
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1, // Sutil opacidad para evitar que se vea demasiado intensa
                    shadowRadius: 6,
                    elevation: 5, // Para Android
                  }
                : {
                    shadowColor: "#1b1816", // Sombra morada para light mode
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 6,
                    elevation: 8, // Para Android
                  }),
            },
          ],
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => (
                  <TabButton
                    {...props}
                    item={item}
                    onPress={props.onPress || (() => {})}
                    accessibilityState={
                      props.accessibilityState || { selected: false }
                    }
                  />
                ),
              }}
            />
          );
        })}
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    bottom: -9,
  },
  tabBar: {
    height: 70,
    position: "absolute",
    margin: 16,
    borderRadius: 32,
    bottom: 20,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    justifyContent: "center", // Centra el contenido en el eje vertical
    alignItems: "center", // Centra el contenido en el eje horizontal
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
