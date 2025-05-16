import { StyleSheet, View, Pressable, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../context/theme-context/themeContext";
export default function Navbar() {
  const { theme } = useTheme(); // Get the theme from the context
  // Create styles based on current theme
  const styles = StyleSheet.create({
    navContainer: {
      width: "90%",
      height: 50,
      backgroundColor: theme.colors.background,
      marginTop: 50,
      marginBottom: 0,
      borderRadius: 10,
      padding: 15,
    },
    text: {
      color: theme.colors.text,
      fontFamily: "sans-serif",
      fontSize: 15,
      textAlign: "left",
    },
    icon: {
      position: "absolute",
      right: 15,
      top: 15,
      color: theme.colors.text,
    },
  });
  return (
    <View style={styles.navContainer}>
      <Text style={styles.text}>Fresh Tag</Text>
      <Ionicons name="notifications-outline" size={24} style={styles.icon} />
    </View>
  );
}
