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
import { UserDetails, User } from "@/types/User";
import CustomButton from "./Button";
import { useEffect, useState } from "react";

import { getUserDetails } from "@/services/user-services/userService";
import { isAuthenticated } from "@/services/auth-services/authService";
import { useTheme } from "@/context/theme-context/themeContext";

export default function UpdateProfile() {
  const titles: string[] = ["username", "email", "password"];

  const [user, setUser] = useState<UserDetails>({} as UserDetails);
  const [updateUser, setUpdateUser] = useState<User | null>(null);
  const [password, setPassword] = useState<string>("");
  const [isEnabled, setIsEnabled] = useState(false);
  const { theme } = useTheme(); // Get the theme from the context
  // Create styles based on current theme
  const styles = StyleSheet.create({
    updateProfileContainer: {
      marginTop: 50,
      alignItems: "center",
      width: "90%",
      borderRadius: 20,
      // backgroundColor: "#C1D8C3",
      backgroundColor: theme.colors.background,
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
      // color: "#4B5945",
      color: theme.colors.text,
      width: "30%",
    },
    textInput: {
      borderWidth: 1,
      width: "70%",
      padding: 5,
      borderRadius: 10,
      textAlign: "left",
      color: theme.colors.text,
      backgroundColor: theme.colors.inputBackground,
      borderColor: theme.colors.border,
    },
    editIcon: {
      position: "absolute",
      right: 20,
      top: 14,
      // color: "#4B5945",
      color: theme.colors.text,
    },
    buttonContainer: {
      alignSelf: "flex-end",
      width: "40%",
    },
  });
  useEffect(() => {
    const checkAuthenticationAndFetch = async () => {
      if (await isAuthenticated()) {
        fetchUserDetails();
      }
    };
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails();
        if (response) {
          console.log("User details fetched successfully:", response);
          setUser(response);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    checkAuthenticationAndFetch();
  }, []);

  // Handle input changes
  const handleChange = (field: string, value: string) => {
    if (user) {
      setUser((prevUser) => ({
        ...prevUser,
        [field]: value,
      }));
    }
  };

  const editableFields = () => {
    setIsEnabled((prevState) => !prevState);
  };
  return (
    <View style={styles.updateProfileContainer}>
      {titles.map((label, index) => {
        // Get the appropriate value based on field name
        let inputValue = "";
        if (label === "password") {
          inputValue = password;
        } else if (user) {
          // Type assertion to handle potential undefined
          const userValue = user[label as keyof UserDetails];
          console.log("userValue:", userValue);
          inputValue = typeof userValue === "string" ? userValue : "";
        }
        return (
          <View style={styles.sectionListComponent} key={index}>
            <Text style={styles.text}>{label}</Text>
            <TextInput
              style={styles.textInput}
              value={inputValue}
              onChangeText={(text) => handleChange(label, text)}
              secureTextEntry={label === "password"}
              editable={isEnabled}
            />
            <Feather
              name="edit-2"
              size={22}
              style={styles.editIcon}
              onPress={editableFields}
            />
          </View>
        );
      })}

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Update Profile"
          onPress={() => console.log("Update Profile")}
        />
      </View>
    </View>
  );
}
