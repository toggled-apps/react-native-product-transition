import React from "react";
import { Dimensions, StyleSheet, View, Animated } from "react-native";
import { SharedElement } from "react-navigation-shared-element";

import { Item } from "../interfaces";

const { width } = Dimensions.get("window");
const CIRCLE_SIZE = width * 0.6;

interface Props {
  data: Item[];
  scrollX: any;
}

const Circle = ({ data, scrollX }: Props) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
      {data.map(({ color }: { color: string }, index: number) => {
        const inputRange = [
          (index - 0.55) * width,
          index * width,
          (index + 0.55) * width,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 0.2, 0],
        });
        return (
          <SharedElement
            key={index}
            id={`item.${data[index].key}.circle`}
            style={styles.circle}
          >
            <Animated.View
              style={[
                styles.circle,
                {
                  top: 0,
                  backgroundColor: color,
                  opacity,
                  transform: [{ scale }],
                },
              ]}
            />
          </SharedElement>
        );
      })}
    </View>
  );
};

export default Circle;

const styles = StyleSheet.create({
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: "absolute",
    top: "15%",
  },
});
