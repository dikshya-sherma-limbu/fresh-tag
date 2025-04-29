import { View, StyleSheet, Text, Switch, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { removeAuthData } from "@/services/auth-services/authService";
import CustomButton from "./Button";
import { router } from "expo-router";

export default function Setting() {
  return (
    <View style={styles.settingContainer}>
      {/* Dark mode  */}
      <View style={styles.sectionListComponent}>
        <View style={styles.innerSectionListComponent}>
          <Ionicons name="moon" size={30} color="#4B5945" />
          <Text style={styles.text}>Dark Mode</Text>
        </View>

        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={false ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {}}
          value={false}
        />
      </View>
      {/* Notification */}
      <View style={styles.sectionListComponent}>
        <View style={styles.innerSectionListComponent}>
          <Ionicons name="notifications" size={30} color="#4B5945" />
          <Text style={styles.text}>Notifications</Text>
        </View>

        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={false ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {}}
          value={false}
        />
      </View>
      {/* Profile Details*/}
      <View style={styles.sectionListComponent}>
        <View style={styles.innerSectionListComponent}>
          <Ionicons name="person" size={35} color="#4B5945" />
          <Text style={styles.text}>Profile Details</Text>
        </View>
      </View>
      {/* Logout */}
      <View style={styles.sectionListComponent}>
        <View style={styles.innerSectionListComponent}>
          <Ionicons name="log-out" size={30} color="#4B5945" />
          <TouchableOpacity
            onPress={async () => {
              await removeAuthData()
                .then(() => {
                  console.log("User logged out successfully");
                  router.replace("/(auth)/login"); // Redirect to login page after logout
                })
                .catch((error) => {
                  console.error("Error logging out:", error);
                });
            }}
          >
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settingContainer: {
    marginTop: 50,
    alignItems: "center",
    width: "90%",
    borderRadius: 20,
    backgroundColor: "#C1D8C3",
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B5945",
    textAlign: "left",
  },
  sectionListComponent: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#EFEEEA",
    width: "100%",
    borderRadius: 20,
    paddingVertical: 0,
    paddingHorizontal: 15,
    elevation: 10,
    alignItems: "center",
    marginBottom: 20,
    height: 50,
  },
  innerSectionListComponent: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
});
