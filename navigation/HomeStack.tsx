import { Text, View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import NewTripScreeen from "../screens/NewTripScreeen";

export type HomeStackParamList = {
  HomeMain: undefined;
  NewTrip: undefined;
  PlanTrip: { trip: any };
};

//? Define the HomeStack component
const HomeStack = () => {
  const Stack = createNativeStackNavigator<HomeStackParamList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="NewTrip" component={NewTripScreeen} />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
