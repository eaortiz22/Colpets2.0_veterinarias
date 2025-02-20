import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { spacing } from "../styles/theme";
import { useTheme } from "../context/ThemeContext";
import TextTitle from "../components/TextTitle";
import TextSmall from "../components/TextSmall";
import { Text } from "react-native";
import { MinusIcon, PlusIcon } from "../../assets/icons";
import TextMedium from "../components/TextMedium";
import Button from "../components/Button";
import ArrowBack from "../components/ArrowBack";

export default function ProductDetail({ route }: any) {
  const { product } = route.params;
  const { theme } = useTheme();
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
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
        <Image source={product.image} resizeMode="cover" style={styles.image} />
        <ArrowBack style={{ top: 70 }} />
      </View>

      <View
        style={[
          styles.detailContainer,
          {
            backgroundColor: theme.colors.background,
            gap: 20,
            justifyContent: "space-between",
          },
        ]}
      >
        <View style={{ gap: 20 }}>
          <TextTitle style={{ fontWeight: "500" }}>{product.name}</TextTitle>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            {[
              { label: "Precio", value: product.price },
              { label: "Peso", value: product.price },
              { label: "De", value: product.price },
            ].map((item, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  padding: spacing.medium,
                  backgroundColor: theme.colors.primary,
                  borderRadius: 8,
                  gap: 4,
                }}
              >
                <TextSmall
                  style={{
                    color: "white",
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.label}
                </TextSmall>
                <View style={{ flexDirection: "row", gap: 4 }}>
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
                </View>
              </View>
            ))}
          </View>
        </View>
        <View>
          <TextSmall style={{ lineHeight: 25 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.{" "}
          </TextSmall>
        </View>
        <View style={{ gap: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
            >
              <TouchableOpacity
                style={{
                  padding: spacing.small,
                  backgroundColor: theme.colors.cardBackground,
                  borderRadius: 50,
                }}
                onPress={handleDecrement}
              >
                <MinusIcon
                  fill={theme.colors.secondary}
                  width={18}
                  height={18}
                />
              </TouchableOpacity>
              <TextMedium>{quantity}</TextMedium>
              <TouchableOpacity
                style={{
                  padding: spacing.small,
                  backgroundColor: theme.colors.cardBackground,
                  borderRadius: 50,
                }}
                onPress={handleIncrement}
              >
                <PlusIcon
                  fill={theme.colors.secondary}
                  width={18}
                  height={18}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  color: theme.colors.secondary,
                  fontWeight: "700",
                  fontSize: 20,
                }}
              >
                {`$${(product.price * quantity).toLocaleString()}`}
              </Text>
            </View>
          </View>
          <View>
            <Button
              title="Añadir al carrito"
              onPress={() => console.log("press")}
              type="primary"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
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
  detailContainer: {
    flex: 6,
    padding: spacing.large,
    borderRadius: 36,
    marginTop: -36,
  },
  image: {
    width: "75%",
    height: "75%",
    borderRadius: 16,
    position: "absolute",
    bottom: 10,
  },
  supplierImage: {
    width: "100%",
    height: "100%",
    maxWidth: 60,
    maxHeight: 60,
    borderRadius: 50,
    overflow: "hidden",
  },
});
