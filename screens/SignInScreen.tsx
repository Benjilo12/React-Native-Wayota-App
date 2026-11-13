import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootNavigation";
import GoogleSignIn from "../components/GoogleSignIn";
import { useSignIn } from "@clerk/expo";

const SignInScreen = () => {
  const { signIn } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "SignIn">>();

  const onSignInPress = async () => {
    setError("");
    try {
      const { error: signInError } = await signIn.password({
        identifier: emailAddress,
        password,
      });
      if (signInError) {
        setError(signInError.message);
        return;
      }

      if (signIn.status !== "complete") {
        setError("Additional verification is required to finish signing in.");
        return;
      }

      const { error: finalizeError } = await signIn.finalize();
      if (finalizeError) {
        setError(finalizeError.message);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again.",
      );
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        autoCapitalize="none"
        placeholder="Enter Email"
        onChangeText={setEmailAddress}
        value={emailAddress}
        style={styles.input}
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Enter Password"
        onChangeText={setPassword}
        value={password}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity onPress={onSignInPress} style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={[styles.linkText, { color: "#FF5722" }]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <GoogleSignIn />
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF5722",
    padding: 12,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  linkText: {
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
});
