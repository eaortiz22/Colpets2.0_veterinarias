import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import EntityDetailWrapper from "../../components/common/EntityDetailWrapper";

export default function EditProfileScreen() {
  

  return (
    <View style={{ flex: 1 }}>
      <EntityDetailWrapper
        image={require("../../../assets/images/imageProfilePerson.png")}
        buttonLabel="Atrás"
        isScrollEnabled
      >
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre Completo</Text>
            <TextInput
              style={styles.input}
              value="Jeison Jiménez"
              editable={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Número de Documento</Text>
            <TextInput style={styles.input} value="" editable={false} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
              style={styles.input}
              value="jeison.s.jimenez.dev@gmail.com"
              editable={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Número de Teléfono</Text>
            <TextInput
              style={styles.input}
              value="(123) 456-7890"
              editable={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dirección</Text>
            <TextInput
              style={styles.input}
              value="Calle Falsa 123, Ciudad"
              editable={false}
            />
          </View>
        </View>
      </EntityDetailWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: "#3ABAB4",
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 15,
  },
  input: {
    backgroundColor: "transparent",
    borderColor: "#3ABAB4",
    borderWidth: 1,
    borderRadius: 8,
    color: "#fff",
    padding: 10,
    fontSize: 16,
  },
});
