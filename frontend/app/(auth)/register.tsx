import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAuth } from "@/context/auth-context/authContext";
import { Link } from "expo-router";
import { useState } from "react";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, isUserValidated } = useAuth();
  const [localLoading, setLocalLoading] = useState(false);

  const handleRegister = async () => {
    // Validate form inputs
    if (!email || !password || !confirmPassword || !username) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // Create user data object
    const userData = {
      username,
      email,
      password,
    };
    // Call the register function from auth context
    try {
      setLocalLoading(true);
      await register(userData);
      console.log("Registration successful for:", username);
    } catch (error: any) {
      console.error("Registration error in component:", error);
    } finally {
      setLocalLoading(false);
    }
    // For demonstration, show success alert
    Alert.alert("Success", "Registration successful!");

    // You can add navigation logic here to redirect to login page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Fresh Tag Account</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry={true}
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        autoCapitalize="none"
      />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Already have an account?</Text>
        <Link href="../login" style={{ color: "#4B5945" }}>
          Login
        </Link>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4B5945",
  },
  input: {
    width: 200,
    height: 50,
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    padding: 7,
  },
  button: {
    backgroundColor: "#4B5945",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    width: 200,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
