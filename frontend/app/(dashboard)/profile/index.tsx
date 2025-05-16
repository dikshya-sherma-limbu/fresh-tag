import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ProfileHeader from "@/components/ProfileHeader";
import Setting from "@/components/Setting";
import { useTheme } from "@/context/theme-context/themeContext";
export default function Profile() {
  const { theme } = useTheme(); // Get the theme from the context
  // Create styles based on current theme
  const styles = StyleSheet.create({
    profileContainer: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.primary,
    },
    // text: {
    //   fontSize: 20,
    //   // fontWeight: "bold",
    //   // color: "#4B5945",
    // },
  });
  return (
    <View style={styles.profileContainer}>
      <ProfileHeader />
      <Setting />
    </View>
  );
}
