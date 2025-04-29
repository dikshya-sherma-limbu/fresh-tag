import {
  View,
  StyleSheet,
  Text,
  Switch,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { User } from "@/types/User";
import CustomButton from "./Button";
export default function UpdateProfile() {
  const labels: string[] = ["username", "email", "password"];
  return (
    <View style={styles.updateProfileContainer}>
      {labels.map((label, index) => (
        <View style={styles.sectionListComponent} key={index}>
          <Text style={styles.text}>{label}</Text>
          <TextInput style={styles.textInput} />
          <Feather name="edit-2" size={22} style={styles.editIcon} />
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Update Profile"
          onPress={() => console.log("Update Profile")}
          // additionalStyle={{
          //   height: 50,
          //   width: "100%",
          // }}
          // textStyle={{
          //   fontSize: 18,
          //   padding: 10,
          //   color: "#4B5945",
          // }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  updateProfileContainer: {
    marginTop: 50,
    alignItems: "center",
    width: "90%",
    borderRadius: 20,
    backgroundColor: "#C1D8C3",
    padding: 20,
  },
  sectionListComponent: {
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "#EFEEEA",
    width: "100%",
    borderRadius: 20,
    paddingVertical: 0,
    paddingHorizontal: 15,
    // elevation: 10,
    alignItems: "center",
    marginBottom: 20,
    height: 50,
    gap: 10,
  },
  innerSectionListComponent: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B5945",
    width: "30%",
  },
  textInput: {
    borderWidth: 1,
    width: "70%",
    padding: 5,
    borderRadius: 10,
    textAlign: "left",
  },
  editIcon: {
    position: "absolute",
    right: 20,
    top: 14,
    color: "#4B5945",
  },
  buttonContainer: {
    alignSelf: "flex-end",
    width: "40%",
  },
});
