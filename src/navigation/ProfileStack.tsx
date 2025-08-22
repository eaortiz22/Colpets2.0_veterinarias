import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import Profile from "../screens/Profile";
import PetsScreen from "../screens/profile/PetsScreen";
import SettingsScreen from "../screens/profile/SettingsScreen";
import MembershipsScreen from "../screens/profile/MembershipsScreen";
import PaymentsScreen from "../screens/profile/PaymentsScreen";
import HistoryScreen from "../screens/profile/HistoryScreen";
import LegalScreen from "../screens/profile/LegalScreen";
import HelpScreen from "../screens/profile/HelpScreen";
import PetsNavigator from "./PetsNavigator/PetsNavigator";

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  Pets: undefined;
  Settings: undefined;
  Memberships: undefined;
  Payments: undefined;
  History: undefined;
  Legal: undefined;
  Help: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      {/* ✅ Pantalla principal: aquí sí se muestra la barra */}
      <Stack.Screen
        name="ProfileMain"
        component={Profile}
        options={{ headerShown: false }}
      />

      {/* ✅ Subpantallas: ocultamos el tab bar */}
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerShown: false,
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="Pets"
        component={PetsNavigator}
        options={{
          headerShown: false,
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="Memberships"
        component={MembershipsScreen}
        options={{
          headerShown: false,
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="Payments"
        component={PaymentsScreen}
        options={{
          headerShown: false,
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerShown: false,
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="Legal"
        component={LegalScreen}
        options={{
          headerShown: false,
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="Help"
        component={HelpScreen}
        options={{
          headerShown: false,
          presentation: "card",
        }}
      />
    </Stack.Navigator>
  );
}
