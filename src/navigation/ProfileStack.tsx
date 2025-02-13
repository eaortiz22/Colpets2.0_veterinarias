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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Pets" component={PetsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Memberships" component={MembershipsScreen} />
      <Stack.Screen name="Payments" component={PaymentsScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Legal" component={LegalScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
    </Stack.Navigator>
  );
}
