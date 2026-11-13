import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSignUp } from "@clerk/expo";
import type { RootStackParamList } from "../navigation/RootNavigation";

const SignUpScreen = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const { signUp } = useSignUp();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Signup">>();

  const onSignUpPress = async () => {
    setError("");
    try {
      const { error: createError } = await signUp.create({
        emailAddress,
        password,
      });
      if (createError) {
        setError(createError.message);
        return;
      }

      const { error: verificationError } =
        await signUp.verifications.sendEmailCode();
      if (verificationError) {
        setError(verificationError.message);
        return;
      }
      setPendingVerification(true);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to start sign-up. Please try again.",
      );
    }
  };

  const onVerifyPress = async () => {
    setError("");
    try {
      const { error: verificationError } =
        await signUp.verifications.verifyEmailCode({ code });
      if (verificationError) {
        setError(verificationError.message);
        return;
      }

      const { error: finalizeError } = await signUp.finalize();
      if (finalizeError) {
        setError(finalizeError.message);
        return;
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to verify your email. Please try again.",
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {pendingVerification ? (
        <TextInput
          autoCapitalize="none"
          keyboardType="number-pad"
          placeholder="Enter verification code"
          onChangeText={setCode}
          value={code}
          style={styles.input}
        />
      ) : (
        <>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
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
        </>
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={pendingVerification ? onVerifyPress : onSignUpPress}
      >
        <Text style={styles.buttonText}>
          {pendingVerification ? "Verify email" : "Continue"}
        </Text>
      </TouchableOpacity>

      {!pendingVerification && (
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={[styles.linkText, { color: "#FF5722" }]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SignUpScreen;

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
