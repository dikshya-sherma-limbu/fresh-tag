import { View, StyleSheet, Text } from "react-native";

import { removeAuthData } from "@/services/auth-services/authService";
import CustomButton from "./Button";
import { router } from "expo-router";
export default function Setting() {
  return (
    <View style={styles.settingContainer}>
      <Text style={styles.text}>Settings</Text>
      <CustomButton
        title="Logout"
        onPress={async () => {
          await removeAuthData()
            .then(() => {
              console.log("User logged out successfully");
              router.replace("/(auth)/login"); // Redirect to login page after logout
            })
            .catch((error) => {
              console.error("Error logging out:", error);
            });
          // Optionally, you can show a message to the user or perform other actions here
          // Add any additional logout logic here, like navigation or state updates
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  settingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4B5945",
  },
});
