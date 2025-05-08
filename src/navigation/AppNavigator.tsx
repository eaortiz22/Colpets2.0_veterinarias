import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "../context/ThemeContext";
import Register from "../screens/Register";
import Login from "../screens/Login";
import HomeTabsNavigator from "./HomeTabsNavigator";
import { StatusBar } from "expo-status-bar";
import ResetPassword from "../screens/ResetPassword";
import { StyleSheet } from "react-native";
import { spacing } from "../styles/theme";
import ProductDetail from "../screens/ProductDetail";
import VeterinaryDetails from "../screens/veterinarians/VeterinaryDetails";
import { useAuth } from "../context/AuthContext";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ResetPassword: undefined;
  HomeTabs: undefined;
  ProductDetail: any;
  VeterinaryDetails: any;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { isDarkTheme, theme } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="HomeTabs" component={HomeTabsNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
            <Stack.Screen name="VeterinaryDetails" component={VeterinaryDetails} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
      <StatusBar style={isDarkTheme ? "light" : "dark"} animated={true} />
    </NavigationContainer>
  );
};

export const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
    paddingTop: 0,
    flex: 1,
  },
});

export default AppNavigator;
