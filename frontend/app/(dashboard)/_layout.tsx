// app/(dashboard)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@/context/theme-context/themeContext";
export default function DashboardLayout() {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:theme.colors.toggleActiveBackground, // Change to your desired active color
        tabBarInactiveTintColor:theme.colors.toggleInActiveBackground, // Change to your desired inactive color
        headerShown: false,
        tabBarStyle: {
          position: "absolute", // Position the tab bar at the bottom
          width: "90%",
          height: 50,
          left: "5%", // This positions the tab bar 5% from the left edge
          right: "5%",
          backgroundColor: theme.colors.background, // Change to your desired background color
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
