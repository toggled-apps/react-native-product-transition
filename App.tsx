// import "react-native-gesture-handler";
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
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
