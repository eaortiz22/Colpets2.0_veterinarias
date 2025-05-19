import React, { createContext, useContext, useState, useEffect } from "react";
import * as Location from "expo-location";

const LocationContext = createContext<any>(null);

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permiso de ubicación denegado");
          setIsLoading(false);
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
      } catch (error) {
        setErrorMsg("Error al obtener ubicación");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return <LocationContext.Provider value={{ location, errorMsg, isLoading }}>{children}</LocationContext.Provider>;
};

export const useLocation = () => useContext(LocationContext);
