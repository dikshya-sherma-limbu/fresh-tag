import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
const DashboardIndex = () => {
  return (
    <View>
      <Text style={styles.title}>Welcome To Fresh Tag</Text>
      <Text style={styles.subtitle}>Dashboard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
});

export default DashboardIndex;
