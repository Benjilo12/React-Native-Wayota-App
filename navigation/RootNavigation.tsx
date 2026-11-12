import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import TabNavigator from "./TabNavigator";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";

export type RootStackParamList = {
  Auth: undefined;
  SignIn: undefined;
  Signup: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  // const {isLoaded, isSignedIn} = useAuth()
  const signIn = false;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {signIn ? (
        <Stack.Screen name="Main" component={TabNavigator} />
      ) : (
        <Stack.Group>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
