import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons"; // Make sure you have this package installed
import { useAuth } from "@/context/auth-context/authContext";
export default function ProfileHeader() {
  const { user } = useAuth(); // Assuming you have a user object in your auth context
  console.log("User in ProfileHeader:", user); // Log the actual user value
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

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    backgroundColor: "#A2B9A7",
    width: "90%",
    borderRadius: 20,
  },
  profileImage: {
    backgroundColor: "#E4E4E4",
    alignItems: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 3,
    right: 3,
  },
  textContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4B5945",
  },
});
