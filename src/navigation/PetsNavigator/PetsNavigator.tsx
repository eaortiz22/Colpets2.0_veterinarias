import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PetsScreen from "../../screens/profile/PetsScreen";
import PetDetailScreen from "../../screens/profile/PetDetailScreen/PetDetailScreen";

export type RootStackParamList = {
  PetsScreen: undefined;
  PetDetailScreen: {
    pet: {
      id: number;
      name: string;
      image: any;
      age: string;
      weight: string;
      gender: string;
    };
    backgroundColor: string;
    iconColor: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function PetsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PetsScreen" component={PetsScreen} />
      <Stack.Screen name="PetDetailScreen" component={PetDetailScreen} />
    </Stack.Navigator>
  );
}
