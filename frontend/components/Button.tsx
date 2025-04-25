import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

export default function CustomButton(CustomButtonProps: CustomButtonProps) {
  const { title, onPress, loading } = CustomButtonProps;
  const [isLoading, setIsLoading] = useState(loading || false);

  const handlePress = () => {
    setIsLoading(true);
    onPress();
    setIsLoading(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handlePress}
        disabled={isLoading}
        style={styles.button}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#116211",
    fontFamily: "sans-serif",
    fontSize: 12,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    minWidth: 70,
    elevation: 10,
    //ion-shadow: 0px 0px 10px #000000;
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
