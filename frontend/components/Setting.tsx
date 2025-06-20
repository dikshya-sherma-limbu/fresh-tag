import { View, StyleSheet, Text, Switch, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { removeAuthData } from "@/services/auth-services/authService";
import { useTheme } from "@/context/theme-context/themeContext";
import { router } from "expo-router";

export default function Setting() {
  const { theme, isDark, toogleTheme } = useTheme(); // Get the theme from the context
  // Create styles based on current theme

  const styles = StyleSheet.create({
    settingContainer: {
      marginTop: 50,
      alignItems: "center",
      width: "90%",
      borderRadius: 20,
      // backgroundColor: "#C1D8C3",
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
      // color: "#4B5945",
      color: theme.colors.text,
      textAlign: "left",
    },
    sectionListComponent: {
      flexDirection: "row",
      justifyContent: "space-between",
      // backgroundColor: "#EFEEEA",
      backgroundColor: theme.colors.inputBackground,
      width: "100%",
      borderRadius: 20,
      paddingVertical: 0,
      paddingHorizontal: 15,
      elevation: 10,
      alignItems: "center",
      marginBottom: 10,
      marginTop: 10,
      height: 50,
    },
    innerSectionListComponent: {
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
    },
    innerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return (
    <View style={styles.settingContainer}>
      {/* Dark mode  */}
      <View style={styles.sectionListComponent}>
        <View style={styles.innerSectionListComponent}>
          <Ionicons name="moon" size={30} color="#4B5945" />
          <Text style={styles.text}>Dark Mode</Text>
        </View>
        <Switch
          value={isDark}
          onValueChange={toogleTheme}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={false ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
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
          <TouchableOpacity
            onPress={() => router.push("/(dashboard)/profile/profile-details")}
          >
            <Text style={styles.text}>Profile Details</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Logout 84 Falmouth Ave, Scarborough, ON M1K 4M8 */}
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
