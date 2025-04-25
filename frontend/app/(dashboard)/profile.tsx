import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Profile() {
  return (
    <View>
      <Text style={styles.text}>Profile Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4B5945",
  },
});
