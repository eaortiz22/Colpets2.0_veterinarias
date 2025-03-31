import React from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import SafeContainer from "../../components/SafeContainer ";
import { HeartIcon, MapMarkerIcon, StarIcon } from "../../../assets/icons";
import { useTheme } from "../../context/ThemeContext";
import { Image } from "react-native";
import TextTitle from "../../components/TextTitle";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import TextMedium from "../../components/TextMedium";
import { spacing } from "../../styles/theme";
import ArrowBack from "../../components/ArrowBack";
import TextSmall from "../../components/TextSmall";
import { formatReviews } from "../../utils/formatUtils";
import RatingBadge from "../../components/common/RatingBadge";

const { height } = Dimensions.get("window");

const VeterinaryDetails = ({ route }: any) => {
  const { veterinary, distanceInfo } = route.params;
  const { theme } = useTheme();

  return (
    <SafeContainer
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={[
          styles.imageContainer,
          { backgroundColor: theme.colors.tertiary },
        ]}
      >
        <View
          style={[styles.circle, { backgroundColor: theme.colors.primary }]}
        ></View>
        {/* rating */}
        <RatingBadge
          rating={veterinary.rating}
          backgroundColor={theme.colors.background}
          iconColor={theme.colors.warning}
        />
        <Image
          source={veterinary.image}
          resizeMode="cover"
          style={styles.image}
        />
        <ArrowBack style={{ top: 70 }} />
      </View>

      <View
        style={[
          styles.detailContainer,
          {
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextTitle
            style={{ flexShrink: 1 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {veterinary.name}
          </TextTitle>
          <TouchableOpacity>
            <HeartIcon width={24} height={24} fill={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
          <MapMarkerIcon width={24} height={24} fill={theme.colors.primary} />
          <TextMedium style={{ color: theme.colors.text }}>
            {veterinary.neighborhood}, {veterinary.city} {" • "}
            {distanceInfo.duration}
          </TextMedium>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: theme.colors.primary,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          {[
            {
              label: "Opiniones",
              value: formatReviews(veterinary.reviews),
            },
            {
              label: "Pacientes",
              value: formatReviews(veterinary.patientsCount),
            },
            { label: "Años exp", value: veterinary.yearsExperience },
          ].map((item, index, array) => (
            <React.Fragment key={index}>
              <View
                style={{
                  flex: 1,
                  paddingVertical: spacing.medium,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.value}
                </Text>
                <TextSmall
                  style={{
                    color: "white",
                    textAlign: "center",
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.label}
                </TextSmall>
              </View>

              {/* Línea divisoria, excepto en el último elemento */}
              {index < array.length - 1 && (
                <View
                  style={{
                    width: 1,
                    backgroundColor: theme.colors.background,
                    height: "70%",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </View>
        <View style={{ gap: 8 }}>
          <TextMedium>Descripción</TextMedium>
          <TextSmall style={{ lineHeight: 25 }}>
            {veterinary.description}
          </TextSmall>
        </View>
      </View>
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -56,
    height: height * 0.32,
  },
  circle: {
    position: "absolute",
    width: "85%",
    height: "100%",
    borderRadius: 9999,
    top: "50%",
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-20%" }],
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    padding: spacing.medium,
    borderRadius: 99,
    zIndex: 1,
    position: "absolute",
    top: 70,
    right: 16,
  },
  image: {
    width: "75%",
    height: "75%",
    borderRadius: 16,
    position: "absolute",
    bottom: 20,
  },
  detailContainer: {
    padding: spacing.large,
    borderRadius: 36,
    gap: 20,
    flex: 1,
  },
});

export default VeterinaryDetails;
