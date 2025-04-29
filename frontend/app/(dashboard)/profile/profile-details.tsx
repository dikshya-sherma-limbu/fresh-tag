import { View, Text, StyleSheet } from "react-native";
import ProfileHeader from "@/components/ProfileHeader";
import UpdateProfile from "@/components/UpdateProfile";
export default function ProfileDetails() {
  return (
    <View style={styles.profileDetailsContainer}>
      <ProfileHeader />
      <UpdateProfile />
    </View>
  );
}

const styles = StyleSheet.create({
  profileDetailsContainer: {
    flex: 1,
    alignItems: "center",
  },
});
