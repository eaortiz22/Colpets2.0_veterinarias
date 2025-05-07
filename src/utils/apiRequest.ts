import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";

const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

const getToken = async () => {
  return await SecureStore.getItemAsync("token");
};

export const saveToken = async (token: string) => {
  await SecureStore.setItemAsync("token", token);
};

export const apiRequest = async (
  endpoint: string,
  method = "GET",
  token?: string,
  body?: any,
  filters?: Record<string, any>,
  navigation?: any
) => {
  try {
    const authToken = token || (await getToken());

    const queryParams = filters
      ? "?" +
        Object.entries(filters)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join("&")
      : "";

    const url = `${API_BASE_URL}${endpoint}${queryParams}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.statusCode === 401 || data.statusCode === 403) {
      await handleLogout(navigation);
    }

    return data;
  } catch (error) {
    console.error(`❌ Error en la solicitud a ${endpoint}:`, error);
    throw error;
  }
};

const handleLogout = async (navigation?: any) => {
  await SecureStore.deleteItemAsync("token");

  if (navigation) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  } else {
    Alert.alert("Sesión expirada", "Por favor inicia sesión nuevamente.");
  }
};
