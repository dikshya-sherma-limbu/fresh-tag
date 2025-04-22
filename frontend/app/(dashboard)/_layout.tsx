// app/(dashboard)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Make sure you have this package installed

export default function DashboardLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1e90ff",
        tabBarInactiveTintColor: "#555",
        headerShown: false,
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
      {/* Add other tabs as needed */}
    </Tabs>
  );
}
