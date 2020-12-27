import React from "react";
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";
import { Item } from "../interfaces";

const { width } = Dimensions.get("window");
const TICKER_HEIGHT = 40;

interface Props {
  data: Item[];
  scrollX: any;
}

const Ticker = ({ data, scrollX }: Props) => {
  const inputRange = [-width, 0, width];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
  });
  return (
    <View style={styles.tickerContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map(({ type }, index) => {
          return (
            <Text key={index} style={styles.tickerText}>
              {type}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default Ticker;

const styles = StyleSheet.create({
  tickerContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    overflow: "hidden",
    height: TICKER_HEIGHT,
  },
  tickerText: {
    fontSize: TICKER_HEIGHT,
    lineHeight: TICKER_HEIGHT,
    textTransform: "uppercase",
    fontWeight: "800",
  },
});
