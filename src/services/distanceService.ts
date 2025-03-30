import Constants from "expo-constants";

const apiKey = Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY;

export const getDistance = async (
  origin: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number }
) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&mode=driving&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.routes.length > 0) {
      return {
        distance: data.routes[0].legs[0].distance.text,
        duration: data.routes[0].legs[0].duration.text,
      };
    } else {
      console.error("No se encontró una ruta.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener la distancia:", error);
    return null;
  }
};
