import { StyleSheet, View, Pressable, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function Navbar() {
  return (
    <View style={styles.navContainer}>
      <Text style={styles.text}>Fresh Tag</Text>
      <Ionicons name="notifications-outline" size={24} style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    width: "90%",
    height: 50,
    backgroundColor: "#88AF8F",
    marginTop: 50,
    marginBottom: 0,
    borderRadius: 10,
    padding: 15,
  },
  text: {
    color: "#116211",
    fontFamily: "sans-serif",
    fontSize: 15,
    textAlign: "left",
  },
  icon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
});
