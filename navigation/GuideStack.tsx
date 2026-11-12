import { StyleSheet, Text, View, type ImageSourcePropType } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GuideScreen from "../screens/GuideScreen";
import GuideDetailScreen from "../screens/GuideDetailScreen";

// Define the Place type
export type Place = {
  id: number;
  name: string;
  image: ImageSourcePropType;
  description: string;
  attributes: {
    location: string;
    type: string;
    bestTime: string;
    attractions: string[];
  };
};

//define the navigation param list

export type GuideStackParamList = {
  GuideScreen: undefined;
  GuideDetails: { place: Place };
};

const GuideStack = () => {
  // Create a stack navigator
  const Stack = createNativeStackNavigator<GuideStackParamList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GuideScreen" component={GuideScreen} />
      <Stack.Screen name="GuideDetails" component={GuideDetailScreen} />
    </Stack.Navigator>
  );
};

export default GuideStack;

const styles = StyleSheet.create({});
