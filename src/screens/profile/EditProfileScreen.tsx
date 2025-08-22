import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "../../context/ThemeContext";
import * as ImagePicker from "expo-image-picker"; // ✅ para elegir foto

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { theme, isDarkTheme } = useTheme();

  // =====================
  // Estados
  // =====================
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    documento: "",
    correo: "",
    telefono: "",
    direccion: "",
    photoUrl: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    documento: "",
    correo: "",
    telefono: "",
    direccion: "",
  });

  // =====================
  // Cargar datos guardados
  // =====================
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem("userProfile");
        if (savedData) {
          setFormData(JSON.parse(savedData)); // ✅ carga datos guardados
        }
      } catch (error) {
        console.log("Error al cargar datos", error);
      }
    };
    loadData();
  }, []);

  // =====================
  // Elegir foto de perfil
  // =====================
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const newForm = { ...formData, photoUrl: uri };
      setFormData(newForm);
      await AsyncStorage.setItem("userProfile", JSON.stringify(newForm));
    }
  };

  // =====================
  // Validación de campos
  // =====================
  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "nombre") {
      const cleanValue = value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
      if (cleanValue && cleanValue[0] !== cleanValue[0].toUpperCase()) {
        error = "La primera letra debe estar en mayúscula";
      }
      if (!cleanValue)
        error = "Solo se permiten letras y la primera letra en mayúscula";
      return { value: cleanValue, error };
    }

    if (name === "documento" || name === "telefono") {
      const cleanValue = value.replace(/[^0-9]/g, "");
      if (!/^\d*$/.test(cleanValue)) error = "Solo se permiten números";
      return { value: cleanValue, error };
    }

    if (name === "correo") {
      const cleanValue = value.replace(/\s/g, "");
      const atCount = (cleanValue.match(/@/g) || []).length;
      if (atCount !== 1)
        error = "Correo inválido. Solo una @ y al menos un punto.";
      return { value: cleanValue, error };
    }

    if (name === "direccion") {
      return { value, error: "" };
    }

    return { value, error: "" };
  };

  // =====================
  // Manejo de cambios
  // =====================
  const handleChange = (name: string, value: string) => {
    const { value: newValue, error } = validateField(name, value);
    setFormData({ ...formData, [name]: newValue });
    setErrors({ ...errors, [name]: error });
  };

  // =====================
  // Guardar cambios
  // =====================
  const handlePress = async () => {
    if (isEditing) {
      let hasError = false;
      const newErrors: typeof errors = { ...errors };

      Object.keys(formData).forEach((key) => {
        if (key !== "photoUrl") {
          const { error } = validateField(
            key,
            formData[key as keyof typeof formData] as string
          );
          newErrors[key as keyof typeof errors] = error;
          if (error) hasError = true;
        }
      });

      setErrors(newErrors);
      if (hasError) return;

      try {
        await AsyncStorage.setItem("userProfile", JSON.stringify(formData));
      } catch (error) {
        console.log("Error al guardar datos", error);
      }

      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  // =====================
  // Renderizado
  // =====================
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.cardBackground },
      ]}
    >
      {/* Fondo decorativo */}
      <View
        style={[
          styles.backgroundContainer,
          { backgroundColor: theme.colors.primary },
        ]}
      >
        <View
          style={[
            styles.circle,
            styles.circle1,
            {
              backgroundColor: isDarkTheme
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.2)",
            },
          ]}
        />
        <View
          style={[
            styles.circle,
            styles.circle2,
            {
              backgroundColor: isDarkTheme
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.2)",
            },
          ]}
        />
        <View
          style={[
            styles.circle,
            styles.circle3,
            {
              backgroundColor: isDarkTheme
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.2)",
            },
          ]}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <TouchableOpacity style={styles.avatarWrapper} onPress={pickImage}>
          {formData.photoUrl ? (
            <Image
              source={{ uri: formData.photoUrl }}
              style={styles.avatarImage}
            />
          ) : (
            <View
              style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
            >
              <Text style={styles.avatarText}>
                {formData.nombre
                  ? formData.nombre.split(" ")[0][0] +
                    (formData.nombre.split(" ")[1]?.[0] || "")
                  : "?"}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <Text style={{ marginTop: 8, color: theme.colors.text }}>
          Toca para cambiar foto
        </Text>
      </View>

      {/* Formulario */}
      <KeyboardAwareScrollView
        style={[
          styles.formContainer,
          {
            backgroundColor: theme.colors.cardBackground,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
        ]}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {[
          {
            label: "Nombre Completo",
            key: "nombre",
            placeholder: "Nombre Completo",
          },
          {
            label: "Número de Documento",
            key: "documento",
            placeholder: "Número de Documento",
          },
          {
            label: "Correo Electrónico",
            key: "correo",
            placeholder: "Correo Electrónico",
          },
          {
            label: "Número de Teléfono",
            key: "telefono",
            placeholder: "Número de Teléfono",
          },
          { label: "Dirección", key: "direccion", placeholder: "Dirección" },
        ].map(({ label, key, placeholder }) => (
          <View style={styles.inputGroup} key={key}>
            <Text style={[styles.label, { color: theme.colors.primary }]}>
              {label}
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  color: theme.colors.text,
                  backgroundColor: theme.colors.inputBg,
                  borderColor: errors[key as keyof typeof errors]
                    ? theme.colors.error
                    : theme.colors.primary,
                },
              ]}
              value={formData[key as keyof typeof formData]}
              editable={isEditing}
              onChangeText={(text) => handleChange(key, text)}
              placeholder={placeholder}
              placeholderTextColor={theme.colors.placeholder}
              returnKeyType="next"
            />
            {errors[key as keyof typeof errors] && (
              <Text style={styles.errorText}>
                {errors[key as keyof typeof errors]}
              </Text>
            )}
          </View>
        ))}
      </KeyboardAwareScrollView>

      {/* Botón Fijo */}
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity
          style={[
            styles.updateButton,
            { backgroundColor: isEditing ? "#4CAF50" : theme.colors.primary },
          ]}
          onPress={handlePress}
        >
          <Text style={styles.updateButtonText}>
            {isEditing ? "Guardar" : "Actualizar Perfil"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// =====================
// Estilos
// =====================
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Fondo decorativo
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 250,
    overflow: "hidden",
  },
  circle: { position: "absolute", borderRadius: 200 },
  circle1: { width: width * 0.9, height: width * 0.9, top: -150, left: -60 },
  circle2: { width: width * 0.7, height: width * 0.7, top: -100, right: -50 },
  circle3: { width: width * 0.6, height: width * 0.6, bottom: -80, left: width * 0.2 },

  // Botón retroceso
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 8,
    borderRadius: 20,
  },
  backText: { color: "#fff", fontSize: 20, fontWeight: "bold" },

  // Avatar
  avatarContainer: { marginTop: 100, alignItems: "center" },
  avatarWrapper: { borderRadius: 100, padding: 5, backgroundColor: "#fff" },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: { width: 110, height: 110, borderRadius: 55 },
  avatarText: { color: "#fff", fontSize: 28, fontWeight: "bold" },

  // Formulario
  formContainer: {
    flex: 1,
    paddingHorizontal: 35,
    paddingVertical: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  // Inputs
  inputGroup: { marginBottom: 18 },
  label: { fontWeight: "bold", marginBottom: 6, fontSize: 15 },
  input: { borderWidth: 1.5, borderRadius: 10, padding: 12, fontSize: 16 },
  errorText: { color: "#FF4C4C", fontSize: 12, marginTop: 4 },

  // Botón
  fixedButtonContainer: {
    position: "absolute",
    bottom: 30,
    left: 16,
    right: 16,
  },
  updateButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    borderWidth: 2,
    borderColor: "#ffffffaa",
    elevation: 6,
  },
  updateButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
