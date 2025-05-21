import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../../context/auth-context/authContext";
import { Link } from "expo-router";
import { useState } from "react";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const { login, isUserValidated } = useAuth();

  // Combined loading state (either local or from auth context)
  const isSubmitting = localLoading;

  // Handle login function
  const handleLogin = async () => {
    // Validate form inputs
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      console.log("Login attempt starting for:", email);
      setLocalLoading(true);
      await login({ email, password });
      console.log("Login attempt finished for:", email);
      console.log("isAuthenticated after login:", isUserValidated);
      // No need to navigate - the root layout will handle this based on isAuthenticated
    } catch (error: any) {
      console.error("Login error in component:", error);
      console.log("Error object:", JSON.stringify(error));
      console.log("Error name:", error.name);
      console.log("Error message:", error.message);
      console.log("Response status:", error.response?.status);
      console.log("Response data:", error.response?.data);
      // Handle login error
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to login. Please check your credentials.";
      Alert.alert("Login Failed", errorMessage);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome To Fresh Tag</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isSubmitting}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        editable={!isSubmitting}
      />

      <View style={styles.registerContainer}>
        <Text>Don't have an account?</Text>
        <Link href="../register" style={styles.registerLink}>
          Register
        </Link>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.button, isSubmitting && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#4B5945",
  },
  input: {
    width: "100%",
    maxWidth: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    maxWidth: 300,
    marginBottom: 20,
  },
  registerLink: {
    color: "#4B5945",
    fontWeight: "bold",
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#4B5945",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    maxWidth: 300,
  },
  buttonDisabled: {
    backgroundColor: "#8DA386",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LoginScreen;
