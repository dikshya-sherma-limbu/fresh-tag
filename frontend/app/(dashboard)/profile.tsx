import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ProfileHeader from "@/components/ProfileHeader";
import Setting from "@/components/Setting";
export default function Profile() {
  return (
    <View style={styles.profileContainer}>
      <ProfileHeader />
      <Setting />
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4B5945",
  },
});
