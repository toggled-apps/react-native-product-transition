import React from "react";
import { StyleSheet, View, Image, Animated, StatusBar } from "react-native";

import Circle from "../components/Circle";
import Product from "../components/Product";
import Pagination from "../components/Pagination";
import Ticker from "../components/Ticker";

import data from "../../config/data/urbanears";

const logoImage = require("../../assets/urbanears/ue_black_logo.png");

const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;

interface Props {
  navigation: any;
}

export default function ProductList({ navigation }: Props) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Circle data={data} scrollX={scrollX} />
      <Animated.FlatList
        keyExtractor={(item) => item.key}
        data={data}
        renderItem={({ item, index }) => (
          <Product
            item={item}
            index={index}
            scrollX={scrollX}
            navigation={navigation}
          />
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: true,
          }
        )}
        scrollEventThrottle={16}
      />
      <Image style={styles.logo} source={logoImage} />
      <Pagination data={data} scrollX={scrollX} />
      <Ticker data={data} scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    opacity: 0.9,
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    resizeMode: "contain",
    position: "absolute",
    left: 10,
    bottom: 10,
    transform: [
      { translateX: -LOGO_WIDTH / 2 },
      { translateY: -LOGO_HEIGHT / 2 },
      { rotateZ: "-90deg" },
      { translateX: LOGO_WIDTH / 2 },
      { translateY: LOGO_HEIGHT / 2 },
    ],
  },
});
