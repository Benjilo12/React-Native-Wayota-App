import "./global.css";
import RootNavigation from "./navigation/RootNavigation";
import TabNavigator from "./navigation/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { ClerkProvider } from "@clerk/expo";
import * as SecureStore from "expo-secure-store";

//
const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return await SecureStore.setItemAsync(key, value);
    } catch (error) {
      return;
    }
  },
};

export default function App() {
  return (
    <ClerkProvider
      publishableKey="pk_test_a2Vlbi1lYWdsZS0yNTIwLmNsZXJrLmFjY291bnRzLmRldiQ"
      tokenCache={tokenCache}
    >
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </ClerkProvider>
  );
}
