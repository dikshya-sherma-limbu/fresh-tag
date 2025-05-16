import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons"; // Make sure you have this package installed
import { useAuth } from "@/context/auth-context/authContext";
import { useTheme } from "@/context/theme-context/themeContext";
export default function ProfileHeader() {
  const { theme } = useTheme(); // Get the theme from the context
  const { user } = useAuth(); // Assuming you have a user object in your auth context
  // Create styles based on current theme
  const styles = StyleSheet.create({
    headerContainer: {
      marginTop: 50,
      alignItems: "center",
      justifyContent: "center",
      height: 250,
      backgroundColor: theme.colors.background,
      elevation: 10,
      width: "90%",
      borderRadius: 20,
    },
    profileImage: {
      backgroundColor: theme.colors.profileBackground,
      alignItems: "center",
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    cameraIcon: {
      position: "absolute",
      bottom: 3,
      right: 3,
      color: theme.colors.text,
    },
    textContainer: {
      marginTop: 10,
      alignItems: "center",
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
      // color: "#4B5945",
      color: theme.colors.text,
    },
  });
  const userName = typeof user === "string" ? user : user?.username || "User";
  return (
    <View style={styles.headerContainer}>
      <View style={styles.profileImage}>
        <Ionicons name="person" size={100} color="#4B5945" />
        <Ionicons name="camera" size={30} style={styles.cameraIcon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{userName}</Text>
      </View>
    </View>
  );
}
