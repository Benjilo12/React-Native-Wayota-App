import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useClerk } from "@clerk/expo";
import { useSSO } from "@clerk/expo/experimental";

// Completes the auth session when the app is reopened via the redirect
WebBrowser.maybeCompleteAuthSession();

const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

const GoogleSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { startSSOFlow } = useSSO();
  const { setActive } = useClerk();

  useWarmUpBrowser();

  const onGoogleSignInPress = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const { createdSessionId } = await startSSOFlow({
        strategy: "oauth_google",
        redirectUrl: Linking.createURL("/sso-callback"),
      });

      if (createdSessionId) {
        await setActive?.({ session: createdSessionId });
      } else {
        setError("Google sign-in did not complete. Please try again.");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Google sign-in failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [startSSOFlow, setActive]);

  return (
    <View className="w-full">
      {error ? (
        <Text className=" text-red-500 text-sm text-center mb-3 mt-3 rounded-lg flex-row justify-center items-center">
          {error}
        </Text>
      ) : null}
      <TouchableOpacity
        className="w-full border border-gray-300 py-3 mt-3 rounded-lg flex-row justify-center items-center"
        onPress={onGoogleSignInPress}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FF5722" />
        ) : (
          <>
            <Image
              source={{ uri: "https://www.google.com/favicon.ico" }}
              className="w-5 h-5 mr-2"
            />
            <Text className="text-gray-900 text-base font-semibold">
              Sign In With Google
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignIn;
