import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

const GoogleSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  return (
    <View className="w-full">
      {error ? (
        <Text className=" text-red-500 text-sm text-center mb-3 mt-3 rounded-lg flex-row justify-center items-center">
          {error}
        </Text>
      ) : null}
      <TouchableOpacity className="w-full border-gray-300 py-3">
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

const styles = StyleSheet.create({});
