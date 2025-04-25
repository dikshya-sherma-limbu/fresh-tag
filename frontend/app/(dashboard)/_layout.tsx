// app/(dashboard)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Make sure you have this package installed
import { View, StyleSheet } from "react-native";
export default function DashboardLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#88AF8F", // Change to your desired active color
        tabBarInactiveTintColor: "#555", // Change to your desired inactive color
        headerShown: false,
        tabBarStyle: {
          position: "absolute", // Position the tab bar at the bottom
          width: "90%",
          height: 50,
          left: "5%", // This positions the tab bar 5% from the left edge
          right: "5%",
          backgroundColor: "white", // Change to your desired background color
          elevation: 2, // Remove shadow on Android
          borderRadius: 10, // Add border radius for rounded corners
          margin: 15, // Add margin for spacing
          padding: 5, // Add padding for spacing
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <Ionicons name="time" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
