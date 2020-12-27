import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { Item } from '../interfaces';

const { width, height } = Dimensions.get('window');

interface Props {
  index: number;
  item: Item;
  navigation: any;
  scrollX: any;
}

const Product = ({ item, index, scrollX, navigation } : Props) => {
  const { imageUri, heading, description } = item;
  const inputRangeTransition = [(index - 1) * width, index * width, (index + 1) * width];
  const inputRangeOpacity = [
    (index - 0.3) * width,
    index * width,
    (index + 0.3) * width,
  ];
  const scale = scrollX.interpolate({
    inputRange: inputRangeTransition,
    outputRange: [0, 1, 0],
  });
  const translateXHeading = scrollX.interpolate({
    inputRange: inputRangeTransition,
    outputRange: [width * 0.1, 0, -width * 0.1],
  });
  const translateXDescription = scrollX.interpolate({
    inputRange: inputRangeTransition,
    outputRange: [width * 0.7, 0, -width * 0.7],
  });
  const opacity = scrollX.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [0, 1, 0],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.itemStyle}
      onPress={() => {
        navigation.navigate('ProductDetails', { item });
      }}
    >
      <SharedElement id={`item.${item.key}.image`} style={{ flex: 1 }}>
        <Animated.Image
          source={imageUri}
          style={[
            styles.imageStyle,
            {
              transform: [{ scale }],
            },
          ]}
        />
      </SharedElement>
      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity,
              transform: [{ translateX: translateXHeading }],
            },
          ]}
        >
          {heading}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.description,
            {
              opacity,
              transform: [
                {
                  translateX: translateXDescription,
                },
              ],
            },
          ]}
        >
          {description}
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
};

export default Product;

const styles = StyleSheet.create({
  itemStyle: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: width * 0.75,
    height: width * 0.75,
    resizeMode: 'contain',
    flex: 1,
  },
  textContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
    flex: 0.5,
  },
  heading: {
    color: '#444',
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 5,
  },
  description: {
    color: '#ccc',
    fontWeight: '600',
    textAlign: 'left',
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
});
