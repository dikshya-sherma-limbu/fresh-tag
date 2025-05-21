import { View, Text, StyleSheet } from "react-native";
import ProfileHeader from "@/components/ProfileHeader";
import UpdateProfile from "@/components/UpdateProfile";
import { useTheme } from "@/context/theme-context/themeContext";
export default function ProfileDetails() {
  const { theme } = useTheme(); // Get the theme from the context
  const styles = StyleSheet.create({
    profileDetailsContainer: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.primary,
    },
  });

  return (
    <View style={styles.profileDetailsContainer}>
      <ProfileHeader />
      <UpdateProfile />
    </View>
  );
}
