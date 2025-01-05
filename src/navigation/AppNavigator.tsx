import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "../context/ThemeContext";
import Register from "../screens/Register";
import Login from "../screens/Login";
import HomeTabsNavigator from "./HomeTabsNavigator";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ResetPassword from "../screens/ResetPassword";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ResetPassword: undefined;
  HomeTabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { isDarkTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Screen
              name="HomeTabs"
              component={HomeTabsNavigator}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen name="Login" options={{ headerShown: false }}>
                {() => <Login setIsLoggedIn={setIsLoggedIn} />}
              </Stack.Screen>
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ResetPassword"
                component={ResetPassword}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </SafeAreaProvider>
      <StatusBar style={isDarkTheme ? "light" : "dark"} animated={true} />
    </NavigationContainer>
  );
};

export default AppNavigator;
