import React from "react";
import { Easing } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import ProductDetails from "./src/screens/ProductDetails";
import ProductList from "./src/screens/ProductList";
import {
  useFonts,
  SourceSansPro_700Bold,
} from "@expo-google-fonts/source-sans-pro";

const Stack = createSharedElementStackNavigator();
const options = {
  gestureEnabled: false,
  headerBackTitleVisible: false,
  transitionSpec: {
    open: {
      animation: "timing",
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
    close: {
      animation: "timing",
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
  },
  cardStyleInterpolator: ({
    current: { progress },
  }: {
    current: { progress: number };
  }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

export default function RNProductTransition() {
  useFonts({
    SourceSansPro_700Bold,
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ProductList"
        headerMode="none"
        screenOptions={{ cardStyle: { backgroundColor: "white" } }}
      >
        <Stack.Screen
          key={"ProductList"}
          name={"ProductList"}
          component={ProductList}
          options={options}
        />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
