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
import { useState } from "react";

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

const styles = StyleSheet.create({
  text: {
    color: "#116211",
    fontFamily: "sans-serif",
    fontSize: 13,
    textAlign: "center",
  },
  disabledText: {
    color: "#8A8A8A", // Grayed out text when disabled
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    minWidth: 80,
    elevation: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  disabledButton: {
    backgroundColor: "#F5F5F5", // Lighter background when disabled
    elevation: 2, // Less pronounced shadow
    shadowOpacity: 0.1,
  },
});
