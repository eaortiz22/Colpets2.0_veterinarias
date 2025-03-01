import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { spacing } from "../../styles/theme";

const services = [
  {
    id: "1",
    title: "Emergencias",
    image: require("../../../assets/services/emergencias.jpg"),
  },
  {
    id: "2",
    title: "Citas Médicas",
    image: require("../../../assets/services/citasMedicas.jpg"),
  },
  {
    id: "3",
    title: "Vacunas",
    image: require("../../../assets/services/vacunas.jpg"),
  },
  {
    id: "4",
    title: "Baño & Aseo",
    image: require("../../../assets/services/banio.jpg"),
  },
//   {
//     id: "5",
//     title: "Caminatas",
//     image: require("../../../assets/services/caminatas.jpg"),
//   },
//   {
//     id: "6",
//     title: "Entrenamientos",
//     image: require("../../../assets/services/entrenamiento.jpg"),
//   },
];

const ServicesSection = () => {
  return (
    <View style={styles.container}>
      {services.map((service, index) => {
        const isFirstInPair = index % 2 === 0;
        const isWideFirst = Math.floor(index / 2) % 2 === 0;

        return (
          <View
            key={service.id}
            style={[
              styles.serviceItem,
              isFirstInPair === isWideFirst
                ? styles.wideItem
                : styles.narrowItem,
            ]}
          >
            <Image source={service.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{service.title}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: spacing.small,
  },
  serviceItem: {
    borderRadius: 12,
    overflow: "hidden",
    flexShrink: 1,
  },
  wideItem: {
    width: "55%",
  },
  narrowItem: {
    width: "42.9%",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  textContainer: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 6,
    borderRadius: 6,
  },
  text: {
    color: "#fff",
  },
});

export default ServicesSection;
