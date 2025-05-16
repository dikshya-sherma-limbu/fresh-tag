import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "../context/theme-context/themeContext";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean; // Add this prop
  additionalStyle?: StyleProp<ViewStyle>; // For button container
  textStyle?: StyleProp<TextStyle>; // For text style
}

export default function CustomButton(CustomButtonProps: CustomButtonProps) {
  const { title, onPress, disabled, additionalStyle, textStyle } =
    CustomButtonProps;
  const { theme } = useTheme(); // Get the theme from the context
  
  // Create styles with the current theme
  const styles = StyleSheet.create({
    text: {
      color: theme.colors.buttonText,
      fontFamily: "sans-serif",
      fontSize: 13,
      textAlign: "center",
    },
    disabledText: {
      color: theme.colors.buttonDisabledText,
    },
    button: {
      backgroundColor: theme.colors.buttonBackground,
      padding: 5,
      borderRadius: 10,
      alignItems: "center",
      width: "100%",
      minWidth: 80,
      elevation: 10,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    disabledButton: {
      backgroundColor: theme.colors.buttonDisabledBackground,
      elevation: 2,
      shadowOpacity: 0.1,
    },
  });

  return (
    <View>
      <TouchableOpacity
        onPress={onPress} // Call the onPress function when the button is pressed - e.g handleAllLabels
        disabled={disabled} // Disable the button when the prop is true
        style={[
          styles.button,
          disabled && styles.disabledButton,
          additionalStyle, // Apply disabled styling when button is disabled
        ]}
      >
        <Text
          style={[
            styles.text,
            disabled && styles.disabledText,
            textStyle,
            // Optional: style text differently when disabled
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// const styles = StyleSheet.create({
//   text: {
//     color: "#116211",
//     fontFamily: "sans-serif",
//     fontSize: 13,
//     textAlign: "center",
//   },
//   disabledText: {
//     color: "#8A8A8A", // Grayed out text when disabled
//   },
//   button: {
//     backgroundColor: "#FFFFFF",
//     padding: 5,
//     borderRadius: 10,
//     alignItems: "center",
//     width: "100%",
//     minWidth: 80,
//     elevation: 10,
//     shadowColor: "#000000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//   },
//   disabledButton: {
//     backgroundColor: "#F5F5F5", // Lighter background when disabled
//     elevation: 2, // Less pronounced shadow
//     shadowOpacity: 0.1,
//   },
// });
